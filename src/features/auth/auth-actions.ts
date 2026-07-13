"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectToLoginError(code: string): never {
  redirect(`/login?status=error&code=${encodeURIComponent(code)}`);
}

function redirectToRegisterError(code: string): never {
  redirect(`/register?status=error&code=${encodeURIComponent(code)}`);
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    redirectToLoginError("missing_credentials");
  }

  const supabase = await createClient();
  if (!supabase) {
    redirectToLoginError("auth_unavailable");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectToLoginError("invalid_credentials");
  }

  const { data } = await supabase.auth.getUser();
  const metadata = data.user?.user_metadata ?? {};
  const isDiscordLinked =
    Boolean(metadata.discordLinked) || Boolean(metadata.discord_username);

  redirect(
    `/?flash=login_success&discord=${isDiscordLinked ? "linked" : "not_linked"}`,
  );
}

export async function registerAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const confirmPassword = getString(formData, "confirmPassword");
  const username = getString(formData, "username");

  if (!email || !password || !confirmPassword) {
    redirectToRegisterError("missing_fields");
  }

  if (password !== confirmPassword) {
    redirectToRegisterError("password_mismatch");
  }

  if (password.length < 6) {
    redirectToRegisterError("weak_password");
  }

  const supabase = await createClient();
  if (!supabase) {
    redirectToRegisterError("auth_unavailable");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    redirectToRegisterError("register_failed");
  }

  redirect("/login?status=success&code=register_success");
}
