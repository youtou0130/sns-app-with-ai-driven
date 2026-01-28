import type { FC } from "react";
import type { NavItem, Post } from "../page";
import { DUMMY_NEWS } from "../page";
import { HomeSidebar } from "../../components/home/home-sidebar";
import { HomeRightColumn } from "../../components/home/home-right-column";
import { ProfileTimeline } from "../../components/home/profile-timeline";
import { MobileHeader } from "../../components/home/mobile-header";
import { MobileBottomNav } from "../../components/home/mobile-bottom-nav";

const PROFILE_NAV_ITEMS: NavItem[] = [
  { label: "ホーム", isActive: false },
  { label: "話題を検索", isActive: false },
  { label: "通知", isActive: false },
  { label: "フォローする", isActive: false },
  { label: "チャット", isActive: false },
  { label: "Grok", isActive: false },
  { label: "ブックマーク", isActive: false },
  { label: "プレミアム", isActive: false },
  { label: "プロフィール", isActive: true },
  { label: "もっと見る", isActive: false },
];

const PROFILE_POSTS: Post[] = [
  {
    id: 1,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年12月15日",
    content: "美味しかった",
    replies: 0,
    reposts: 0,
    likes: 2,
  },
  {
    id: 2,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年11月20日",
    content: "横浜の港の見える丘公園、おすすめ。",
    replies: 1,
    reposts: 0,
    likes: 5,
  },
  {
    id: 3,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年10月1日",
    content: "今日からX（旧Twitter）使い始めました。よろしくお願いします。",
    replies: 3,
    reposts: 1,
    likes: 12,
  },
  {
    id: 4,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年9月8日",
    content: "保土ヶ谷区の図書館、静かで集中できる。",
    replies: 0,
    reposts: 0,
    likes: 1,
  },
  {
    id: 5,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年8月22日",
    content: "みなとみらいの夜景、久しぶりに歩いてきた。",
    replies: 2,
    reposts: 1,
    likes: 8,
  },
  {
    id: 6,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年7月14日",
    content: "関内のカフェ、WiFi が速くて作業しやすい。",
    replies: 1,
    reposts: 0,
    likes: 4,
  },
  {
    id: 7,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年6月3日",
    content: "紅葉ヶ丘の桜、来年も見に来たい。",
    replies: 0,
    reposts: 0,
    likes: 3,
  },
  {
    id: 8,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年5月1日",
    content: "ゴールデンウィークは横浜周辺でゆっくり過ごす予定。",
    replies: 2,
    reposts: 0,
    likes: 6,
  },
  {
    id: 9,
    userName: "youtou",
    userHandle: "@youtou0130",
    avatarInitial: "Y",
    createdAt: "2019年4月10日",
    content: "はじめまして。横浜在住です。よろしく。",
    replies: 5,
    reposts: 0,
    likes: 15,
  },
];

const ProfilePage: FC = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <MobileHeader />
      <div className="mx-auto flex h-full min-h-0 max-w-6xl flex-col px-0 pt-14 pb-16 sm:px-4 lg:flex-row lg:px-4 lg:pt-0 lg:pb-0">
        <HomeSidebar navItems={PROFILE_NAV_ITEMS} />
        <ProfileTimeline posts={PROFILE_POSTS} />
        <HomeRightColumn newsItems={DUMMY_NEWS} />
      </div>
      <MobileBottomNav />
    </main>
  );
};

export default ProfilePage;
