"use client";

import type { FC } from "react";
import { useState, useTransition, useOptimistic } from "react";
import { Heart } from "lucide-react";
import { toggleLike } from "@/lib/actions/posts";

interface LikeButtonProps {
  postId: string;
  isLiked?: boolean;
  likesCount: number;
}

interface LikeState {
  isLiked: boolean;
  likesCount: number;
}

function optimisticUpdate(current: LikeState, optimistic: LikeState): LikeState {
  return optimistic;
}

export const LikeButton: FC<LikeButtonProps> = ({
  postId,
  isLiked: initialLiked = false,
  likesCount: initialCount,
}) => {
  const [serverState, setServerState] = useState<LikeState>({
    isLiked: initialLiked,
    likesCount: initialCount,
  });
  const [optimisticState, addOptimistic] = useOptimistic(
    serverState,
    optimisticUpdate
  );
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const nextLiked = !optimisticState.isLiked;
    const nextCount = nextLiked
      ? optimisticState.likesCount + 1
      : Math.max(0, optimisticState.likesCount - 1);
    addOptimistic({ isLiked: nextLiked, likesCount: nextCount });

    startTransition(async () => {
      const result = await toggleLike(postId);
      if (result.ok && result.liked !== undefined) {
        setServerState({
          isLiked: result.liked,
          likesCount: result.liked
            ? serverState.likesCount + 1
            : Math.max(0, serverState.likesCount - 1),
        });
      }
    });
  }

  const { isLiked, likesCount } = optimisticState;

  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-full p-2 transition-colors disabled:opacity-50 ${
        isLiked
          ? "text-rose-500 hover:bg-rose-500/10"
          : "text-slate-500 hover:bg-rose-500/10 hover:text-rose-500"
      }`}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isLiked}
      aria-label={isLiked ? "いいねを解除" : "いいねする"}
    >
      <Heart
        className="h-4 w-4"
        fill={isLiked ? "currentColor" : "none"}
        strokeWidth={isLiked ? 0 : 2}
      />
      <span className="text-xs">{likesCount > 0 ? likesCount : ""}</span>
    </button>
  );
};
