import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * サービスロールキーが設定されているか（カバー画像アップロード可否の判定用）
 */
export function hasAdminClientEnv(): boolean {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

/**
 * Server-side only. Use for Storage uploads (bypasses RLS).
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.
 * @throws Error when env is missing
 */
export function createAdminClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for server-side uploads."
    );
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export const PROFILE_IMAGES_BUCKET = "profile-images";
