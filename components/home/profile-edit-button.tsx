import type { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/post";

interface ProfileEditButtonProps {
  user: UserProfile;
}

export const ProfileEditButton: FC<ProfileEditButtonProps> = ({ user }) => {
  return (
    <Button
      asChild
      variant="outline"
      className="rounded-full border-slate-400 dark:border-slate-600 bg-transparent px-4 py-2 text-sm font-semibold text-slate-950 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800"
    >
      <Link href={`/profile/${user.username}/edit`} scroll={false}>
        プロフィールを編集
      </Link>
    </Button>
  );
};
