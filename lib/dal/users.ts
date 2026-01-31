// lib/dal/users.ts
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { PostWithAuthor, UserProfileWithPosts } from "@/types/post";

/**
 * username でユーザーを取得し、プロフィール情報と投稿一覧を返す。
 * currentUserId を渡すと、そのユーザーがプロフィール主をフォローしているか isFollowing に含める。
 * cache() により同一リクエスト内の重複呼び出しは1回のクエリに集約される。
 */
export const getUserByUsername = cache(
  async (
    username: string,
    currentUserClerkId?: string | null
  ): Promise<UserProfileWithPosts | null> => {
    const currentUserId =
      currentUserClerkId != null
        ? (
            await prisma.user.findUnique({
              where: { clerkUserId: currentUserClerkId },
              select: { id: true },
            })
          )?.id ?? null
        : null;

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
          include: {
            _count: {
              select: {
                likes: true,
                retweets: true,
              },
            },
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    let isFollowing = false;
    if (currentUserId && currentUserId !== user.id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: user.id,
          },
        },
      });
      isFollowing = !!follow;
    }

    const posts: PostWithAuthor[] = user.posts.map((post) => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      author: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      likesCount: post._count.likes,
      retweetsCount: post._count.retweets,
      repliesCount: 0,
    }));

    return {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        coverUrl: user.coverUrl,
        location: (user as { location?: string | null }).location ?? null,
        createdAt: user.createdAt,
        followersCount: user._count.followers,
        followingCount: user._count.following,
        isFollowing,
      },
      posts,
    };
  }
);

/**
 * 全ユーザーの username 一覧を取得する。
 * （generateStaticParams 等で利用）
 */
export const getAllUsernames = cache(async (): Promise<string[]> => {
  const users = await prisma.user.findMany({
    select: { username: true },
  });
  return users.map((u) => u.username);
});
