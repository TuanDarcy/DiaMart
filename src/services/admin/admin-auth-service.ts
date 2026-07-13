import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

type AdminUserRow = {
  user_id: string;
  role: "admin" | "editor";
  is_active: boolean;
};

export type AdminSession = {
  userId: string;
  email: string;
  role: "admin" | "editor";
};

const getAdminUserRow = cache(async (userId: string): Promise<AdminUserRow | null> => {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id, role, is_active")
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("[admin-auth-service] Failed to query admin_users", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data as AdminUserRow;
});

export const requireAdminSession = cache(async (): Promise<AdminSession> => {
  const supabase = await createClient();
  if (!supabase) {
    redirect("/login?status=error&code=auth_required");
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login?status=error&code=auth_required");
  }

  const user = data.user;
  const email = user.email ?? "";

  if (!email) {
    redirect("/login?status=error&code=auth_required");
  }

  const adminRow = await getAdminUserRow(user.id);

  if (!adminRow) {
    await supabase.auth.signOut();
    redirect("/login?status=error&code=not_admin");
  }

  return {
    userId: user.id,
    email,
    role: adminRow.role,
  };
});

export const getCurrentAdminSession = cache(async (): Promise<AdminSession | null> => {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const user = data.user;
  const email = user.email ?? "";

  if (!email) {
    return null;
  }

  const adminRow = await getAdminUserRow(user.id);

  if (!adminRow) {
    return null;
  }

  return {
    userId: user.id,
    email,
    role: adminRow.role,
  };
});
