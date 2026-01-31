// components/home/home-timeline.tsx
import type { FC } from "react";
import type { PostWithAuthor } from "@/types/post";
import { PostCard } from "./post-card";
import { PostComposer } from "./post-composer";

interface HomeTimelineProps {
  posts: PostWithAuthor[];
}

export const HomeTimeline: FC<HomeTimelineProps> = ({ posts }) => {
  return (
    <section className="flex min-h-0 flex-1 flex-col border-x-0 lg:border-x border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-w-0 w-full">
      <div className="shrink-0">
        <TimelineHeader />
        <PostComposer />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <PostList posts={posts} />
      </div>
    </section>
  );
};

const TimelineHeader: FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="hidden h-14 items-center justify-between px-4 lg:flex">
        <h1 className="text-lg font-semibold text-slate-950 dark:text-slate-50">ホーム</h1>
      </div>

      <div className="grid grid-cols-2 text-sm">
        <button className="border-b-2 border-sky-500 py-3 font-semibold text-slate-950 dark:text-slate-50">
          おすすめ
        </button>
        <button className="py-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900">
          フォロー中
        </button>
      </div>
    </header>
  );
};

interface PostListProps {
  posts: PostWithAuthor[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <p>まだ投稿がありません</p>
      </div>
    );
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} linkToDetail />
      ))}
    </ul>
  );
};
