"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/services/admin/admin-auth-service";

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return fallback;
  }
  return value.trim();
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = getString(formData, key);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getNullableNumber(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getBooleanFromString(
  formData: FormData,
  key: string,
  fallback = true,
) {
  const value = getString(formData, key);
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return fallback;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function redirectWith(
  path: string,
  status: "success" | "error",
  message: string,
): never {
  redirect(
    `${path}?status=${encodeURIComponent(status)}&message=${encodeURIComponent(message)}`,
  );
}

function isFileValue(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value
  );
}

export async function adminLoginAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    redirectWith("/admin/login", "error", "Email và password là bắt buộc.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWith(
      "/admin/login",
      "error",
      "Đăng nhập thất bại. Kiểm tra lại tài khoản.",
    );
  }

  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    redirectWith("/admin/login", "error", "Không tìm thấy phiên đăng nhập.");
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError || !adminRow) {
    await supabase.auth.signOut();
    redirectWith(
      "/admin/login",
      "error",
      "Tài khoản chưa có quyền admin. Hãy thêm user vào bảng admin_users.",
    );
  }

  redirect("/admin?status=success&message=Đăng nhập admin thành công.");
}

export async function adminLogoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login?status=success&message=Đã đăng xuất admin.");
}

export async function upsertGameAction(formData: FormData) {
  await requireAdminSession();

  const idInput = getString(formData, "id");
  const name = getString(formData, "name");
  const slugInput = getString(formData, "slug");

  if (!name) {
    redirectWith("/admin", "error", "Game name là bắt buộc.");
  }

  const id = idInput || slugify(name);
  const slug = slugInput || slugify(name);

  const payload = {
    id,
    slug,
    name,
    tagline: getString(formData, "tagline"),
    description: getString(formData, "description"),
    image_src: getNullableString(formData, "image_src"),
    image_alt: getNullableString(formData, "image_alt"),
    is_active: getBooleanFromString(formData, "is_active", true),
    sort_order: getNumber(formData, "sort_order", 0),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_games")
    .upsert([payload] as never[], { onConflict: "id" });

  if (error) {
    redirectWith("/admin", "error", `Lưu game lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã lưu game ${name}.`);
}

export async function deleteGameAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirectWith("/admin", "error", "Thiếu id game để xóa.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_games")
    .delete()
    .eq("id", id);

  if (error) {
    redirectWith("/admin", "error", `Xóa game lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã xóa game ${id}.`);
}

export async function upsertCategoryAction(formData: FormData) {
  await requireAdminSession();

  const idInput = getString(formData, "id");
  const label = getString(formData, "label");

  if (!label) {
    redirectWith("/admin", "error", "Category label là bắt buộc.");
  }

  const id = idInput || slugify(label);

  const payload = {
    id,
    label,
    description: getNullableString(formData, "description"),
    is_active: getBooleanFromString(formData, "is_active", true),
    sort_order: getNumber(formData, "sort_order", 0),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_categories")
    .upsert([payload] as never[], { onConflict: "id" });

  if (error) {
    redirectWith("/admin", "error", `Lưu category lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã lưu category ${label}.`);
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirectWith("/admin", "error", "Thiếu id category để xóa.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_categories")
    .delete()
    .eq("id", id);

  if (error) {
    redirectWith("/admin", "error", `Xóa category lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã xóa category ${id}.`);
}

export async function upsertProductAction(formData: FormData) {
  await requireAdminSession();

  const idInput = getString(formData, "id");
  const name = getString(formData, "name");
  const slugInput = getString(formData, "slug");
  const gameId = getString(formData, "game_id");
  const categoryId = getString(formData, "category_id");

  if (!name || !gameId || !categoryId) {
    redirectWith(
      "/admin",
      "error",
      "Product cần ít nhất name, game_id và category_id.",
    );
  }

  const id = idInput || slugify(name);
  const slug = slugInput || slugify(name);

  const payload = {
    id,
    slug,
    name,
    game_id: gameId,
    category_id: categoryId,
    image_src: getNullableString(formData, "image_src"),
    image_alt: getNullableString(formData, "image_alt"),
    price_usd: getNumber(formData, "price_usd", 0),
    original_price_usd: getNullableNumber(formData, "original_price_usd"),
    stock_status: getString(formData, "stock_status", "in-stock"),
    stock_quantity: getNullableNumber(formData, "stock_quantity"),
    delivery_speed: getString(formData, "delivery_speed", "Estimated 5-10 min"),
    badge: getNullableString(formData, "badge"),
    featured: getBoolean(formData, "featured"),
    popular: getBoolean(formData, "popular"),
    trending: getBoolean(formData, "trending"),
    best_seller: getBoolean(formData, "best_seller"),
    description: getString(formData, "description"),
    is_active: getBooleanFromString(formData, "is_active", true),
    sort_order: getNumber(formData, "sort_order", 0),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_products")
    .upsert([payload] as never[], { onConflict: "id" });

  if (error) {
    redirectWith("/admin", "error", `Lưu product lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã lưu product ${name}.`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirectWith("/admin", "error", "Thiếu id product để xóa.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_products")
    .delete()
    .eq("id", id);

  if (error) {
    redirectWith("/admin", "error", `Xóa product lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã xóa product ${id}.`);
}

export async function upsertFaqAction(formData: FormData) {
  await requireAdminSession();

  const idInput = getString(formData, "id");
  const question = getString(formData, "question");

  if (!question) {
    redirectWith("/admin", "error", "FAQ question là bắt buộc.");
  }

  const id = idInput || slugify(question);

  const payload = {
    id,
    question,
    answer: getString(formData, "answer"),
    is_active: getBooleanFromString(formData, "is_active", true),
    sort_order: getNumber(formData, "sort_order", 0),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_faqs")
    .upsert([payload] as never[], { onConflict: "id" });

  if (error) {
    redirectWith("/admin", "error", `Lưu FAQ lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", "Đã lưu FAQ.");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirectWith("/admin", "error", "Thiếu id FAQ để xóa.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_faqs")
    .delete()
    .eq("id", id);

  if (error) {
    redirectWith("/admin", "error", `Xóa FAQ lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã xóa FAQ ${id}.`);
}

export async function upsertSupportTopicAction(formData: FormData) {
  await requireAdminSession();

  const idInput = getString(formData, "id");
  const label = getString(formData, "label");

  if (!label) {
    redirectWith("/admin", "error", "Support topic label là bắt buộc.");
  }

  const id = idInput || slugify(label);

  const payload = {
    id,
    label,
    description: getString(formData, "description"),
    response: getString(formData, "response"),
    is_active: getBooleanFromString(formData, "is_active", true),
    sort_order: getNumber(formData, "sort_order", 0),
    updated_at: new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_support_topics")
    .upsert([payload] as never[], { onConflict: "id" });

  if (error) {
    redirectWith("/admin", "error", `Lưu support topic lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", "Đã lưu support topic.");
}

export async function deleteSupportTopicAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirectWith("/admin", "error", "Thiếu id support topic để xóa.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("storefront_support_topics")
    .delete()
    .eq("id", id);

  if (error) {
    redirectWith("/admin", "error", `Xóa support topic lỗi: ${error.message}`);
  }

  redirectWith("/admin", "success", `Đã xóa support topic ${id}.`);
}

function sanitizeFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

export async function uploadStorefrontImageAction(formData: FormData) {
  await requireAdminSession();

  const fileValue = formData.get("imageFile");

  if (!isFileValue(fileValue)) {
    redirectWith("/admin", "error", "Vui lòng chọn file ảnh để upload.");
  }

  const file = fileValue;

  if (file.size === 0) {
    redirectWith("/admin", "error", "File ảnh rỗng.");
  }

  const supabase = await createClient();
  const safeName = sanitizeFilename(file.name || "image");
  const filePath = `catalog/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("storefront-images")
    .upload(filePath, file, { upsert: false, contentType: file.type });

  if (uploadError) {
    redirectWith("/admin", "error", `Upload ảnh lỗi: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from("storefront-images")
    .getPublicUrl(filePath);

  redirect(
    `/admin?status=success&message=${encodeURIComponent("Upload ảnh thành công.")}&uploadedUrl=${encodeURIComponent(data.publicUrl)}`,
  );
}
