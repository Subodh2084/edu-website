"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getOfferById, saveOffer, uploadOfferImage } from "@/lib/queries/offers";

const offerSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),
  description: z.string().trim().min(5, "Description must be at least 5 characters."),
  thumbnail_url: z.string(),
  price: z.number().min(0, "Price must be 0 or greater."),
  discount_price: z.number().min(0, "Discount price must be 0 or greater."),
  is_active: z.boolean(),
}).refine((data) => data.discount_price <= data.price, {
  path: ["discount_price"],
  message: "Discount price cannot exceed the original price.",
});

type OfferFormValues = z.infer<typeof offerSchema>;
const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function OfferForm({ offerId }: { offerId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(Boolean(offerId));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: { title: "", description: "", thumbnail_url: "", price: 0, discount_price: 0, is_active: false },
  });

  useEffect(() => {
    if (!offerId) return;
    getOfferById(offerId).then((offer) => {
      if (!offer) { setError("This offer could not be found."); return; }
      reset({
        title: offer.title,
        description: offer.description,
        thumbnail_url: offer.thumbnail_url ?? "",
        price: offer.price,
        discount_price: offer.discount_price,
        is_active: offer.is_active,
      });
      setPreview(offer.thumbnail_url);
    }).catch(() => setError("Unable to load this offer.")).finally(() => setLoading(false));
  }, [offerId, reset]);

  const imageUrl = watch("thumbnail_url");
  const isActive = watch("is_active");
  const price = watch("price") || 0;
  const discountPrice = watch("discount_price") || 0;

  function chooseImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Use a JPG, PNG, or WEBP image up to 5 MB.");
      return;
    }
    setError(null);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: OfferFormValues) {
    setError(null);
    try {
      let thumbnailUrl = values.thumbnail_url;
      if (imageFile) thumbnailUrl = await uploadOfferImage(imageFile);
      if (!thumbnailUrl) {
        setError("Please upload an offer thumbnail.");
        return;
      }
      await saveOffer({ ...values, id: offerId, thumbnail_url: thumbnailUrl });
      router.push("/admin/offers");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save offer.");
    }
  }

  if (loading) return <div className="flex justify-center py-20 text-leaf-muted"><Loader2 className="size-7 animate-spin" /></div>;

  return (
    <Card className="border-leaf-border bg-white">
      <CardHeader><CardTitle className="text-xl text-leaf-navy">{offerId ? "Edit Offer" : "Create Offer"}</CardTitle><CardDescription>Set the offer details shown to visitors.</CardDescription></CardHeader>
      <CardContent>
        {error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2"><label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">Title *</label><Input {...register("title")} className="border-leaf-border" />{errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}</div>
          <div className="space-y-2"><label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">Description *</label><Textarea {...register("description")} rows={4} className="border-leaf-border" />{errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}</div>
          <div className="space-y-3"><label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">Offer Thumbnail *</label>
            {preview ? <div className="relative aspect-video max-w-md overflow-hidden rounded-xl border border-leaf-border"><Image src={preview} alt="Offer thumbnail preview" fill unoptimized className="object-cover" /><Button type="button" size="icon" variant="secondary" className="absolute right-2 top-2" onClick={() => { setPreview(null); setImageFile(null); setValue("thumbnail_url", ""); }}><X className="size-4" /><span className="sr-only">Remove image</span></Button></div> : <label className="flex max-w-md cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-leaf-border bg-leaf-bg px-6 py-10 text-sm text-leaf-muted hover:bg-leaf-soft"><ImagePlus className="size-7 text-leaf-green-dark" /><span className="font-medium text-leaf-navy">Upload thumbnail</span><span>JPG, PNG, or WEBP up to 5 MB</span><input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={chooseImage} /></label>}
            {preview && <label className="inline-flex cursor-pointer text-sm font-medium text-leaf-green-dark hover:text-leaf-green">Replace image<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={chooseImage} /></label>}</div>
          <div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">Original Price *</label><Input type="number" min="0" step="0.01" {...register("price", { valueAsNumber: true })} className="border-leaf-border" />{errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}</div><div className="space-y-2"><label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">Discount Price *</label><Input type="number" min="0" step="0.01" {...register("discount_price", { valueAsNumber: true })} className="border-leaf-border" />{errors.discount_price && <p className="text-xs text-red-600">{errors.discount_price.message}</p>}</div></div>
          <p className="rounded-lg bg-leaf-soft px-4 py-3 text-sm text-leaf-navy">You save: <strong>Rs. {Math.max(0, price - discountPrice).toLocaleString()}</strong></p>
          <div className="flex gap-3 rounded-lg border border-leaf-border p-4"><Checkbox checked={isActive} onCheckedChange={(checked) => setValue("is_active", checked === true)} /><div><p className="text-sm font-medium text-leaf-navy">Active</p><p className="text-xs text-leaf-muted">Show this offer to users on the website.</p></div></div>
          <div className="flex justify-end gap-3 border-t border-leaf-border pt-4"><Link href="/admin/offers" className="rounded-lg border border-leaf-border px-4 py-2 text-sm font-medium text-leaf-navy">Cancel</Link><Button type="submit" disabled={isSubmitting} className="bg-leaf-green-dark text-white hover:bg-leaf-green">{isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}{offerId ? "Update Offer" : "Save Offer"}</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
