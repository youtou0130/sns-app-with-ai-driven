// lib/posts.ts
import { prisma } from "@/lib/prisma";
import type { PostWithAuthor } from "@/types/post";

export async function getTimelinePosts(): Promise<PostWithAuthor[]> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
      _count: {
        select: {
          likes: true,
          retweets: true,
        },
      },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      id: post.user.id,
      username: post.user.username,
      displayName: post.user.displayName,
      avatarUrl: post.user.avatarUrl,
    },
    likesCount: post._count.likes,
    retweetsCount: post._count.retweets,
    repliesCount: 0, // TODO: replies テーブルを追加したら実装
  }));
}
