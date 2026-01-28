import type { FC } from "react";
import Link from "next/link";
import { Home, Search, Bell, MessageCircle, Orbit } from "lucide-react";

export const MobileBottomNav: FC = () => {
  const iconClass = "h-6 w-6";
  const iconClassActive = "h-6 w-6 text-sky-500";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2 lg:hidden"
      aria-label="メインメニュー"
    >
      <Link
        href="/"
        className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
        aria-label="ホーム"
      >
        <span className="relative">
          <Home className={iconClassActive} />
          <span className="absolute -top-0.5 right-0 h-1.5 w-1.5 rounded-full bg-sky-500" />
        </span>
        <span className="text-[10px] font-medium">ホーム</span>
      </Link>

      <Link
        href="/"
        className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
        aria-label="話題を検索"
      >
        <Search className={iconClass} />
        <span className="text-[10px] font-medium">検索</span>
      </Link>

      <button
        type="button"
        className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
        aria-label="スペース"
      >
        <Orbit className={iconClass} />
        <span className="text-[10px] font-medium">スペース</span>
      </button>

      <button
        type="button"
        className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
        aria-label="通知"
      >
        <Bell className={iconClass} />
        <span className="text-[10px] font-medium">通知</span>
      </button>

      <Link
        href="/"
        className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400"
        aria-label="メッセージ"
      >
        <MessageCircle className={iconClass} />
        <span className="text-[10px] font-medium">メッセージ</span>
      </Link>
    </nav>
  );
};
