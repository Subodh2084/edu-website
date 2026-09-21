import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// POST: Create or update a course section
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();
    const { courseId, id, title, description } = body;

    if (!courseId || !title) {
      return NextResponse.json({ error: "courseId and title are required" }, { status: 400 });
    }

    const secData = {
      course_id: courseId,
      title,
      description: description || null,
    };

    if (id) {
      // Update existing section
      const { data, error } = await supabase
        .from("course_sections")
        .update(secData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Section update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    } else {
      // Determine the next display_order (append at end)
      const { data: maxRow } = await supabase
        .from("course_sections")
        .select("display_order")
        .eq("course_id", courseId)
        .order("display_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = maxRow ? (maxRow.display_order ?? 0) + 1 : 0;

      // Insert new section
      const { data, error } = await supabase
        .from("course_sections")
        .insert({ ...secData, display_order: nextOrder })
        .select()
        .single();

      if (error) {
        console.error("Section insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    }
  } catch (err) {
    console.error("Section API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Remove a course section
export async function DELETE(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Section id is required" }, { status: 400 });
    }

    const { error } = await supabase.from("course_sections").delete().eq("id", id);
    if (error) {
      console.error("Section delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Section delete API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
