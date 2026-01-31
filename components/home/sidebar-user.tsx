"use client";

import type { FC } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export const SidebarUser: FC = () => {
  const { user } = useUser();

  return (
    <div className="mb-4 flex items-center justify-between rounded-full px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-900">
      <SignedIn>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
              {user?.fullName ?? user?.firstName ?? "ユーザー"}
            </span>
            <span className="block truncate text-xs text-slate-500">
              @{user?.username ?? ""}
            </span>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-full text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
              ?
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-slate-950 dark:text-slate-50">
                ログイン
              </span>
              <span className="block truncate text-xs text-slate-500">
                クリックしてサインイン
              </span>
            </div>
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};
