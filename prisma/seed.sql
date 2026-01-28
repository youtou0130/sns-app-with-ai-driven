-- ============================================
-- Seed Data for SNS Application
-- Supabase SQL Editor で実行してください
-- ============================================

-- 既存データをクリア（開発用）
TRUNCATE TABLE follows, retweets, likes, posts, users RESTART IDENTITY CASCADE;

-- ============================================
-- Users (5人のテストユーザー)
-- パスワードは全て "password123" のハッシュ（bcrypt）
-- ============================================
INSERT INTO users (id, username, email, password_hash, display_name, bio, avatar_url, cover_url, created_at, updated_at) VALUES
  ('cluser001alice', 'alice', 'alice@example.com', '$2b$10$dummyhashfordevonly000000000000000000000000000000', 'Alice Johnson', 'フルスタックエンジニア 🚀 React / Next.js が好き', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', NOW() - INTERVAL '30 days', NOW()),
  ('cluser002bob00', 'bob', 'bob@example.com', '$2b$10$dummyhashfordevonly000000000000000000000000000000', 'Bob Smith', 'デザイナー & フロントエンド開発者。UI/UX に情熱を注いでいます。', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800', NOW() - INTERVAL '25 days', NOW()),
  ('cluser003carol', 'carol', 'carol@example.com', '$2b$10$dummyhashfordevonly000000000000000000000000000000', 'Carol Williams', 'バックエンドエンジニア | Go, Rust, PostgreSQL', 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol', 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800', NOW() - INTERVAL '20 days', NOW()),
  ('cluser004david', 'david', 'david@example.com', '$2b$10$dummyhashfordevonly000000000000000000000000000000', 'David Brown', 'スタートアップ創業者 | テック系投資家', 'https://api.dicebear.com/7.x/avataaars/svg?seed=david', 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800', NOW() - INTERVAL '15 days', NOW()),
  ('cluser005emma0', 'emma', 'emma@example.com', '$2b$10$dummyhashfordevonly000000000000000000000000000000', 'Emma Davis', 'プロダクトマネージャー | アジャイル推進派', 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800', NOW() - INTERVAL '10 days', NOW());

-- ============================================
-- Posts (各ユーザーの投稿)
-- ============================================
INSERT INTO posts (id, user_id, content, created_at, updated_at) VALUES
  -- Alice の投稿
  ('clpost001alice1', 'cluser001alice', 'Next.js 15 の新機能を試してみた！Server Actions が本当に便利 🎉', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('clpost002alice2', 'cluser001alice', 'TypeScript の satisfies 演算子、もっと早く知りたかった...', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('clpost003alice3', 'cluser001alice', '今日のコーヒーは最高だった ☕', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  -- Bob の投稿
  ('clpost004bob001', 'cluser002bob00', 'Figma の新しいプラグインを作成中。デザインシステムの自動生成ができるようになる予定！', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
  ('clpost005bob002', 'cluser002bob00', 'ダークモードのデザイン、コントラスト比の調整が難しい...', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  
  -- Carol の投稿
  ('clpost006carol1', 'cluser003carol', 'PostgreSQL のパーティショニング、大規模データには必須だね', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
  ('clpost007carol2', 'cluser003carol', 'Rust の所有権システム、最初は難しいけど慣れると最高', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('clpost008carol3', 'cluser003carol', 'Go 1.22 のループ変数のスコープ変更、やっと来た！', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  
  -- David の投稿
  ('clpost009david1', 'cluser004david', 'AI スタートアップへの投資が加速している。次の波に乗り遅れるな！', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
  ('clpost010david2', 'cluser004david', '今日のミーティングで素晴らしいピッチを聞いた。未来は明るい 🌟', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  
  -- Emma の投稿
  ('clpost011emma01', 'cluser005emma0', 'スプリントレトロスペクティブの新しいフォーマットを試してみた。チームの反応が良い！', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('clpost012emma02', 'cluser005emma0', 'プロダクトロードマップの優先順位付け、ステークホルダーとの調整が大変...', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- ============================================
-- Likes (いいね)
-- ============================================
INSERT INTO likes (id, user_id, post_id, created_at) VALUES
  -- Alice の投稿へのいいね
  ('cllike001bob01', 'cluser002bob00', 'clpost001alice1', NOW() - INTERVAL '4 days'),
  ('cllike002carol1', 'cluser003carol', 'clpost001alice1', NOW() - INTERVAL '4 days'),
  ('cllike003david1', 'cluser004david', 'clpost001alice1', NOW() - INTERVAL '3 days'),
  ('cllike004emma01', 'cluser005emma0', 'clpost002alice2', NOW() - INTERVAL '2 days'),
  ('cllike005bob02', 'cluser002bob00', 'clpost003alice3', NOW() - INTERVAL '12 hours'),
  
  -- Bob の投稿へのいいね
  ('cllike006alice1', 'cluser001alice', 'clpost004bob001', NOW() - INTERVAL '3 days'),
  ('cllike007emma02', 'cluser005emma0', 'clpost004bob001', NOW() - INTERVAL '3 days'),
  
  -- Carol の投稿へのいいね
  ('cllike008alice2', 'cluser001alice', 'clpost006carol1', NOW() - INTERVAL '5 days'),
  ('cllike009david2', 'cluser004david', 'clpost007carol2', NOW() - INTERVAL '2 days'),
  ('cllike010bob03', 'cluser002bob00', 'clpost008carol3', NOW() - INTERVAL '10 hours'),
  
  -- David の投稿へのいいね
  ('cllike011emma03', 'cluser005emma0', 'clpost009david1', NOW() - INTERVAL '6 days'),
  ('cllike012alice3', 'cluser001alice', 'clpost010david2', NOW() - INTERVAL '1 day'),
  ('cllike013carol2', 'cluser003carol', 'clpost010david2', NOW() - INTERVAL '1 day'),
  
  -- Emma の投稿へのいいね
  ('cllike014david3', 'cluser004david', 'clpost011emma01', NOW() - INTERVAL '4 days'),
  ('cllike015bob04', 'cluser002bob00', 'clpost012emma02', NOW() - INTERVAL '8 hours');

-- ============================================
-- Retweets (リツイート)
-- ============================================
INSERT INTO retweets (id, user_id, post_id, created_at) VALUES
  ('clrt00001bob01', 'cluser002bob00', 'clpost001alice1', NOW() - INTERVAL '4 days'),
  ('clrt00002emma01', 'cluser005emma0', 'clpost001alice1', NOW() - INTERVAL '3 days'),
  ('clrt00003alice1', 'cluser001alice', 'clpost006carol1', NOW() - INTERVAL '5 days'),
  ('clrt00004david1', 'cluser004david', 'clpost007carol2', NOW() - INTERVAL '2 days'),
  ('clrt00005carol1', 'cluser003carol', 'clpost009david1', NOW() - INTERVAL '6 days'),
  ('clrt00006alice2', 'cluser001alice', 'clpost011emma01', NOW() - INTERVAL '4 days');

-- ============================================
-- Follows (フォロー関係)
-- ============================================
INSERT INTO follows (id, follower_id, following_id, created_at) VALUES
  -- Alice がフォローしている人
  ('clfollow001ab', 'cluser001alice', 'cluser002bob00', NOW() - INTERVAL '28 days'),
  ('clfollow002ac', 'cluser001alice', 'cluser003carol', NOW() - INTERVAL '25 days'),
  ('clfollow003ad', 'cluser001alice', 'cluser004david', NOW() - INTERVAL '20 days'),
  
  -- Bob がフォローしている人
  ('clfollow004ba', 'cluser002bob00', 'cluser001alice', NOW() - INTERVAL '24 days'),
  ('clfollow005bc', 'cluser002bob00', 'cluser003carol', NOW() - INTERVAL '22 days'),
  ('clfollow006be', 'cluser002bob00', 'cluser005emma0', NOW() - INTERVAL '18 days'),
  
  -- Carol がフォローしている人
  ('clfollow007ca', 'cluser003carol', 'cluser001alice', NOW() - INTERVAL '19 days'),
  ('clfollow008cd', 'cluser003carol', 'cluser004david', NOW() - INTERVAL '15 days'),
  
  -- David がフォローしている人
  ('clfollow009da', 'cluser004david', 'cluser001alice', NOW() - INTERVAL '14 days'),
  ('clfollow010db', 'cluser004david', 'cluser002bob00', NOW() - INTERVAL '12 days'),
  ('clfollow011dc', 'cluser004david', 'cluser003carol', NOW() - INTERVAL '10 days'),
  ('clfollow012de', 'cluser004david', 'cluser005emma0', NOW() - INTERVAL '8 days'),
  
  -- Emma がフォローしている人
  ('clfollow013ea', 'cluser005emma0', 'cluser001alice', NOW() - INTERVAL '9 days'),
  ('clfollow014eb', 'cluser005emma0', 'cluser002bob00', NOW() - INTERVAL '7 days'),
  ('clfollow015ed', 'cluser005emma0', 'cluser004david', NOW() - INTERVAL '5 days');

-- ============================================
-- 確認クエリ
-- ============================================
SELECT 'Users' AS table_name, COUNT(*) AS count FROM users
UNION ALL
SELECT 'Posts', COUNT(*) FROM posts
UNION ALL
SELECT 'Likes', COUNT(*) FROM likes
UNION ALL
SELECT 'Retweets', COUNT(*) FROM retweets
UNION ALL
SELECT 'Follows', COUNT(*) FROM follows;
