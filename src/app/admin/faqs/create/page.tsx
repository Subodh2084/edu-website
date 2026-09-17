import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FAQForm from "@/components/admin/faqs/FAQForm";

export default function CreateFAQPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/faqs"
        className="inline-flex items-center gap-2 text-sm font-medium bg-leaf-green-dark text-white hover:bg-leaf-green-dark/80 px-4 py-2 rounded transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to FAQs
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Create FAQ
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Add a frequently asked question for your website.
        </p>
      </div>

      <FAQForm />
    </div>
  );
}
