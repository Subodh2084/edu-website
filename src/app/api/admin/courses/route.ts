import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.title) {
      return NextResponse.json({ error: "Course title is required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const slug = slugify(payload.slug || payload.title);

    const courseData = {
      title: payload.title,
      slug,
      short_description: payload.short_description || "",
      description: payload.description || "",
      category_id: payload.category_id || null,
      preview_video_url: payload.preview_video_url || null,
      price: payload.price || 0,
      discount_price: payload.discount_price || null,
      level: payload.level || "beginner",
      duration: payload.duration || "1 Month",
      language: payload.language || "English",
      status: payload.status || "draft",
      featured: payload.featured ?? false,
      popular: payload.popular ?? false,
      ...(payload.thumbnail ? { thumbnail: payload.thumbnail } : {}),
    };

    if (payload.id) {
      const { data, error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", payload.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating course:", error.message, error.code, error.details);
        return NextResponse.json(
          { error: error.message || "Failed to update course." },
          { status: 500 }
        );
      }

      return NextResponse.json({ data });
    }

    const { data, error } = await supabase
      .from("courses")
      .insert(courseData)
      .select()
      .single();

    if (error) {
      console.error("Error creating course:", error.message, error.code, error.details);
      return NextResponse.json(
        { error: error.message || "Failed to create course." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Course admin API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save course." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Course id is required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
