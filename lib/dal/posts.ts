// lib/dal/posts.ts
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { PostDetailWithReplies, PostWithAuthor } from "@/types/post";

interface PostQueryResult {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  };
  _count: {
    likes: number;
    retweets: number;
    replies: number;
  };
}

function toPostWithAuthor(post: PostQueryResult): PostWithAuthor {
  return {
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
    repliesCount: post._count.replies,
  };
}

const postInclude = {
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
      replies: true,
    },
  },
} as const;

/**
 * タイムライン用の投稿一覧を取得する（リプライ除く）。
 * currentUserId を渡すと各投稿の isLiked が設定される。
 * cache() により同一リクエスト内の重複呼び出しは1回のクエリに集約される。
 */
export const getTimelinePosts = cache(
  async (currentUserId?: string): Promise<PostWithAuthor[]> => {
    const rows = (await prisma.post.findMany({
      where: { replyToId: null },
      orderBy: { createdAt: "desc" },
      include: postInclude,
    })) as PostQueryResult[];

    const likedPostIds =
      currentUserId && rows.length > 0
        ? await prisma.like.findMany({
            where: {
              userId: currentUserId,
              postId: { in: rows.map((r) => r.id) },
            },
            select: { postId: true },
          })
        : [];
    const likedSet = new Set(likedPostIds.map((l) => l.postId));

    return rows.map((r) => ({
      ...toPostWithAuthor(r),
      isLiked: likedSet.has(r.id),
    }));
  }
);

/** ポスト詳細用のクエリ結果（replies 含む） */
interface PostDetailQueryResult extends PostQueryResult {
  replies: PostQueryResult[];
}

/**
 * ポスト詳細を取得する（リプライ一覧含む）。
 * postId がリプライの場合は親ポストの詳細を返す。
 * currentUserId を渡すと各投稿の isLiked が設定される。
 * cache() により同一リクエスト内の重複呼び出しは1回のクエリに集約される。
 */
export const getPostById = cache(
  async (
    postId: string,
    currentUserId?: string
  ): Promise<PostDetailWithReplies | null> => {
    const target = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, replyToId: true },
    });

    if (!target) {
      return null;
    }

    const rootId = target.replyToId ?? target.id;

    const post = await prisma.post.findFirst({
      where: { id: rootId, replyToId: null },
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
            replies: true,
          },
        },
        replies: {
          orderBy: { createdAt: "asc" },
          include: postInclude,
        },
      },
    });

    if (!post) {
      return null;
    }

    const main = post as unknown as PostDetailQueryResult;
    const postIds = [main.id, ...main.replies.map((r) => r.id)];
    const likedPostIds =
      currentUserId && postIds.length > 0
        ? await prisma.like.findMany({
            where: {
              userId: currentUserId,
              postId: { in: postIds },
            },
            select: { postId: true },
          })
        : [];
    const likedSet = new Set(likedPostIds.map((l) => l.postId));

    function withIsLiked(p: PostWithAuthor): PostWithAuthor {
      return { ...p, isLiked: likedSet.has(p.id) };
    }

    return {
      post: withIsLiked(toPostWithAuthor(main)),
      replies: main.replies.map((r) =>
        withIsLiked(toPostWithAuthor(r as PostQueryResult))
      ),
    };
  }
);
