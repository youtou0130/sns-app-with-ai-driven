import type { FC } from "react";
import { Button } from "@/components/ui/button";

export const MobileHeader: FC = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 backdrop-blur lg:hidden"
      aria-label="ヘッダー"
    >
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50"
        aria-label="プロフィール"
      >
        Y
      </button>

      <span className="text-xl font-black tracking-tight text-slate-950 dark:text-slate-50">
        X
      </span>

      <Button
        variant="outline"
        size="sm"
        className="rounded-full border-slate-300 dark:border-slate-600 bg-transparent px-4 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        購入する
      </Button>
    </header>
  );
};
