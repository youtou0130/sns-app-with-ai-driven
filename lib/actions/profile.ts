"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  createAdminClient,
  hasAdminClientEnv,
  PROFILE_IMAGES_BUCKET,
} from "@/lib/supabase/admin";

export interface UpdateProfileResult {
  ok: boolean;
  error?: string;
}

export interface UpdateProfileInput {
  displayName: string | null;
  bio: string | null;
  location: string | null;
  coverUrl?: string | null;
}

const COVER_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_COVER_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** FormData で受け取り、カバー画像ファイルがあれば Supabase Storage にアップロードしてからプロフィールを更新する */
export async function updateProfile(
  input: UpdateProfileInput | FormData
): Promise<UpdateProfileResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    return { ok: false, error: "ユーザー情報が見つかりません。" };
  }

  let displayName: string | null = null;
  let bio: string | null = null;
  let location: string | null = null;
  let coverUrl: string | null | undefined = undefined;
  let coverFile: File | null = null;

  if (input instanceof FormData) {
    displayName = (input.get("displayName") as string)?.trim() || null;
    bio = (input.get("bio") as string)?.trim() || null;
    location = (input.get("location") as string)?.trim() || null;
    const file = input.get("cover");
    if (file instanceof File && file.size > 0) {
      coverFile = file;
    }
  } else {
    displayName = input.displayName?.trim() ?? null;
    bio = input.bio?.trim() ?? null;
    location = input.location?.trim() ?? null;
    coverUrl = input.coverUrl;
  }

  if (coverFile) {
    if (!hasAdminClientEnv()) {
      return {
        ok: false,
        error:
          "カバー画像のアップロードには Supabase のサービスロールキー（SUPABASE_SERVICE_ROLE_KEY）の設定が必要です。.env に追加し、Storage でバケット「profile-images」を Public で作成してください。",
      };
    }
    if (coverFile.size > COVER_MAX_SIZE_BYTES) {
      return { ok: false, error: "カバー画像は5MB以内でアップロードしてください。" };
    }
    if (!ALLOWED_COVER_TYPES.includes(coverFile.type)) {
      return {
        ok: false,
        error: "カバー画像は JPEG / PNG / WebP / GIF 形式でアップロードしてください。",
      };
    }
    try {
      const supabase = createAdminClient();
      const ext =
        coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeExt = ["jpeg", "jpg", "png", "webp", "gif"].includes(ext)
        ? ext === "jpg"
          ? "jpeg"
          : ext
        : "jpeg";
      const path = `covers/${user.id}/${Date.now()}.${safeExt}`;
      const { error: uploadError } = await supabase.storage
        .from(PROFILE_IMAGES_BUCKET)
        .upload(path, coverFile, {
          contentType: coverFile.type,
          upsert: false,
        });
      if (uploadError) {
        console.error("Cover upload error:", uploadError);
        return {
          ok: false,
          error: "カバー画像のアップロードに失敗しました。バケット設定を確認してください。",
        };
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from(PROFILE_IMAGES_BUCKET).getPublicUrl(path);
      coverUrl = publicUrl;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes("SUPABASE_SERVICE_ROLE_KEY")
      ) {
        return {
          ok: false,
          error:
            "カバー画像のアップロードには Supabase のサービスロールキー（SUPABASE_SERVICE_ROLE_KEY）の設定が必要です。",
        };
      }
      throw err;
    }
  } else if (coverUrl === undefined) {
    coverUrl = user.coverUrl;
  }

  const updateData: {
    displayName?: string | null;
    bio?: string | null;
    location?: string | null;
    coverUrl?: string | null;
  } = {};
  if (displayName !== undefined) updateData.displayName = displayName;
  if (bio !== undefined) updateData.bio = bio;
  if (location !== undefined) updateData.location = location;
  if (coverUrl !== undefined) updateData.coverUrl = coverUrl ?? null;

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  revalidatePath("/");
  revalidatePath(`/profile/${user.username}`);
  return { ok: true };
}
