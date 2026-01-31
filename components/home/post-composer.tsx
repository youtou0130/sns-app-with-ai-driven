"use client";

import type { FC } from "react";
import { useState, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/actions/posts";
import {
  Image as ImageIcon,
  Gift,
  BarChart3,
  Smile,
  CalendarClock,
  MapPin,
  X,
} from "lucide-react";

export const PostComposer: FC = () => {
  const { isSignedIn } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handlePostClick() {
    if (!isSignedIn) {
      setIsAuthOpen(true);
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createPost(content);
      if (result.ok) {
        setContent("");
      } else {
        setError(result.error ?? "投稿に失敗しました。");
      }
    });
  }

  return (
    <>
      <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-950">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
          Y
        </div>
        <div className="flex-1 min-w-0">
          <textarea
            className="w-full resize-none bg-transparent text-base outline-none placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
            rows={2}
            placeholder="いまどうしてる？"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={280}
            disabled={isPending}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
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
                type="button"
                className="h-auto rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
                variant="ghost"
                onClick={handlePostClick}
                disabled={isPending}
              >
                {isPending ? "投稿中..." : "ポストする"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isAuthOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          onClick={() => setIsAuthOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white dark:bg-slate-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 right-0 z-10 flex justify-end p-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsAuthOpen(false)}
                aria-label="閉じる"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="px-4 pb-6 pt-0">
              <h2 id="auth-modal-title" className="sr-only">
                ログイン
              </h2>
              <SignIn
                routing="hash"
                signUpUrl="/sign-up"
                afterSignInUrl="/"
                appearance={{
                  elements: {
                    rootBox: "w-full mx-0 shadow-none",
                    card: "shadow-none",
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
