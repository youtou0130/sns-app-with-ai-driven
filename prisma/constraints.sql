-- Prisma では CHECK 制約を直接定義できないため、
-- マイグレーション後に以下を Supabase SQL Editor で実行してください。

-- 投稿文字数制限（280文字以下）
ALTER TABLE posts
ADD CONSTRAINT posts_content_length_check
CHECK (char_length(content) <= 280);

-- 自己フォロー防止
ALTER TABLE follows
ADD CONSTRAINT follows_no_self_follow_check
CHECK (follower_id <> following_id);
