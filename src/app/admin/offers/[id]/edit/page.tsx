import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import OfferForm from "@/components/admin/offers/OfferForm";

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <div className="space-y-6"><Link href="/admin/offers" className="inline-flex items-center gap-2 text-sm font-medium text-leaf-green-dark"><ArrowLeft className="size-4" />Back to Offers</Link><div><h1 className="text-2xl font-bold text-leaf-navy">Edit Offer</h1><p className="mt-1 text-sm text-leaf-muted">Update this website promotion.</p></div><OfferForm offerId={id} /></div>; }
