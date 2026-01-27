// app/page.tsx
import type { FC } from "react";

export interface Post {
  id: number;
  userName: string;
  userHandle: string;
  avatarInitial: string;
  createdAt: string;
  content: string;
  replies: number;
  reposts: number;
  likes: number;
}

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

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    userName: "VibeCoder",
    userHandle: "@vibecoder",
    avatarInitial: "V",
    createdAt: "いま",
    content:
      "AI 駆動の SNS を Next.js + TypeScript で開発中。\nまずはタイムラインとサイドバーから実装しています。",
    replies: 3,
    reposts: 1,
    likes: 12,
  },
  {
    id: 2,
    userName: "Next.js Dev",
    userHandle: "@next_dev",
    avatarInitial: "N",
    createdAt: "5分",
    content:
      "App Router のサーバーコンポーネントを使うと、X っぽいタイムラインも高速にレンダリングできます。",
    replies: 2,
    reposts: 4,
    likes: 32,
  },
  {
    id: 3,
    userName: "Tailwind Lover",
    userHandle: "@tw_lover",
    avatarInitial: "T",
    createdAt: "30分",
    content:
      "3 カラムレイアウトは\n- 左: ナビゲーション\n- 中央: タイムライン\n- 右: サイド情報\nの構成にすると、X に近い体験になります。",
    replies: 0,
    reposts: 0,
    likes: 7,
  },
];

const DUMMY_NEWS: NewsItem[] = [
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

const HomePage: FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl px-2 sm:px-4">
        <HomeSidebar navItems={NAV_ITEMS} />

        <HomeTimeline posts={DUMMY_POSTS} />

        <HomeRightColumn newsItems={DUMMY_NEWS} />
      </div>
    </main>
  );
};

interface HomeSidebarProps {
  navItems: NavItem[];
}

const HomeSidebar: FC<HomeSidebarProps> = ({ navItems }) => {
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
        <button className="w-full rounded-full bg-sky-500 py-3 text-center text-base font-semibold text-white hover:bg-sky-400">
          ポストする
        </button>
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

interface HomeTimelineProps {
  posts: Post[];
}

const HomeTimeline: FC<HomeTimelineProps> = ({ posts }) => {
  return (
    <section className="flex-1 border-x border-slate-800">
      <TimelineHeader />
      <PostComposer />
      <PostList posts={posts} />
    </section>
  );
};

const TimelineHeader: FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">ホーム</h1>
      </div>

      <div className="grid grid-cols-2 text-sm">
        <button className="border-b-2 border-sky-500 py-3 font-semibold">
          おすすめ
        </button>
        <button className="py-3 text-slate-500 hover:bg-slate-900">
          フォロー中
        </button>
      </div>
    </header>
  );
};

const PostComposer: FC = () => {
  return (
    <div className="flex gap-3 border-b border-slate-800 px-4 py-3">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
        Y
      </div>
      <div className="flex-1">
        <textarea
          className="w-full resize-none bg-transparent text-base outline-none placeholder:text-slate-500"
          rows={2}
          placeholder="いまどうしてる？"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-3 text-slate-500 text-xl">
            <span>🖼</span>
            <span>GIF</span>
            <span>📊</span>
            <span>😊</span>
            <span>📍</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:inline">
              AI 投稿（ダミー）
            </span>
            <button className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-400">
              ポストする
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

interface PostItemProps {
  post: Post;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <li className="flex gap-3 border-b border-slate-800 px-4 py-3 hover:bg-slate-900/60 transition-colors">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold">
        {post.avatarInitial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-sm">
          <span className="font-semibold truncate">{post.userName}</span>
          <span className="text-slate-500 truncate">{post.userHandle}</span>
          <span className="text-slate-500">・{post.createdAt}</span>
        </div>

        <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed">
          {post.content}
        </p>

        <div className="mt-3 flex max-w-md items-center justify-between text-xs text-slate-500">
          <button className="flex items-center gap-1 hover:text-sky-400">
            <span>返信</span>
            <span>{post.replies}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-emerald-400">
            <span>リポスト</span>
            <span>{post.reposts}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-rose-400">
            <span>いいね</span>
            <span>{post.likes}</span>
          </button>
          <button className="hover:text-slate-300">共有</button>
        </div>
      </div>
    </li>
  );
};

interface HomeRightColumnProps {
  newsItems: NewsItem[];
}

const HomeRightColumn: FC<HomeRightColumnProps> = ({ newsItems }) => {
  return (
    <aside className="hidden w-80 shrink-0 pl-4 pt-2 xl:block">
      <SearchBox />
      <PremiumCard />
      <TodayNews newsItems={newsItems} />
    </aside>
  );
};

const SearchBox: FC = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-400">
        <span className="mr-2 text-slate-500">🔍</span>
        <input
          className="w-full bg-transparent outline-none placeholder:text-slate-500"
          placeholder="検索"
        />
      </div>
    </div>
  );
};

const PremiumCard: FC = () => {
  return (
    <section className="mb-4 rounded-2xl bg-slate-900 px-4 py-3">
      <h2 className="text-base font-bold">プレミアムにサブスクライブ</h2>
      <p className="mt-2 text-sm text-slate-300">
        サブスクライブして新機能を利用しましょう。資格を満たしている場合、収益分配を受け取れます。
      </p>
      <button className="mt-3 rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-sky-400">
        購入する
      </button>
    </section>
  );
};

interface TodayNewsProps {
  newsItems: NewsItem[];
}

const TodayNews: FC<TodayNewsProps> = ({ newsItems }) => {
  return (
    <section className="mb-4 rounded-2xl bg-slate-900 px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold">本日のニュース</h2>
        <button className="text-xs text-slate-500 hover:text-slate-300">
          X
        </button>
      </div>

      <ul className="space-y-3">
        {newsItems.map((news) => (
          <li key={news.id} className="text-sm">
            <p className="font-semibold leading-snug">{news.title}</p>
            <p className="mt-1 text-xs text-slate-500">
              {news.timeAgo}・{news.category}・{news.postsCount}
            </p>
          </li>
        ))}
      </ul>

      <button className="mt-3 text-sm text-sky-400 hover:text-sky-300">
        さらに表示
      </button>
    </section>
  );
};

export default HomePage;