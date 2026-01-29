// components/home/post-card.tsx
import type { FC } from "react";
import Link from "next/link";
import type { PostWithAuthor } from "@/types/post";
import { formatRelativeTime } from "@/lib/utils/date";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Share,
} from "lucide-react";

interface PostCardProps {
  post: PostWithAuthor;
  /** true のとき本文・時刻をクリックで /posts/[id] へ */
  linkToDetail?: boolean;
}

export const PostCard: FC<PostCardProps> = ({
  post,
  linkToDetail = false,
}) => {
  const displayName = post.author.displayName || post.author.username;
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const profileHref = `/profile/${post.author.username}`;
  const postHref = `/posts/${post.id}`;

  const timeNode = (
    <span className="text-slate-500">{formatRelativeTime(post.createdAt)}</span>
  );
  const contentClasses =
    "mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-950 dark:text-slate-50";
  const contentNode = <div className={contentClasses}>{post.content}</div>;

  return (
    <li className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
      <Link href={profileHref} className="shrink-0">
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
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-sm">
          <Link
            href={profileHref}
            className="font-semibold truncate text-slate-950 dark:text-slate-50 hover:underline"
          >
            {displayName}
          </Link>
          <Link
            href={profileHref}
            className="text-slate-500 truncate hover:underline"
          >
            @{post.author.username}
          </Link>
          <span className="text-slate-500">・</span>
          {linkToDetail ? (
            <Link href={postHref} className="text-slate-500 hover:underline">
              {timeNode}
            </Link>
          ) : (
            timeNode
          )}
        </div>

        {linkToDetail ? (
          <Link href={postHref} className={`block ${contentClasses}`}>
            {post.content}
          </Link>
        ) : (
          contentNode
        )}

        <div className="mt-3 flex max-w-md items-center justify-between text-slate-500">
          {linkToDetail ? (
            <Link
              href={postHref}
              className="flex items-center gap-1.5 rounded-full p-2 -ml-2 hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.repliesCount || ""}</span>
            </Link>
          ) : (
            <button className="flex items-center gap-1.5 rounded-full p-2 -ml-2 hover:bg-sky-500/10 hover:text-sky-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.repliesCount || ""}</span>
            </button>
          )}
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
