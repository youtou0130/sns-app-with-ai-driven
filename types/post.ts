// types/post.ts

export interface PostAuthor {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface PostWithAuthor {
  id: string;
  content: string;
  createdAt: Date;
  author: PostAuthor;
  likesCount: number;
  retweetsCount: number;
  repliesCount: number;
}

// ユーザープロフィール用
export interface UserProfile {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  createdAt: Date;
  followersCount: number;
  followingCount: number;
}

export interface UserProfileWithPosts {
  user: UserProfile;
  posts: PostWithAuthor[];
}

/** ポスト詳細用（リプライ含む） */
export interface PostDetailWithReplies {
  post: PostWithAuthor;
  replies: PostWithAuthor[];
}
