import type { FC } from "react";
import type { NavItem } from "@/app/page";
import { Button } from "@/components/ui/button";

interface HomeSidebarProps {
  navItems: NavItem[];
}

export const HomeSidebar: FC<HomeSidebarProps> = ({ navItems }) => {
  return (
    <aside className="hidden shrink-0 border-r border-slate-800 pr-4 pt-2 lg:flex lg:w-64 lg:flex-col">
      <div className="mb-4 flex h-12 items-center pl-2">
        <span className="text-2xl font-black tracking-tight">X</span>
      </div>

      <nav className="flex-1 space-y-1 text-lg">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-full px-3 py-2 text-left transition-colors ${
              item.isActive
                ? "font-semibold text-slate-50"
                : "text-slate-300 hover:bg-slate-900"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm">
              {item.label[0]}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pb-4 pt-2">
        <Button
          className="w-full rounded-full py-3 text-base font-semibold"
          variant="default"
        >
          ポストする
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-full px-3 py-2 hover:bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
            Y
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">youtou</span>
            <span className="text-xs text-slate-500">@youtou0130</span>
          </div>
        </div>
        <span className="text-xl text-slate-500">…</span>
      </div>
    </aside>
  );
};

