// app/page.tsx
import type { FC } from "react";
import { HomeSidebar } from "@/components/home/home-sidebar";
import { HomeTimeline } from "@/components/home/home-timeline";
import { HomeRightColumn } from "@/components/home/home-right-column";
import { MobileHeader } from "@/components/home/mobile-header";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getTimelinePosts } from "@/lib/posts";

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  timeAgo: string;
  postsCount: string;
}

export interface NavItem {
  label: string;
  isActive: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "ホーム", isActive: true },
  { label: "話題を検索", isActive: false },
  { label: "通知", isActive: false },
  { label: "フォローする", isActive: false },
  { label: "チャット", isActive: false },
  { label: "Grok", isActive: false },
  { label: "ブックマーク", isActive: false },
  { label: "プレミアム", isActive: false },
  { label: "プロフィール", isActive: false },
  { label: "もっと見る", isActive: false },
];

export const DUMMY_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "中道改革連合の比例票表記で混乱　旧党名有効かは選管任せ",
    category: "ニュース",
    timeAgo: "3日前",
    postsCount: "290,121件のポスト",
  },
  {
    id: 2,
    title:
      "Vaundy「SILENCE」ドームツアー公式グッズ公開、おもちゃ箱のような可愛いデザインに…",
    category: "エンターテインメント",
    timeAgo: "1日前",
    postsCount: "6,920件のポスト",
  },
  {
    id: 3,
    title: "黒人はkawaiiになれない？ 日本人ユーザーが黒人ギャル文化で猛反発",
    category: "カルチャー",
    timeAgo: "1日前",
    postsCount: "41,347件のポスト",
  },
];

const HomePage: FC = async () => {
  const posts = await getTimelinePosts();

  return (
    <main className="relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <MobileHeader />
      <div className="mx-auto flex h-full min-h-0 max-w-6xl flex-col px-0 pt-14 pb-16 sm:px-4 lg:flex-row lg:px-4 lg:pt-0 lg:pb-0">
        <HomeSidebar navItems={NAV_ITEMS} />
        <HomeTimeline posts={posts} />
        <HomeRightColumn newsItems={DUMMY_NEWS} />
      </div>
      <MobileBottomNav />
    </main>
  );
};

export default HomePage;
