import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial id is required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await (supabase.from("testimonials") as any).delete().eq("id", id);

    if (error) {
      console.error("Error deleting testimonial:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to delete testimonial." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const input = await request.json();

    if (!input?.student_name || !input?.review) {
      return NextResponse.json(
        { error: "student_name and review are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const payload = {
      student_name: input.student_name,
      profile_image: input.profile_image || null,
      course_id: input.course_id && input.course_id !== "none" ? input.course_id : null,
      review: input.review,
      rating: input.rating ?? 5,
      designation: input.designation || null,
      is_featured: input.is_featured ?? false,
      is_active: input.is_active ?? true,
      display_order: input.display_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    if (input.id) {
      const { data, error } = await (supabase.from("testimonials") as any)
        .update(payload)
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data });
    } else {
      const { data, error } = await (supabase.from("testimonials") as any)
        .insert(payload)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data });
    }
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to save testimonial." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await (supabase.from("testimonials") as any)
      .select("*, courses(title)")
      .order("display_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
