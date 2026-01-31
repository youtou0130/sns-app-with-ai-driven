"use client";

import type { FC } from "react";
import { useState, useTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { followUser, unfollowUser } from "@/lib/actions/follow";

interface FollowButtonProps {
  targetUserId: string;
  isFollowing?: boolean;
  /** 表示用（楽観的更新で増減する） */
  followersCount?: number;
}

interface FollowState {
  isFollowing: boolean;
  followersCount: number;
}

function optimisticUpdate(
  _current: FollowState,
  optimistic: FollowState
): FollowState {
  return optimistic;
}

export const FollowButton: FC<FollowButtonProps> = ({
  targetUserId,
  isFollowing: initialFollowing = false,
  followersCount: initialCount = 0,
}) => {
  const [serverState, setServerState] = useState<FollowState>({
    isFollowing: initialFollowing,
    followersCount: initialCount,
  });
  const [optimisticState, addOptimistic] = useOptimistic(
    serverState,
    optimisticUpdate
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    const nextFollowing = !optimisticState.isFollowing;
    const nextCount = nextFollowing
      ? optimisticState.followersCount + 1
      : Math.max(0, optimisticState.followersCount - 1);
    addOptimistic({ isFollowing: nextFollowing, followersCount: nextCount });

    startTransition(async () => {
      const result = nextFollowing
        ? await followUser(targetUserId)
        : await unfollowUser(targetUserId);
      if (result.ok && result.following !== undefined) {
        setServerState({
          isFollowing: result.following,
          followersCount: result.following
            ? serverState.followersCount + 1
            : Math.max(0, serverState.followersCount - 1),
        });
        router.refresh();
      }
    });
  }

  const { isFollowing } = optimisticState;

  return (
    <Button
      type="button"
      variant={isFollowing ? "outline" : "default"}
      className="rounded-full border-slate-400 dark:border-slate-600 px-4 py-2 text-sm font-semibold"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isFollowing}
      aria-label={isFollowing ? "フォロー解除" : "フォロー"}
    >
      {isFollowing ? "フォロー中" : "フォロー"}
    </Button>
  );
};
