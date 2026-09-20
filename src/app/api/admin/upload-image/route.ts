import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "images";

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const bucketName = "testimonial-images";

    // Ensure bucket exists and is public
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some((b) => b.name === bucketName);
      if (!exists) {
        await supabase.storage.createBucket(bucketName, { public: true });
      }
    } catch (bErr) {
      console.warn("Bucket check notice:", bErr);
    }

    const fileBuffer = await file.arrayBuffer();
    const ext = file.name.split(".").pop() || "png";
    const fileName = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage image upload error:", uploadError);
      return NextResponse.json(
        { error: uploadError.message || "Failed to upload image." },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    const imageUrl = urlData?.publicUrl;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to resolve public image URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Image upload API error:", error);
    return NextResponse.json(
      { error: error.message || "Server error uploading image." },
      { status: 500 }
    );
  }
}
