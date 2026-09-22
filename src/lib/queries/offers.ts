import type { Offer } from "@/types/offer";

export type SaveOfferInput = Pick<Offer, "title" | "description" | "thumbnail_url" | "price" | "discount_price" | "is_active"> & { id?: string };

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { cache: "no-store", ...options });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Request failed.");
  return body as T;
}

export async function getAdminOffers() {
  const { data } = await request<{ data: Offer[] }>("/api/admin/offers");
  return data;
}

export async function getOfferById(id: string) {
  const { data } = await request<{ data: Offer | null }>(`/api/admin/offers?id=${encodeURIComponent(id)}`);
  return data;
}

export async function saveOffer(input: SaveOfferInput) {
  return request<{ success: true; data: Offer }>("/api/admin/offers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function deleteOffer(id: string) {
  return request<{ success: true }>(`/api/admin/offers?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function uploadOfferImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const { url } = await request<{ success: true; url: string }>("/api/admin/offers/upload", {
    method: "POST",
    body: formData,
  });
  return url;
}

export async function getActiveOffer() {
  return request<{ data: Offer | null; whatsapp: string | null }>("/api/offers/active");
}
