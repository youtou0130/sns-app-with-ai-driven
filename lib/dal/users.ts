// lib/dal/users.ts
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { PostWithAuthor, UserProfileWithPosts } from "@/types/post";

/**
 * username でユーザーを取得し、プロフィール情報と投稿一覧を返す。
 * cache() により同一リクエスト内の重複呼び出しは1回のクエリに集約される。
 * （例: generateMetadata と page の両方で呼ぶ場合）
 */
export const getUserByUsername = cache(
  async (username: string): Promise<UserProfileWithPosts | null> => {
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
        createdAt: user.createdAt,
        followersCount: user._count.followers,
        followingCount: user._count.following,
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
