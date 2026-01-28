import type { FC, ReactElement } from "react";
import Link from "next/link";
import type { NavItem } from "@/app/page";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Home,
  Search,
  Bell,
  Users,
  MessageCircle,
  Orbit,
  Bookmark,
  BadgeCheck,
  User,
  MoreHorizontal,
} from "lucide-react";

interface HomeSidebarProps {
  navItems: NavItem[];
}

function getNavIcon(label: string, isActive: boolean): ReactElement {
  const iconClass =
    "h-6 w-6" + (isActive ? " text-slate-950 dark:text-slate-50" : " text-slate-500 dark:text-slate-200");

  switch (label) {
    case "ホーム":
      return <Home className={iconClass} />;
    case "話題を検索":
      return <Search className={iconClass} />;
    case "通知":
      return <Bell className={iconClass} />;
    case "フォローする":
      return <Users className={iconClass} />;
    case "チャット":
      return <MessageCircle className={iconClass} />;
    case "Grok":
      return <Orbit className={iconClass} />;
    case "ブックマーク":
      return <Bookmark className={iconClass} />;
    case "プレミアム":
      return <BadgeCheck className={iconClass} />;
    case "プロフィール":
      return <User className={iconClass} />;
    case "もっと見る":
      return <MoreHorizontal className={iconClass} />;
    default:
      return <Home className={iconClass} />;
  }
}

export const HomeSidebar: FC<HomeSidebarProps> = ({ navItems }) => {
  return (
    <aside className="hidden shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pr-4 pt-2 lg:flex lg:w-64 lg:flex-col">
      <div className="mb-4 flex h-12 items-center pl-2">
        <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">X</span>
      </div>

      <nav className="flex-1 space-y-1 text-lg">
        {navItems.map((item) => {
          const baseClassName = `flex w-full items-center gap-3 rounded-full px-3 py-2 text-left transition-colors ${
            item.isActive
              ? "font-semibold text-slate-950 dark:text-slate-50"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-900"
          }`;

          const content = (
            <>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full">
                {getNavIcon(item.label, item.isActive)}
                {(item.label === "通知" ||
                  item.label === "Grok" ||
                  item.label === "プレミアム") && (
                  <span className="absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-sky-500" />
                )}
              </span>
              <span>{item.label}</span>
            </>
          );

          if (item.label === "プロフィール") {
            return (
              <Link
                key={item.label}
                href="/profile"
                className={baseClassName}
              >
                {content}
              </Link>
            );
          }

          return (
            <button key={item.label} className={baseClassName}>
              {content}
            </button>
          );
        })}
      </nav>

      <div className="pb-4 pt-2">
        <Button
          className="w-full h-auto rounded-full bg-slate-950 dark:bg-[#0f1419] px-6 py-3 text-base font-semibold text-white hover:bg-slate-800 dark:hover:bg-[#1b2733]"
          variant="ghost"
        >
          ポストする
        </Button>
      </div>

      <div className="mb-3 px-2">
        <ThemeToggle />
      </div>

      <div className="mb-4 flex items-center justify-between rounded-full px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-50">
            Y
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-950 dark:text-slate-50">youtou</span>
            <span className="text-xs text-slate-500">@youtou0130</span>
          </div>
        </div>
        <span className="text-xl text-slate-500">…</span>
      </div>
    </aside>
  );
};

