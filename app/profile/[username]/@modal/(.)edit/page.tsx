import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/dal";
import { ProfileEditModalWithRouter } from "@/components/home/profile-edit-modal-with-router";

interface ProfileEditModalPageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfileEditModalPage({
  params,
}: ProfileEditModalPageProps) {
  const { username } = await params;
  const data = await getUserByUsername(username);

  if (!data) {
    notFound();
  }

  return <ProfileEditModalWithRouter user={data.user} />;
}
