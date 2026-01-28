import type { FC } from "react";
import type { Post } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Lock,
  MapPin,
  Calendar,
  ChevronRight,
  Check,
  X,
  CircleSlash,
  MoreHorizontal,
} from "lucide-react";

interface ProfileTimelineProps {
  posts: Post[];
}

const PROFILE_TABS = [
  { label: "ポスト", isActive: true },
  { label: "返信", isActive: false },
  { label: "ハイライト", isActive: false },
  { label: "記事", isActive: false },
  { label: "メディア", isActive: false },
  { label: "いいね", isActive: false },
];

export const ProfileTimeline: FC<ProfileTimelineProps> = ({ posts }) => {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden border-x-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 lg:border-x min-w-0 w-full">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* バナー */}
        <div className="h-48 shrink-0 bg-slate-300 dark:bg-slate-800" />

        <div className="px-4 pb-4">
          {/* プロフィール写真（バナーにオーバーレイ） */}
          <div className="-mt-16 mb-3 flex items-end justify-between">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-white dark:border-slate-950 bg-slate-400 dark:bg-slate-700 text-4xl font-semibold text-slate-700 dark:text-slate-50">
              Y
            </div>
            <Button
              variant="outline"
              className="rounded-full border-slate-400 dark:border-slate-600 bg-transparent px-4 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              プロフィールを編集
            </Button>
          </div>

          {/* ユーザー名・ハンドル */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-950 dark:text-slate-50">youtou</span>
              <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="text-slate-500">@youtou0130</p>
          </div>

          {/* 自己紹介・場所・参加日 */}
          <div className="mb-3 text-sm text-slate-600 dark:text-slate-300">
            <p className="mb-1">横浜 定期</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                横浜市保土ヶ谷区
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                2010年4月からXを利用しています
              </span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* フォロー / フォロワー */}
          <div className="mb-4 flex gap-4 text-sm">
            <span>
              <strong className="font-semibold text-slate-950 dark:text-slate-50">38</strong>
              <span className="text-slate-500"> フォロー中</span>
            </span>
            <span>
              <strong className="font-semibold text-slate-950 dark:text-slate-50">6</strong>
              <span className="text-slate-500"> フォロワー</span>
            </span>
          </div>

          {/* 認証バナー */}
          <div className="mb-4 flex items-start justify-between gap-2 rounded-xl border border-emerald-600/50 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3">
            <div className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <div className="text-sm">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  まだ認証されていません
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  認証で返信の強化、分析、広告のない表示などが利用できます。プロフィールをアップグレードしましょう。
                </p>
                <Button
                  variant="ghost"
                  className="mt-2 h-auto rounded-full bg-slate-800 dark:bg-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-50 hover:bg-slate-700 dark:hover:bg-slate-800"
                >
                  認証される
                </Button>
              </div>
            </div>
            <button className="shrink-0 text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* タブ */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab.label}
                className={`flex-1 whitespace-nowrap py-3 text-center text-sm ${
                  tab.isActive
                    ? "border-b-2 border-sky-500 font-semibold text-slate-950 dark:text-slate-50"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ポスト一覧 */}
        <ul>
          {posts.map((post) => (
            <ProfilePostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
};

interface ProfilePostItemProps {
  post: Post;
}

const ProfilePostItem: FC<ProfilePostItemProps> = ({ post }) => {
  return (
    <li className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
        {post.avatarInitial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1 text-sm">
            <span className="font-semibold truncate text-slate-950 dark:text-slate-50">{post.userName}</span>
            <span className="text-slate-500 truncate">{post.userHandle}</span>
            <span className="text-slate-500">・{post.createdAt}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button className="text-slate-500 hover:text-sky-400">
              <CircleSlash className="h-4 w-4" />
            </button>
            <button className="text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-950 dark:text-slate-50">
          {post.content}
        </p>

        <div className="mt-3 flex max-w-md items-center justify-between text-xs text-slate-500">
          <button className="flex items-center gap-1 hover:text-sky-400">
            <span>返信</span>
            <span>{post.replies}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-emerald-400">
            <span>リポスト</span>
            <span>{post.reposts}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-rose-400">
            <span>いいね</span>
            <span>{post.likes}</span>
          </button>
          <button className="hover:text-slate-600 dark:hover:text-slate-300">共有</button>
        </div>
      </div>
    </li>
  );
};
