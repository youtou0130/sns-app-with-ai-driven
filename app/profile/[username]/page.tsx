// app/profile/[username]/page.tsx
import type { FC } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { HomeSidebar } from "@/components/home/home-sidebar";
import { HomeRightColumn } from "@/components/home/home-right-column";
import { ProfileTimeline } from "@/components/home/profile-timeline";
import { MobileHeader } from "@/components/home/mobile-header";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getUserByUsername } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { DUMMY_NEWS } from "@/app/page";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

const PROFILE_NAV_ITEMS = [
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

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await getUserByUsername(username);

  if (!data) {
    return { title: "ユーザーが見つかりません" };
  }

  const displayName = data.user.displayName || data.user.username;
  return {
    title: `${displayName} (@${data.user.username})`,
    description: data.user.bio || `${displayName}のプロフィール`,
  };
}

const ProfilePage: FC<ProfilePageProps> = async ({ params }) => {
  const { username } = await params;
  const { userId: clerkUserId } = await auth();
  const data = await getUserByUsername(username, clerkUserId ?? undefined);
  const dbUser =
    clerkUserId != null
      ? await prisma.user.findUnique({
          where: { clerkUserId },
          select: { id: true, username: true },
        })
      : null;

  if (!data) {
    notFound();
  }

  return (
    <main className="relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <MobileHeader />
      <div className="mx-auto flex h-full min-h-0 max-w-6xl flex-col px-0 pt-14 pb-16 sm:px-4 lg:flex-row lg:px-4 lg:pt-0 lg:pb-0">
        <HomeSidebar
          navItems={PROFILE_NAV_ITEMS}
          currentUsername={dbUser?.username}
        />
        <ProfileTimeline
          user={data.user}
          posts={data.posts}
          isOwnProfile={dbUser?.username === username}
        />
        <HomeRightColumn newsItems={DUMMY_NEWS} />
      </div>
      <MobileBottomNav />
    </main>
  );
};

export default ProfilePage;
