import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const offerSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3),
  description: z.string().trim().min(5),
  thumbnail_url: z.string().url().nullable(),
  price: z.number().finite().min(0),
  discount_price: z.number().finite().min(0),
  is_active: z.boolean(),
}).refine((data) => data.discount_price <= data.price, {
  path: ["discount_price"],
  message: "Discount price cannot exceed the original price.",
});

function storagePath(url: string | null) {
  if (!url) return null;
  const marker = "/storage/v1/object/public/offers/";
  const index = url.indexOf(marker);
  return index === -1 ? null : url.slice(index + marker.length);
}

export async function GET(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  const supabase = createAdminClient();
  const query = (supabase.from("offers") as any).select("*").order("created_at", { ascending: false });
  const { data, error } = id ? await query.eq("id", id).maybeSingle() : await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? (id ? null : []) });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = offerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid offer data." }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = createAdminClient();
  const payload = {
    title: input.title,
    description: input.description,
    thumbnail_url: input.thumbnail_url,
    price: input.price,
    discount_price: input.discount_price,
    is_active: input.is_active,
  };

  if (input.id) {
    const { data: previous, error: previousError } = await (supabase.from("offers") as any)
      .select("thumbnail_url").eq("id", input.id).maybeSingle();
    if (previousError || !previous) return NextResponse.json({ error: "Offer not found." }, { status: 404 });

    const { data, error } = await (supabase.from("offers") as any)
      .update(payload).eq("id", input.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const oldPath = storagePath(previous.thumbnail_url);
    if (oldPath && previous.thumbnail_url !== input.thumbnail_url) {
      await supabase.storage.from("offers").remove([oldPath]);
    }
    return NextResponse.json({ success: true, data });
  }

  const { data, error } = await (supabase.from("offers") as any)
    .insert(payload).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Offer id is required." }, { status: 400 });

  const supabase = createAdminClient();
  const { data: offer } = await (supabase.from("offers") as any)
    .select("thumbnail_url").eq("id", id).maybeSingle();
  const { error } = await (supabase.from("offers") as any).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const path = storagePath(offer?.thumbnail_url ?? null);
  if (path) await supabase.storage.from("offers").remove([path]);
  return NextResponse.json({ success: true });
}
