"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { ProfileEditModal } from "./profile-edit-modal";
import type { UserProfile } from "@/types/post";

interface ProfileEditFormWithBackProps {
  user: UserProfile;
  username: string;
}

export const ProfileEditFormWithBack: FC<ProfileEditFormWithBackProps> = ({
  user,
  username,
}) => {
  const router = useRouter();

  return (
    <ProfileEditModal
      user={user}
      onClose={() => router.push(`/profile/${username}`)}
    />
  );
};
