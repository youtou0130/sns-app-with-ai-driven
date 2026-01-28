// components/home/home-right-column.tsx
import type { FC } from "react";
import type { NewsItem } from "@/app/page";
import { Button } from "@/components/ui/button";

interface HomeRightColumnProps {
  newsItems: NewsItem[];
}

export const HomeRightColumn: FC<HomeRightColumnProps> = ({ newsItems }) => {
  return (
    <aside className="hidden w-80 shrink-0 pl-4 pt-2 xl:block bg-slate-100 dark:bg-slate-950">
      <SearchBox />
      <PremiumCard />
      <TodayNews newsItems={newsItems} />
    </aside>
  );
};

const SearchBox: FC = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center rounded-full bg-slate-200 dark:bg-slate-900 px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="mr-2 text-slate-500">🔍</span>
        <input
          className="w-full bg-transparent outline-none placeholder:text-slate-500 text-slate-950 dark:text-slate-50"
          placeholder="検索"
        />
      </div>
    </div>
  );
};

const PremiumCard: FC = () => {
  return (
    <section className="mb-4 rounded-2xl bg-slate-200 dark:bg-slate-900 px-4 py-3">
      <h2 className="text-base font-bold text-slate-950 dark:text-slate-50">プレミアムにサブスクライブ</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        サブスクライブして新機能を利用しましょう。資格を満たしている場合、収益分配を受け取れます。
      </p>
      <Button className="mt-3 rounded-full px-4 py-1.5 text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white">
        購入する
      </Button>
    </section>
  );
};

interface TodayNewsProps {
  newsItems: NewsItem[];
}

const TodayNews: FC<TodayNewsProps> = ({ newsItems }) => {
  return (
    <section className="mb-4 rounded-2xl bg-slate-200 dark:bg-slate-900 px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-950 dark:text-slate-50">本日のニュース</h2>
        <button className="text-xs text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">X</button>
      </div>

      <ul className="space-y-3">
        {newsItems.map((news) => (
          <li key={news.id} className="text-sm">
            <p className="font-semibold leading-snug text-slate-950 dark:text-slate-50">{news.title}</p>
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