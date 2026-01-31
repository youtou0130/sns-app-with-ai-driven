"use client";

import type { FC } from "react";
import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/profile";
import type { UserProfile } from "@/types/post";
import { Camera, X, Palette } from "lucide-react";

const COVER_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
const COVER_MAX_SIZE_MB = 5;

interface ProfileEditModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const ProfileEditModal: FC<ProfileEditModalProps> = ({ user, onClose }) => {
  const [displayName, setDisplayName] = useState(user.displayName ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [location, setLocation] = useState(user.location ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > COVER_MAX_SIZE_MB * 1024 * 1024) {
      setError(`カバー画像は${COVER_MAX_SIZE_MB}MB以内で選択してください。`);
      return;
    }
    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    setCoverFile(file);
    setCoverPreviewUrl(URL.createObjectURL(file));
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("displayName", displayName.trim() || "");
      formData.set("bio", bio.trim() || "");
      formData.set("location", location.trim() || "");
      if (coverFile) formData.set("cover", coverFile);
      const result = await updateProfile(formData);
      if (result.ok) {
        onClose();
      } else {
        setError(result.error ?? "保存に失敗しました。");
      }
    });
  }

  const displayNameLabel = user.displayName || user.username;
  const coverImageUrl = coverPreviewUrl ?? user.coverUrl ?? null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-edit-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
      {/* ヘッダー */}
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onClose}
          aria-label="閉じる"
        >
          <X className="h-5 w-5" />
        </Button>
        <h1
          id="profile-edit-title"
          className="text-base font-semibold text-slate-950 dark:text-slate-50"
        >
          プロフィールを編集
        </h1>
        <Button
          type="submit"
          form="profile-edit-form"
          className="rounded-full bg-slate-950 dark:bg-slate-100 px-4 py-2 text-sm font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50"
          disabled={isPending}
        >
          保存
        </Button>
      </header>

      <form
        id="profile-edit-form"
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto"
      >
        {/* カバー画像エリア（クリックで画像を選択） */}
        <input
          ref={coverInputRef}
          type="file"
          accept={COVER_ACCEPT}
          className="sr-only"
          aria-label="カバー画像を選択"
          onChange={handleCoverChange}
        />
        <button
          type="button"
          className="relative h-40 w-full shrink-0 cursor-pointer bg-slate-300 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          onClick={() => coverInputRef.current?.click()}
        >
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="カバー"
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white">
              <Camera className="h-7 w-7" />
            </div>
            <span className="absolute bottom-2 left-2 text-xs text-white/90">
              JPEG / PNG / WebP / GIF（最大{COVER_MAX_SIZE_MB}MB）
            </span>
          </div>
        </button>

        {/* プロフィール写真エリア */}
        <div className="px-4">
          <div className="-mt-12 flex items-end gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-slate-950 bg-slate-400 dark:bg-slate-700">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayNameLabel}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-600 dark:text-slate-300">
                  {(displayNameLabel || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
                <Camera className="h-6 w-6" />
              </div>
            </div>
            <div className="mb-2 flex-1">
              <p className="text-sm font-medium text-slate-950 dark:text-slate-50">
                Imagineで画像を編集
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                数秒でカスタマイズする
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mb-2 rounded-full border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-950 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Palette className="mr-2 h-4 w-4" />
              画像を編集
            </Button>
          </div>
        </div>

        {/* フォームフィールド */}
        <div className="mt-6 px-4 pb-8">
          {error && (
            <p className="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="profile-displayName"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                名前
              </label>
              <input
                id="profile-displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-none border-b border-slate-300 dark:border-slate-600 bg-transparent px-0 py-2 text-slate-950 dark:text-slate-50 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                placeholder="名前"
              />
            </div>

            <div>
              <label
                htmlFor="profile-bio"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                自己紹介
              </label>
              <textarea
                id="profile-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-none border-b border-slate-300 dark:border-slate-600 bg-transparent px-0 py-2 text-slate-950 dark:text-slate-50 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                placeholder="自己紹介"
              />
            </div>

            <div>
              <label
                htmlFor="profile-location"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                場所
              </label>
              <input
                id="profile-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-none border-b border-slate-300 dark:border-slate-600 bg-transparent px-0 py-2 text-slate-950 dark:text-slate-50 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
                placeholder="場所"
              />
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};
