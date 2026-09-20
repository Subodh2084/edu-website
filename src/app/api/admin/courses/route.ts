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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const supabase = createAdminClient();

    if (id) {
      const { data, error } = await (supabase.from("courses") as any)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ course: data });
    }

    const { data, error } = await (supabase.from("courses") as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ courses: data });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload?.id && !payload?.title) {
      return NextResponse.json({ error: "Course title is required for creation." }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Partial update mode (e.g. updating syllabus_pdf_url or thumbnail)
    if (payload.id) {
      const updateData: Record<string, any> = {};

      if (payload.title) {
        updateData.title = payload.title;
        updateData.slug = slugify(payload.slug || payload.title);
      }
      if (payload.short_description !== undefined) updateData.short_description = payload.short_description;
      if (payload.description !== undefined) updateData.description = payload.description;
      if (payload.category_id !== undefined) updateData.category_id = payload.category_id;
      if (payload.preview_video_url !== undefined) updateData.preview_video_url = payload.preview_video_url;
      if (payload.syllabus_pdf_url !== undefined) updateData.syllabus_pdf_url = payload.syllabus_pdf_url;
      if (payload.pdf_url !== undefined) updateData.pdf_url = payload.pdf_url;
      if (payload.price !== undefined) updateData.price = payload.price;
      if (payload.discount_price !== undefined) updateData.discount_price = payload.discount_price;
      if (payload.level !== undefined) updateData.level = payload.level;
      if (payload.duration !== undefined) updateData.duration = payload.duration;
      if (payload.language !== undefined) updateData.language = payload.language;
      if (payload.status !== undefined) updateData.status = payload.status;
      if (payload.featured !== undefined) updateData.featured = payload.featured;
      if (payload.popular !== undefined) updateData.popular = payload.popular;
      if (payload.thumbnail) updateData.thumbnail = payload.thumbnail;

      let { data, error } = await (supabase.from("courses") as any)
        .update(updateData)
        .eq("id", payload.id)
        .select()
        .single();

      // If updating failed and payload has a PDF url, handle missing columns gracefully
      if (error && (payload.syllabus_pdf_url !== undefined || payload.pdf_url !== undefined)) {
        const fallbackData = { ...updateData };
        const pdfValue = payload.syllabus_pdf_url || payload.pdf_url;

        // Try pdf_url only
        delete fallbackData.syllabus_pdf_url;
        if (pdfValue) {
          fallbackData.pdf_url = pdfValue;
        } else {
          delete fallbackData.pdf_url;
        }

        let retry = await (supabase.from("courses") as any)
          .update(fallbackData)
          .eq("id", payload.id)
          .select()
          .single();

        // If that also failed, try syllabus_pdf_url only
        if (retry.error) {
          delete fallbackData.pdf_url;
          if (pdfValue) fallbackData.syllabus_pdf_url = pdfValue;

          retry = await (supabase.from("courses") as any)
            .update(fallbackData)
            .eq("id", payload.id)
            .select()
            .single();
        }

        // If both column names fail (neither column exists), strip both and store in description comment
        if (retry.error) {
          delete fallbackData.syllabus_pdf_url;
          delete fallbackData.pdf_url;

          if (pdfValue) {
            let desc = fallbackData.description || "";
            desc = desc.replace(/<!-- SYLLABUS_PDF_URL:.*? -->/g, "").trim();
            fallbackData.description = `${desc}\n<!-- SYLLABUS_PDF_URL:${pdfValue} -->`;
          }

          retry = await (supabase.from("courses") as any)
            .update(fallbackData)
            .eq("id", payload.id)
            .select()
            .single();
        }

        if (!retry.error) {
          data = retry.data;
          error = null;
        }
      }

      if (error) {
        console.error("Error updating course:", error.message, error.code, error.details);
        return NextResponse.json(
          { error: error.message || "Failed to update course." },
          { status: 500 }
        );
      }

      return NextResponse.json({ data });
    }

    // Full creation mode
    const slug = slugify(payload.slug || payload.title);
    const pdfUrl = payload.syllabus_pdf_url || payload.pdf_url || null;

    let courseDescription = payload.description || "";
    if (pdfUrl) {
      courseDescription = courseDescription.replace(/<!-- SYLLABUS_PDF_URL:.*? -->/g, "").trim();
      courseDescription = `${courseDescription}\n<!-- SYLLABUS_PDF_URL:${pdfUrl} -->`;
    }

    const courseData: Record<string, any> = {
      title: payload.title,
      slug,
      short_description: payload.short_description || "",
      description: courseDescription,
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

    // If a PDF url was supplied, try with syllabus_pdf_url first
    if (pdfUrl) {
      courseData.syllabus_pdf_url = pdfUrl;
    }

    let { data, error } = await (supabase.from("courses") as any)
      .insert(courseData)
      .select()
      .single();

    // If insertion failed due to missing syllabus_pdf_url column, retry with pdf_url
    if (error && pdfUrl) {
      const fallbackData = { ...courseData };
      delete fallbackData.syllabus_pdf_url;
      fallbackData.pdf_url = pdfUrl;

      const retryPdf = await (supabase.from("courses") as any)
        .insert(fallbackData)
        .select()
        .single();

      if (!retryPdf.error) {
        data = retryPdf.data;
        error = null;
      } else {
        // If both column names do not exist in the courses table, omit the column entirely
        // (the URL is already safely embedded in the description comment above)
        delete fallbackData.pdf_url;
        const retryClean = await (supabase.from("courses") as any)
          .insert(fallbackData)
          .select()
          .single();

        if (!retryClean.error) {
          data = retryClean.data;
          error = null;
        } else {
          error = retryClean.error;
        }
      }
    }

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
