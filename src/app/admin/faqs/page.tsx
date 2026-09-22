"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Search, HelpCircle } from "lucide-react";
import FAQHeader from "@/components/admin/faqs/FAQHeader";
import FAQCard from "@/components/admin/faqs/FAQCard";
import { Input } from "@/components/ui/input";
import { getAdminFAQs, deleteFAQ } from "@/lib/queries/admin";
import type { FAQ, FAQCategory } from "@/types/faq";

const CATEGORIES: Array<"All" | FAQCategory> = [
  "All",
  "General",
  "Course",
  "Enrollment",
  "Payment",
  "Certificate",
];

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | FAQCategory>("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAdminFAQs();
      setFaqs(data);
    } catch (err) {
      console.error("Error loading FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const prev = faqs;
    setFaqs((current) => current.filter((faq) => faq.id !== id));

    const success = await deleteFAQ(id);
    if (!success) {
      alert("Failed to delete FAQ from database.");
      setFaqs(prev);
    }
  };

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        (faq.course_title && faq.course_title.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory !== "All" && faq.category !== selectedCategory) {
        return false;
      }

      if (statusFilter === "active") return faq.is_active;
      if (statusFilter === "inactive") return !faq.is_active;

      return true;
    });
  }, [faqs, search, selectedCategory, statusFilter]);

  return (
    <div className="space-y-6">
      <FAQHeader />

      {/* Search and Category Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-leaf-muted" />
            <Input
              placeholder="Search questions or answers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 border-leaf-border bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className="text-leaf-muted mr-1">Status:</span>
            {(
              [
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ] as const
            ).map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === s.value
                    ? "bg-leaf-green-dark text-white shadow-sm"
                    : "bg-white border border-leaf-border text-leaf-navy hover:bg-leaf-bg"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full transition-colors font-medium ${
                selectedCategory === cat
                  ? "bg-leaf-navy text-white shadow-sm"
                  : "bg-leaf-bg text-leaf-muted hover:text-leaf-navy hover:bg-leaf-soft"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-leaf-muted gap-3">
          <Loader2 className="size-8 animate-spin text-leaf-green-dark" />
          <p className="text-sm">Loading dynamic FAQs...</p>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-leaf-border bg-white p-12 text-center">
          <HelpCircle className="mx-auto size-8 text-leaf-muted" />
          <h3 className="mt-3 text-base font-semibold text-leaf-navy">
            No FAQs found
          </h3>
          <p className="mt-1 text-sm text-leaf-muted">
            {search || selectedCategory !== "All"
              ? "Try adjusting your search query or category filter."
              : "Get started by adding frequently asked questions."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredFaqs.map((faq) => (
            <FAQCard key={faq.id} faq={faq} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
