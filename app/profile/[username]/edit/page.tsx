import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/dal";
import { ProfileEditFormWithBack } from "@/components/home/profile-edit-form-with-back";

interface ProfileEditPageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { username } = await params;
  const data = await getUserByUsername(username);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <ProfileEditFormWithBack user={data.user} username={username} />
    </div>
  );
}
