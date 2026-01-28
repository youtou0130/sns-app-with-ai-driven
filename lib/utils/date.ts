// lib/utils/date.ts

/**
 * 相対的な時間表示を返す（例: "いま", "5分", "2時間", "昨日"）
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return "いま";
  }
  if (diffMin < 60) {
    return `${diffMin}分`;
  }
  if (diffHour < 24) {
    return `${diffHour}時間`;
  }
  if (diffDay === 1) {
    return "昨日";
  }
  if (diffDay < 7) {
    return `${diffDay}日前`;
  }

  // 7日以上前は日付表示
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}
