// components/home/profile-timeline.tsx
import type { FC } from "react";
import type { UserProfile, PostWithAuthor } from "@/types/post";
import { PostCard } from "./post-card";
import { ProfileEditButton } from "./profile-edit-button";
import { FollowButton } from "./follow-button";
import { Calendar } from "lucide-react";

interface ProfileTimelineProps {
  user: UserProfile;
  posts: PostWithAuthor[];
  /** 表示中のプロフィールがログインユーザー自身か */
  isOwnProfile?: boolean;
}

const PROFILE_TABS = [
  { label: "ポスト", isActive: true },
  { label: "返信", isActive: false },
  { label: "ハイライト", isActive: false },
  { label: "記事", isActive: false },
  { label: "メディア", isActive: false },
  { label: "いいね", isActive: false },
];

function formatJoinDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月からXを利用しています`;
}

export const ProfileTimeline: FC<ProfileTimelineProps> = ({
  user,
  posts,
  isOwnProfile = false,
}) => {
  const displayName = user.displayName || user.username;
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden border-x-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 lg:border-x min-w-0 w-full">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* カバー画像 */}
        {user.coverUrl ? (
          <div className="h-48 shrink-0">
            <img
              src={user.coverUrl}
              alt="カバー画像"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 shrink-0 bg-slate-300 dark:bg-slate-800" />
        )}

        <div className="px-4 pb-4">
          {/* プロフィール写真（カバーにオーバーレイ） */}
          <div className="-mt-16 mb-3 flex items-end justify-between">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={displayName}
                className="h-32 w-32 shrink-0 rounded-full border-4 border-white dark:border-slate-950 object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-white dark:border-slate-950 bg-slate-400 dark:bg-slate-700 text-4xl font-semibold text-slate-700 dark:text-slate-50">
                {avatarInitial}
              </div>
            )}
            {isOwnProfile ? (
              <ProfileEditButton user={user} />
            ) : (
              <FollowButton
                targetUserId={user.id}
                isFollowing={user.isFollowing}
                followersCount={user.followersCount}
              />
            )}
          </div>

          {/* ユーザー名・ハンドル */}
          <div className="mb-3">
            <h1 className="text-xl font-bold text-slate-950 dark:text-slate-50">
              {displayName}
            </h1>
            <p className="text-slate-500">@{user.username}</p>
          </div>

          {/* 自己紹介 */}
          {user.bio && (
            <p className="mb-3 text-sm text-slate-800 dark:text-slate-200">
              {user.bio}
            </p>
          )}

          {/* 参加日 */}
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatJoinDate(user.createdAt)}
            </span>
          </div>

          {/* フォロー / フォロワー */}
          <div className="mb-4 flex gap-4 text-sm">
            <span>
              <strong className="font-semibold text-slate-950 dark:text-slate-50">
                {user.followingCount}
              </strong>
              <span className="text-slate-500"> フォロー中</span>
            </span>
            <span>
              <strong className="font-semibold text-slate-950 dark:text-slate-50">
                {user.followersCount}
              </strong>
              <span className="text-slate-500"> フォロワー</span>
            </span>
          </div>

          {/* タブ */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab.label}
                className={`flex-1 whitespace-nowrap py-3 text-center text-sm min-w-[80px] ${
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
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <p>まだ投稿がありません</p>
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} linkToDetail />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
