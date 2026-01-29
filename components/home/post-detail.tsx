// components/home/post-detail.tsx
import type { FC } from "react";
import type { PostDetailWithReplies } from "@/types/post";
import { PostCard } from "./post-card";

interface PostDetailProps {
  data: PostDetailWithReplies;
}

export const PostDetail: FC<PostDetailProps> = ({ data }) => {
  const { post, replies } = data;

  return (
    <section className="flex min-h-0 flex-1 flex-col border-x-0 lg:border-x border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-w-0 w-full">
      <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur px-4 py-3">
        <h1 className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          ポスト
        </h1>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul>
          <PostCard post={post} linkToDetail={false} />
          {replies.map((reply) => (
            <PostCard key={reply.id} post={reply} linkToDetail={false} />
          ))}
        </ul>
      </div>
    </section>
  );
};
