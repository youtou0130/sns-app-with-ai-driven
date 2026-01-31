// app/posts/[postId]/page.tsx
import type { FC } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { HomeSidebar } from "@/components/home/home-sidebar";
import { HomeRightColumn } from "@/components/home/home-right-column";
import { PostDetail } from "@/components/home/post-detail";
import { MobileHeader } from "@/components/home/mobile-header";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";
import { getPostById } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { DUMMY_NEWS } from "@/app/page";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

const POST_NAV_ITEMS = [
  { label: "ホーム", isActive: false },
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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const data = await getPostById(postId);

  if (!data) {
    return { title: "ポストが見つかりません" };
  }

  const name = data.post.author.displayName || data.post.author.username;
  const preview = data.post.content.slice(0, 80);
  return {
    title: `${name} on X: "${preview}${data.post.content.length > 80 ? "…" : ""}"`,
    description: data.post.content,
  };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
  const { postId } = await params;
  const { userId: clerkUserId } = await auth();
  const dbUser =
    clerkUserId != null
      ? await prisma.user.findUnique({
          where: { clerkUserId },
          select: { id: true, username: true },
        })
      : null;
  const data = await getPostById(postId, dbUser?.id);

  if (!data) {
    notFound();
  }

  return (
    <main className="relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      <MobileHeader />
      <div className="mx-auto flex h-full min-h-0 max-w-6xl flex-col px-0 pt-14 pb-16 sm:px-4 lg:flex-row lg:px-4 lg:pt-0 lg:pb-0">
        <HomeSidebar
          navItems={POST_NAV_ITEMS}
          currentUsername={dbUser?.username}
        />
        <PostDetail data={data} />
        <HomeRightColumn newsItems={DUMMY_NEWS} />
      </div>
      <MobileBottomNav />
    </main>
  );
};

export default PostPage;
