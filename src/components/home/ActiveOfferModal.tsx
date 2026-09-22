"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getActiveOffer } from "@/lib/queries/offers";
import { getSiteSettings } from "@/lib/queries/site-settings";
import type { Offer } from "@/types/offer";
import type { SiteSettings } from "@/types/site-settings";
import { FaWhatsapp } from "react-icons/fa";

export default function ActiveOfferModal() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Promise.all([getActiveOffer(), getSiteSettings()])
      .then(([offerResult, siteSettings]) => {
        if (offerResult.data) {
          setOffer(offerResult.data);
          setSettings(siteSettings);
          setOpen(true);
        }
      })
      .catch(() => undefined);
  }, []);

  if (!offer || !open) return null;

  const savings = offer.price - offer.discount_price;

  const whatsappNumber = (settings?.whatsapp || "").replace(/[^0-9]/g, "");

  const message = encodeURIComponent(
    `Hello LeafClutch, I am interested in the "${offer.title}" offer.`,
  );

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close offer"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 text-leaf-navy shadow-md transition hover:bg-white"
        >
          <X className="size-5" />
        </button>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="max-w-xl">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-green-dark">
                  Limited Offer
                </p>

                <h2 className="text-3xl font-bold leading-tight text-leaf-navy sm:text-4xl">
                  {offer.title}
                </h2>

                <p className="text-sm leading-6 text-leaf-text sm:text-base">
                  {offer.description}
                </p>
              </div>
              <div className="mt-6 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between text-sm text-leaf-muted">
                  <span>Original price</span>

                  <span className="line-through">
                    Rs. {offer.price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-leaf-navy">
                    Offer price
                  </span>

                  <span className="text-2xl font-bold text-leaf-green-dark sm:text-3xl">
                    Rs. {offer.discount_price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 border-t border-leaf-border pt-4 text-sm font-semibold text-leaf-navy">
                  You save Rs. {savings.toLocaleString()}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-leaf-green-dark">
                  Have Questions About This Course?
                </p>

                <h3 className="mt-1 text-xl font-bold text-leaf-navy">
                  Let’s Start Your Learning Journey
                </h3>

                <p className="mt-2 text-sm leading-6 text-leaf-text">
                  Not sure if this course is right for you? Talk to our team,
                  get your questions answered, and find the right learning path
                  for your goals.
                </p>
              </div>
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-leaf-navy px-5 text-sm font-semibold text-white transition hover:bg-leaf-navy"
                >
                  <FaWhatsapp className="size-5" />
                  Contact Us on WhatsApp
                </a>
              )}
            </div>
          </div>
          <div className="relative hidden min-h-[500px] bg-leaf-soft lg:block">
            {offer.thumbnail_url ? (
              <Image
                src={offer.thumbnail_url}
                alt={offer.title}
                fill
                unoptimized
                sizes="55vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-leaf-muted">
                Offer image
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
