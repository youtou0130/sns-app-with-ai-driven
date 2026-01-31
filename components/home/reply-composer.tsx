"use client";

import type { FC } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { createReply } from "@/lib/actions/posts";
import { X } from "lucide-react";

interface ReplyComposerProps {
  /** 返信先のポスト（ルートポスト）の id */
  replyToPostId: string;
  /** 返信先の作者の username（プレースホルダー用） */
  replyToUsername?: string;
}

export const ReplyComposer: FC<ReplyComposerProps> = ({
  replyToPostId,
  replyToUsername,
}) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleReply() {
    if (!isSignedIn) {
      setIsAuthOpen(true);
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await createReply(replyToPostId, content);
      if (result.ok) {
        setContent("");
        router.refresh();
      } else {
        setError(result.error ?? "返信に失敗しました。");
      }
    });
  }

  const placeholder = replyToUsername
    ? `@${replyToUsername} に返信`
    : "返信を投稿";

  return (
    <>
      <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-950">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
          Y
        </div>
        <div className="min-w-0 flex-1">
          <textarea
            className="w-full resize-none bg-transparent text-base outline-none placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
            rows={2}
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={280}
            disabled={isPending}
          />
          {error && (
            <p
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              className="h-auto rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
              variant="ghost"
              onClick={handleReply}
              disabled={isPending || !content.trim()}
            >
              {isPending ? "送信中..." : "返信"}
            </Button>
          </div>
        </div>
      </div>

      {isAuthOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reply-auth-modal-title"
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
              <h2 id="reply-auth-modal-title" className="sr-only">
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
