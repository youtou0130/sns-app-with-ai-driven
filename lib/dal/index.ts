// lib/dal/index.ts
// Data Access Layer: すべての DB アクセスはここを経由する。

export { getPostById, getTimelinePosts } from "./posts";
export { getUserByUsername, getAllUsernames } from "./users";
