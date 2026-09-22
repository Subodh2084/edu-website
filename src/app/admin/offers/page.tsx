"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import OfferCard from "@/components/admin/offers/OfferCard";
import { deleteOffer, getAdminOffers } from "@/lib/queries/offers";
import type { Offer } from "@/types/offer";

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadOffers = () => getAdminOffers().then(setOffers).catch((err) => setError(err instanceof Error ? err.message : "Unable to load offers.")).finally(() => setLoading(false));
  useEffect(() => { loadOffers(); }, []);
  async function handleDelete(id: string) { try { await deleteOffer(id); setOffers((current) => current.filter((offer) => offer.id !== id)); } catch (err) { setError(err instanceof Error ? err.message : "Unable to delete offer."); } }
  return <div className="space-y-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-leaf-navy">Offers</h1><p className="mt-1 text-sm text-leaf-muted">Create promotions for your website visitors.</p></div><Button render={<Link href="/admin/offers/create" />} className="bg-leaf-green-dark text-white hover:bg-leaf-green"><Plus className="size-4" />Add Offer</Button></div>{error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}{loading ? <div className="flex justify-center py-20"><Loader2 className="size-8 animate-spin text-leaf-green-dark" /></div> : offers.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer) => <OfferCard key={offer.id} offer={offer} onDelete={handleDelete} />)}</div> : <div className="rounded-2xl border border-dashed border-leaf-border bg-white p-12 text-center"><Tag className="mx-auto size-8 text-leaf-muted" /><h2 className="mt-3 font-semibold text-leaf-navy">No offers yet</h2><p className="mt-1 text-sm text-leaf-muted">Create your first promotion to show it on the website.</p></div>}</div>;
}
