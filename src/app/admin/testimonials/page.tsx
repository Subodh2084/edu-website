"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import TestimonialHeader from "@/components/admin/Testimonials/TestimonialHeader";
import TestimonialCard from "@/components/admin/Testimonials/TestimonialCard";
import { Input } from "@/components/ui/input";
import {
  getAdminTestimonials,
  deleteTestimonial,
} from "@/lib/queries/admin";
import type { Testimonial } from "@/types/testimonial";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "featured" | "active" | "inactive">("all");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAdminTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Error loading testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this testimonial? This action cannot be undone.");
    if (!confirmed) return;

    const prev = testimonials;
    setTestimonials((current) => current.filter((item) => item.id !== id));

    const success = await deleteTestimonial(id);
    if (!success) {
      alert("Failed to delete testimonial from database.");
      setTestimonials(prev);
    }
  };

  const filteredTestimonials = useMemo(() => {
    const q = search.trim().toLowerCase();
    return testimonials.filter((t) => {
      const matchesSearch =
        !q ||
        t.student_name.toLowerCase().includes(q) ||
        t.review.toLowerCase().includes(q) ||
        (t.designation && t.designation.toLowerCase().includes(q)) ||
        (t.course && t.course.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filter === "featured") return t.is_featured;
      if (filter === "active") return t.is_active;
      if (filter === "inactive") return !t.is_active;
      return true;
    });
  }, [testimonials, search, filter]);

  return (
    <div className="space-y-6">
      <TestimonialHeader />

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-leaf-muted" />
          <Input
            placeholder="Search by student, review, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-leaf-border bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          {(
            [
              { label: "All", value: "all" },
              { label: "Featured", value: "featured" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === tab.value
                  ? "bg-leaf-green-dark text-white shadow-sm"
                  : "bg-white border border-leaf-border text-leaf-navy hover:bg-leaf-bg"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-leaf-muted gap-3">
          <Loader2 className="size-8 animate-spin text-leaf-green-dark" />
          <p className="text-sm">Loading dynamic testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-leaf-border bg-white p-12 text-center">
          <Sparkles className="mx-auto size-8 text-leaf-muted" />
          <h3 className="mt-3 text-base font-semibold text-leaf-navy">
            No testimonials found
          </h3>
          <p className="mt-1 text-sm text-leaf-muted">
            {search
              ? "Try changing your search query or filter."
              : "Get started by adding your first student testimonial."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}