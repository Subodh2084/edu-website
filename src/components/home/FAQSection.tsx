"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageSquare, Search } from "lucide-react";
import { getFAQs } from "@/lib/queries/faqs";
import type { FAQ, FAQCategory } from "@/types/faq";

const CATEGORIES: Array<"All" | FAQCategory> = [
  "All",
  "General",
  "Course",
  "Enrollment",
  "Payment",
  "Certificate",
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"All" | FAQCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    getFAQs()
      .then((data) => {
        if (isMounted) {
          setFaqs(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load FAQs:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (selectedCategory !== "All" && faq.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 sm:py-24 border-t border-leaf-border/60">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-green-dark">
            Got Questions?
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-leaf-text">
            Everything you need to know about our courses, certifications, admissions, and learning model.
          </p>
        </div>

        {/* Category Filters & Search */}
        <div className="mt-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-leaf-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full rounded-full border border-leaf-border bg-leaf-bg/40 py-2.5 pl-10 pr-4 text-sm text-leaf-navy placeholder:text-leaf-muted focus:border-leaf-green-dark focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-leaf-green-dark text-white shadow-sm"
                    : "bg-leaf-bg text-leaf-muted hover:bg-leaf-soft hover:text-leaf-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl border border-leaf-border bg-leaf-bg/30 animate-pulse"
                />
              ))}
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-leaf-border bg-leaf-bg/30 p-12 text-center">
              <HelpCircle className="mx-auto size-8 text-leaf-muted" />
              <p className="mt-2 text-sm font-medium text-leaf-navy">
                No questions found in this category.
              </p>
              <p className="mt-1 text-xs text-leaf-muted">
                Try searching with different keywords or choosing another category.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? "border-leaf-green-dark/40 bg-leaf-soft/20 shadow-sm"
                      : "border-leaf-border bg-white hover:border-leaf-border/80 hover:bg-leaf-bg/20"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-xs font-semibold text-leaf-green-dark">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-leaf-navy text-sm sm:text-base">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`size-5 shrink-0 text-leaf-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-leaf-green-dark" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-leaf-border/40 px-5 pb-5 pt-3">
                      <p className="text-sm leading-relaxed text-leaf-text pl-10">
                        {faq.answer}
                      </p>
                      {faq.course_title && (
                        <div className="mt-3 pl-10">
                          <span className="rounded-md bg-leaf-soft px-2.5 py-1 text-xs font-medium text-leaf-green-dark">
                            Course: {faq.course_title}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-14 rounded-2xl border border-leaf-border bg-leaf-bg p-6 text-center sm:p-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-leaf-soft text-leaf-green-dark mb-3">
            <MessageSquare className="size-6" />
          </div>
          <h3 className="text-lg font-bold text-leaf-navy">
            Still have questions?
          </h3>
          <p className="mt-1 text-sm text-leaf-muted max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Please reach out to our friendly student support team.
          </p>
          <div className="mt-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-leaf-green-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf-green"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
