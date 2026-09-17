"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { initialFAQs } from "@/data/faqs";
import { courses } from "@/data/courses";
import type { FAQCategory } from "@/types/faq";

const faqCategories: FAQCategory[] = [
  "General",
  "Course",
  "Enrollment",
  "Payment",
  "Certificate",
];

const faqSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  category: z.enum([
    "General",
    "Course",
    "Enrollment",
    "Payment",
    "Certificate",
  ]),
  course_id: z.string().optional(),
  display_order: z.number().min(0, "Display order cannot be negative"),
  is_active: z.boolean(),
});

type FAQFormValues = z.infer<typeof faqSchema>;

interface FAQFormProps {
  faqId?: string;
}

export default function FAQForm({ faqId }: FAQFormProps) {
  const router = useRouter();
  const isEditing = Boolean(faqId);

  // Look up existing FAQ if editing
  const existingFAQ = isEditing
    ? initialFAQs.find((f) => f.id === faqId)
    : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: existingFAQ?.question ?? "",
      answer: existingFAQ?.answer ?? "",
      category: existingFAQ?.category ?? "General",
      course_id: existingFAQ?.course_id ?? "",
      display_order: existingFAQ?.display_order ?? 0,
      is_active: existingFAQ?.is_active ?? true,
    },
  });

  useEffect(() => {
    if (existingFAQ) {
      reset({
        question: existingFAQ.question,
        answer: existingFAQ.answer,
        category: existingFAQ.category,
        course_id: existingFAQ.course_id ?? "",
        display_order: existingFAQ.display_order,
        is_active: existingFAQ.is_active,
      });
    }
  }, [existingFAQ, reset]);

  const currentCategory = watch("category");
  const currentCourseId = watch("course_id");
  const isActive = watch("is_active");

  const onSubmit = (data: FAQFormValues) => {
    const payload = {
      ...data,
      course_id: data.course_id ? data.course_id : null,
    };
    console.log("FAQ submit:", payload);
    router.push("/admin/faqs");
  };

  return (
    <Card className="border-leaf-border bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-leaf-navy">
          {isEditing ? "Edit FAQ" : "Create FAQ"}
        </CardTitle>
        <CardDescription className="text-leaf-muted">
          {isEditing
            ? "Update the details of the frequently asked question."
            : "Fill in the details below to add a new FAQ for your website."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Question *
            </label>
            <Input
              {...register("question")}
              placeholder="e.g. What is LeafClutch?"
              className="border-leaf-border"
            />
            {errors.question && (
              <p className="text-xs text-red-600 font-medium">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Answer *
            </label>
            <Textarea
              {...register("answer")}
              placeholder="Write the detailed answer here..."
              rows={5}
              className="border-leaf-border"
            />
            {errors.answer && (
              <p className="text-xs text-red-600 font-medium">
                {errors.answer.message}
              </p>
            )}
          </div>

          {/* Category & Course */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Category *
              </label>
              <Select
                value={currentCategory || "General"}
                onValueChange={(val) =>
                  setValue("category", val as FAQCategory)
                }
              >
                <SelectTrigger className="w-full border-leaf-border bg-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {faqCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Course (Optional)
              </label>
              <Select
                value={currentCourseId || "none"}
                onValueChange={(val) =>
                  setValue("course_id", !val || val === "none" ? "" : val)
                }
              >
                <SelectTrigger className="w-full border-leaf-border bg-white">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="none">None / General</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Display Order */}
          <div className="space-y-2 max-w-xs">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Display Order
            </label>
            <Input
              type="number"
              min={0}
              {...register("display_order", { valueAsNumber: true })}
              className="border-leaf-border"
            />
            {errors.display_order && (
              <p className="text-xs text-red-600 font-medium">
                {errors.display_order.message}
              </p>
            )}
          </div>

          {/* Active Checkbox (Using Checkbox component as requested) */}
          <div className="flex items-start gap-3 rounded-lg border border-leaf-border bg-white p-4">
            <Checkbox
              id="is_active_checkbox"
              checked={isActive}
              onCheckedChange={(checked) =>
                setValue("is_active", checked === true)
              }
              className="mt-0.5"
            />
            <div>
              <label
                htmlFor="is_active_checkbox"
                className="text-sm font-medium text-leaf-navy cursor-pointer"
              >
                Active
              </label>
              <p className="text-xs text-leaf-muted">
                Show this FAQ on the website.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-leaf-border">
            <Link
              href="/admin/faqs"
              className="inline-flex items-center justify-center rounded-lg border border-leaf-border bg-white px-4 py-2 text-sm font-medium text-leaf-navy transition-colors hover:bg-leaf-bg"
            >
              Cancel
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-leaf-green-dark text-white hover:bg-leaf-green"
            >
              {isEditing ? "Update FAQ" : "Save FAQ"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
