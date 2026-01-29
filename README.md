This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database (Supabase + Prisma)

このプロジェクトは **Supabase** (PostgreSQL) と **Prisma** でデータベースを利用します。

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数

プロジェクトルートに `.env` を作成し、`.env.example` を参考に以下を設定します。

- **Prisma**: `DATABASE_URL`（トランザクションプーラー）、`DIRECT_URL`（マイグレーション用）
- **Supabase クライアント**: `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`

接続文字列は [Supabase ダッシュボード](https://supabase.com/dashboard) > プロジェクト > **Settings** > **Database** > **Connection string** で取得できます。

### 3. マイグレーション

スキーマを DB に反映する場合:

```bash
npm run db:push
# または履歴を残す場合
npm run db:migrate
```

### 4. Prisma Client の生成

```bash
npm run db:generate
```

`npm run build` 時にも自動で実行されます。

### 利用例

- **Prisma**: `import { prisma } from "@/lib/prisma"` で CRUD
- **Supabase（サーバー）**: `import { createClient } from "@/lib/supabase/server"` → `const supabase = await createClient()`
- **Supabase（クライアント）**: `import { createClient } from "@/lib/supabase/client"` → `const supabase = createClient()`

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# sns-app-with-ai-driven
