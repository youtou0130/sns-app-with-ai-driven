// components/home/home-timeline.tsx
import type { FC } from "react";
import type { PostWithAuthor } from "@/types/post";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils/date";
import {
  Image as ImageIcon,
  Gift,
  BarChart3,
  Smile,
  CalendarClock,
  MapPin,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
} from "lucide-react";

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

const PostComposer: FC = () => {
  return (
    <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-950">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
        Y
      </div>
      <div className="flex-1">
        <textarea
          className="w-full resize-none bg-transparent text-base outline-none placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
          rows={2}
          placeholder="いまどうしてる？"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-4 text-sky-500">
            <ImageIcon className="h-5 w-5" />
            <Gift className="h-5 w-5" />
            <BarChart3 className="h-5 w-5" />
            <Smile className="h-5 w-5" />
            <CalendarClock className="h-5 w-5" />
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="h-auto rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-600"
              variant="ghost"
            >
              ポストする
            </Button>
          </div>
        </div>
      </div>
    </div>
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
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

interface PostItemProps {
  post: PostWithAuthor;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const displayName = post.author.displayName || post.author.username;
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <li className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors cursor-pointer">
      {/* Avatar */}
      {post.author.avatarUrl ? (
        <img
          src={post.author.avatarUrl}
          alt={displayName}
          className="mt-1 h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
          {avatarInitial}
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* User info */}
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold truncate text-slate-950 dark:text-slate-50">
            {displayName}
          </span>
          <span className="text-slate-500 truncate">@{post.author.username}</span>
          <span className="text-slate-500">・</span>
          <span className="text-slate-500">{formatRelativeTime(post.createdAt)}</span>
        </div>

        {/* Content */}
        <p className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-950 dark:text-slate-50">
          {post.content}
        </p>

        {/* Actions */}
        <div className="mt-3 flex max-w-md items-center justify-between text-slate-500">
          <button className="flex items-center gap-1.5 rounded-full p-2 -ml-2 hover:bg-sky-500/10 hover:text-sky-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.repliesCount || ""}</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-full p-2 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors">
            <Repeat2 className="h-4 w-4" />
            <span className="text-xs">{post.retweetsCount || ""}</span>
          </button>
          <button className="flex items-center gap-1.5 rounded-full p-2 hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{post.likesCount || ""}</span>
          </button>
          <button className="rounded-full p-2 hover:bg-sky-500/10 hover:text-sky-500 transition-colors">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
};
