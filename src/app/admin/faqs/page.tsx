"use client";

import { useState } from "react";
import FAQHeader from "@/components/admin/faqs/FAQHeader";
import FAQCard from "@/components/admin/faqs/FAQCard";
import { initialFAQs } from "@/data/faqs";
import type { FAQ } from "@/types/faq";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);

  const handleDelete = (id: string) => {
    setFaqs((current) => current.filter((faq) => faq.id !== id));
  };

  return (
    <div className="space-y-6">
      <FAQHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            faq={faq}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
