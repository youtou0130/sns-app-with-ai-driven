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
