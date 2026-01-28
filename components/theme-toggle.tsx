"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-9 w-[7.5rem] animate-pulse items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 p-0.5">
      <Button
        variant="ghost"
        size="sm"
        aria-label="ライトモード"
        className={`h-8 rounded-full px-3 ${
          theme === "light"
            ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-50 shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50"
        }`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="ml-1.5 text-xs font-medium">Light</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        aria-label="ダークモード"
        className={`h-8 rounded-full px-3 ${
          theme === "dark"
            ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-50 shadow-sm"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-50"
        }`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="ml-1.5 text-xs font-medium">Dark</span>
      </Button>
    </div>
  );
}
