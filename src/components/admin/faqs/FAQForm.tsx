"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

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

import {
  getFAQById,
  saveFAQ,
  getCourseOptions,
} from "@/lib/queries/admin";
import type { FAQCategory } from "@/types/faq";

const faqCategories: FAQCategory[] = [
  "General",
  "Course",
  "Enrollment",
  "Payment",
  "Certificate",
];

const faqSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters"),

  answer: z
    .string()
    .min(10, "Answer must be at least 10 characters"),

  category: z.enum([
    "General",
    "Course",
    "Enrollment",
    "Payment",
    "Certificate",
  ] as const),

  course_id: z.string().optional(),

  display_order: z
    .number()
    .min(0, "Display order must be 0 or greater"),

  is_active: z.boolean(),
});

type FAQFormValues = z.infer<typeof faqSchema>;

interface FAQFormProps {
  faqId?: string;
}

export default function FAQForm({ faqId }: FAQFormProps) {
  const router = useRouter();
  const isEditing = Boolean(faqId);

  const [loadingData, setLoadingData] = useState(isEditing);
  const [coursesList, setCoursesList] = useState<{ id: string; title: string }[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      question: "",
      answer: "",
      category: "General",
      course_id: "",
      display_order: 0,
      is_active: true,
    },
  });

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const courses = await getCourseOptions();
        if (isMounted) setCoursesList(courses);

        if (faqId) {
          setLoadingData(true);
          const existing = await getFAQById(faqId);
          if (isMounted && existing) {
            reset({
              question: existing.question,
              answer: existing.answer,
              category: existing.category,
              course_id: existing.course_id ?? "",
              display_order: existing.display_order ?? 0,
              is_active: existing.is_active ?? true,
            });
          }
        }
      } catch (err) {
        console.error("Error initializing FAQ form:", err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [faqId, reset]);

  const isActive = watch("is_active");
  const currentCategory = watch("category");
  const currentCourseId = watch("course_id");

  const onSubmit = async (data: FAQFormValues) => {
    setSubmitError(null);
    try {
      const res = await saveFAQ({
        id: faqId,
        question: data.question,
        answer: data.answer,
        category: data.category,
        course_id: data.course_id || null,
        display_order: data.display_order,
        is_active: data.is_active,
      });

      if (!res.success) {
        setSubmitError(res.error || "Failed to save FAQ.");
        return;
      }

      router.push("/admin/faqs");
      router.refresh();
    } catch (err: any) {
      console.error("Error submitting FAQ:", err);
      setSubmitError(err.message || "An unexpected error occurred.");
    }
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-leaf-muted gap-3">
        <Loader2 className="size-8 animate-spin text-leaf-green-dark" />
        <p className="text-sm">Loading FAQ details...</p>
      </div>
    );
  }

  return (
    <Card className="border-leaf-border bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-leaf-navy">
          {isEditing ? "Edit FAQ" : "Create FAQ"}
        </CardTitle>
        <CardDescription className="text-leaf-muted">
          {isEditing
            ? "Update the details for this frequently asked question."
            : "Fill in the details below to add a new FAQ for your website."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submitError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Question */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Question *
            </label>
            <Input
              {...register("question")}
              placeholder="e.g. Will I receive a certificate upon completion?"
              className="border-leaf-border"
            />
            {errors.question && (
              <p className="text-xs text-red-600">{errors.question.message}</p>
            )}
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Answer *
            </label>
            <Textarea
              {...register("answer")}
              placeholder="Provide a clear, helpful answer..."
              rows={4}
              className="border-leaf-border"
            />
            {errors.answer && (
              <p className="text-xs text-red-600">{errors.answer.message}</p>
            )}
          </div>

          {/* Category & Associated Course */}
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
                  <SelectValue placeholder="General / All Courses" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="none">General / All Courses</SelectItem>
                  {coursesList.map((course) => (
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
              <p className="text-xs text-red-600">
                {errors.display_order.message}
              </p>
            )}
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-start gap-3 rounded-lg border border-leaf-border bg-white p-4">
            <Checkbox
              checked={isActive}
              onCheckedChange={(checked) =>
                setValue("is_active", checked === true)
              }
            />

            <div>
              <p className="text-sm font-medium text-leaf-navy">Active</p>
              <p className="text-xs text-leaf-muted">
                Show this FAQ on the website.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
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
              className="bg-leaf-green-dark text-white hover:bg-leaf-green flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isEditing ? "Update FAQ" : "Save FAQ"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
