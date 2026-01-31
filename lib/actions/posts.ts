"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const CONTENT_MAX_LENGTH = 280;

export interface CreatePostResult {
  ok: boolean;
  error?: string;
}

export async function createPost(content: string): Promise<CreatePostResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false, error: "内容を入力してください。" };
  }
  if (trimmed.length > CONTENT_MAX_LENGTH) {
    return {
      ok: false,
      error: `本文は${CONTENT_MAX_LENGTH}文字以内で入力してください。`,
    };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    return {
      ok: false,
      error: "ユーザー情報が見つかりません。しばらく待ってから再度お試しください。",
    };
  }

  await prisma.post.create({
    data: {
      userId: user.id,
      content: trimmed,
    },
  });

  revalidatePath("/");
  return { ok: true };
}

export interface CreateReplyResult {
  ok: boolean;
  error?: string;
}

/** 指定ポストへの返信を作成する。replyToId はルートポスト（親）の id を指定する。 */
export async function createReply(
  replyToPostId: string,
  content: string
): Promise<CreateReplyResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false, error: "返信内容を入力してください。" };
  }
  if (trimmed.length > CONTENT_MAX_LENGTH) {
    return {
      ok: false,
      error: `本文は${CONTENT_MAX_LENGTH}文字以内で入力してください。`,
    };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    return {
      ok: false,
      error: "ユーザー情報が見つかりません。しばらく待ってから再度お試しください。",
    };
  }

  const parent = await prisma.post.findUnique({
    where: { id: replyToPostId },
    select: { id: true, replyToId: true },
  });
  if (!parent) {
    return { ok: false, error: "対象のポストが見つかりません。" };
  }

  const rootId = parent.replyToId ?? parent.id;

  await prisma.post.create({
    data: {
      userId: user.id,
      content: trimmed,
      replyToId: rootId,
    },
  });

  revalidatePath("/");
  revalidatePath(`/posts/${replyToPostId}`);
  revalidatePath(`/posts/${rootId}`);
  return { ok: true };
}

export interface ToggleLikeResult {
  ok: boolean;
  liked?: boolean;
  error?: string;
}

export async function toggleLike(postId: string): Promise<ToggleLikeResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    return {
      ok: false,
      error: "ユーザー情報が見つかりません。",
    };
  }

  const existing = await prisma.like.findUnique({
    where: {
      userId_postId: { userId: user.id, postId },
    },
  });

  if (existing) {
    await prisma.like.delete({
      where: { id: existing.id },
    });
    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);
    return { ok: true, liked: false };
  }

  await prisma.like.create({
    data: {
      userId: user.id,
      postId,
    },
  });
  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
  return { ok: true, liked: true };
}
