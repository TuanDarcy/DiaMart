import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("imageFile");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() ?? "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { data, error } = await supabase.storage
    .from("storefront-images")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("[upload API] Storage upload failed", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("storefront-images")
    .getPublicUrl(data.path);

  return NextResponse.json({ url: urlData.publicUrl });
}
