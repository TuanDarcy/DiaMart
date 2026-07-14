import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
