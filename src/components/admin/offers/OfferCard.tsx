"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Offer } from "@/types/offer";

export default function OfferCard({ offer, onDelete }: { offer: Offer; onDelete: (id: string) => void }) {
  const [confirming, setConfirming] = useState(false);
  const savings = offer.price - offer.discount_price;
  return <><Card className="overflow-hidden border-leaf-border bg-white"><div className="relative aspect-video bg-leaf-bg">{offer.thumbnail_url ? <Image src={offer.thumbnail_url} alt={offer.title} fill unoptimized className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-leaf-muted">No image</div>}</div><CardHeader className="pb-3"><div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-leaf-navy">{offer.title}</h3><p className="mt-1 line-clamp-2 text-sm text-leaf-muted">{offer.description}</p></div><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8" />}><MoreHorizontal className="size-4" /></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem className="p-0"><Link href={`/admin/offers/${offer.id}/edit`} className="flex w-full items-center gap-2 px-2 py-1.5"><Pencil className="size-4" />Edit</Link></DropdownMenuItem><DropdownMenuItem onClick={() => setConfirming(true)} className="text-red-600 focus:text-red-600"><Trash2 className="size-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></CardHeader><CardContent className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-leaf-muted">Original price</span><span className="line-through">Rs. {offer.price.toLocaleString()}</span></div><div className="flex justify-between font-semibold text-leaf-green-dark"><span>Discount price</span><span>Rs. {offer.discount_price.toLocaleString()}</span></div><div className="flex justify-between border-t border-leaf-border pt-2"><span className="text-leaf-muted">You save</span><span className="font-semibold text-leaf-navy">Rs. {savings.toLocaleString()}</span></div><Badge className={offer.is_active ? "bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"}>{offer.is_active ? "Active" : "Inactive"}</Badge></CardContent></Card><AlertDialog open={confirming} onOpenChange={setConfirming}><AlertDialogContent className="border-leaf-border bg-white"><AlertDialogHeader><AlertDialogTitle>Delete offer?</AlertDialogTitle><AlertDialogDescription>This will permanently remove the offer and its image.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => onDelete(offer.id)} className="bg-red-600 text-white hover:bg-red-700">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>;
}
