import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import TestimonialForm from "@/components/admin/Testimonials/TestimonialForm";

export default function CreateTestimonialPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-2 text-sm font-medium bg-leaf-green-dark text-white hover:bg-leaf-green-dark/80 px-4 py-2 rounded transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Testimonials
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Add Testimonial
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Add a new student testimonial.
        </p>
      </div>

      <TestimonialForm />
    </div>
  );
}
