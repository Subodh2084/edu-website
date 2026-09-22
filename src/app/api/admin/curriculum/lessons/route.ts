import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// POST: Create or update a lesson
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();
    const { sectionId, id, title, description, duration, is_preview } = body;

    if (!sectionId || !title) {
      return NextResponse.json({ error: "sectionId and title are required" }, { status: 400 });
    }

    // Only include columns that actually exist in the course_lessons table
    // Columns: id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order
    const lessonData: any = {
      section_id: sectionId,
      title,
      description: description || null,
      duration: duration || "15 mins",
      lesson_type: "text",
      is_preview: is_preview ?? false,
    };

    if (id) {
      // Update existing lesson
      const { data, error } = await (supabase as any)
        .from("course_lessons")
        .update(lessonData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Lesson update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    } else {
      // Determine the next display_order (append at end of section)
      const { data: maxRow } = await (supabase as any)
        .from("course_lessons")
        .select("display_order")
        .eq("section_id", sectionId)
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = maxRow ? (maxRow.display_order ?? 0) + 1 : 0;

      // Insert new lesson
      const { data, error } = await (supabase as any)
        .from("course_lessons")
        .insert({ ...lessonData, display_order: nextOrder })
        .select()
        .single();

      if (error) {
        console.error("Lesson insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    }
  } catch (err) {
    console.error("Lesson API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Remove a lesson
export async function DELETE(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lesson id is required" }, { status: 400 });
    }

    const { error } = await (supabase as any).from("course_lessons").delete().eq("id", id);
    if (error) {
      console.error("Lesson delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lesson delete API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
