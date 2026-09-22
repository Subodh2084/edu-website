import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || !IMAGE_TYPES.has(file.type) || file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WEBP image up to 5 MB." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `uploads/${crypto.randomUUID()}.${ext}`;
  const supabase = createAdminClient();
  const { error } = await supabase.storage.from("offers").upload(path, await file.arrayBuffer(), {
    contentType: file.type,
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from("offers").getPublicUrl(path);
  return NextResponse.json({ success: true, url: data.publicUrl });
}
