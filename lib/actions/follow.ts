"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface FollowResult {
  ok: boolean;
  following?: boolean;
  error?: string;
}

/** 対象ユーザーをフォローする */
export async function followUser(targetUserId: string): Promise<FollowResult> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const currentUser = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true, username: true },
  });
  if (!currentUser) {
    return { ok: false, error: "ユーザー情報が見つかりません。" };
  }

  if (currentUser.id === targetUserId) {
    return { ok: false, error: "自分自身はフォローできません。" };
  }

  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { username: true },
  });
  if (!target) {
    return { ok: false, error: "対象ユーザーが見つかりません。" };
  }

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: targetUserId,
      },
    },
    create: {
      followerId: currentUser.id,
      followingId: targetUserId,
    },
    update: {},
  });

  revalidatePath("/");
  revalidatePath(`/profile/${currentUser.username}`);
  revalidatePath(`/profile/${target.username}`);
  return { ok: true, following: true };
}

/** 対象ユーザーのフォローを解除する */
export async function unfollowUser(
  targetUserId: string
): Promise<FollowResult> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return { ok: false, error: "ログインしてください。" };
  }

  const currentUser = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true, username: true },
  });
  if (!currentUser) {
    return { ok: false, error: "ユーザー情報が見つかりません。" };
  }

  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { username: true },
  });
  if (!target) {
    return { ok: false, error: "対象ユーザーが見つかりません。" };
  }

  await prisma.follow.deleteMany({
    where: {
      followerId: currentUser.id,
      followingId: targetUserId,
    },
  });

  revalidatePath("/");
  revalidatePath(`/profile/${currentUser.username}`);
  revalidatePath(`/profile/${target.username}`);
  return { ok: true, following: false };
}
