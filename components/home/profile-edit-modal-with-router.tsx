"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { ProfileEditModal } from "./profile-edit-modal";
import type { UserProfile } from "@/types/post";

interface ProfileEditModalWithRouterProps {
  user: UserProfile;
}

export const ProfileEditModalWithRouter: FC<ProfileEditModalWithRouterProps> = ({
  user,
}) => {
  const router = useRouter();

  return (
    <ProfileEditModal
      user={user}
      onClose={() => router.back()}
    />
  );
};
