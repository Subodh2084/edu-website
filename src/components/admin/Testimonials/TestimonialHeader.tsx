import Link from "next/link";
import { Plus } from "lucide-react";

export default function TestimonialHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Testimonials
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage student testimonials displayed across the website.
        </p>
      </div>

      <Link
        href="/admin/testimonials/create"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-leaf-green-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-leaf-green"
      >
        <Plus className="size-4" />
        Add Testimonial
      </Link>
    </div>
  );
}


