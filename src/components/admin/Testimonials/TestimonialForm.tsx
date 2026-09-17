"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";

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

import { testimonials } from "@/data/testimonials";
import { courses } from "@/data/courses";

const testimonialSchema = z.object({
    student_name: z
        .string()
        .min(3, "Student name must be at least 3 characters"),

    designation: z.string().optional(),

    course_id: z.string().optional(),

    rating: z
        .number()
        .min(1, "Rating is required")
        .max(5, "Rating cannot exceed 5"),

    review: z
        .string()
        .min(10, "Review must be at least 10 characters"),

    display_order: z
        .number()
        .min(0, "Display order cannot be negative"),

    is_featured: z.boolean(),

    is_active: z.boolean(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
    testimonialId?: string;
}

export default function TestimonialForm({
    testimonialId,
}: TestimonialFormProps) {
    const router = useRouter();
    const isEditing = Boolean(testimonialId);

    // Find existing testimonial if in edit mode
    const existingTestimonial = isEditing
        ? testimonials.find((t) => t.id === testimonialId)
        : null;

    const [imagePreview, setImagePreview] = useState<string | null>(
        existingTestimonial?.profile_image ?? null
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            student_name: existingTestimonial?.student_name ?? "",
            designation: existingTestimonial?.designation ?? "",
            course_id: existingTestimonial?.course_id ?? "",
            rating: existingTestimonial?.rating ?? 5,
            review: existingTestimonial?.review ?? "",
            display_order: existingTestimonial?.display_order ?? 0,
            is_featured: existingTestimonial?.is_featured ?? false,
            is_active: existingTestimonial?.is_active ?? true,
        },
    });

    useEffect(() => {
        if (existingTestimonial) {
            reset({
                student_name: existingTestimonial.student_name,
                designation: existingTestimonial.designation ?? "",
                course_id: existingTestimonial.course_id ?? "",
                rating: existingTestimonial.rating,
                review: existingTestimonial.review,
                display_order: existingTestimonial.display_order,
                is_featured: existingTestimonial.is_featured,
                is_active: existingTestimonial.is_active,
            });
            setImagePreview(existingTestimonial.profile_image ?? null);
        }
    }, [existingTestimonial, reset]);

    const isFeatured = watch("is_featured");
    const isActive = watch("is_active");
    const currentRating = watch("rating");
    const currentCourseId = watch("course_id");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const onSubmit = (data: TestimonialFormValues) => {
        console.log("Submitting testimonial form:", {
            ...data,
            profile_image: imagePreview,
        });
        router.push("/admin/testimonials");
    };

    return (
        <Card className="border-leaf-border bg-white">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-leaf-navy">
                    {isEditing ? "Edit Testimonial" : "Add Testimonial"}
                </CardTitle>
                <CardDescription className="text-leaf-muted">
                    {isEditing
                        ? "Update the details of the student testimonial."
                        : "Fill in the details below to add a new student testimonial."}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Student Name & Designation */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                                Student Name *
                            </label>
                            <Input
                                {...register("student_name")}
                                placeholder="Enter student name"
                                className="border-leaf-border"
                            />
                            {errors.student_name && (
                                <p className="text-xs text-red-600">
                                    {errors.student_name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                                Designation / Role
                            </label>
                            <Input
                                {...register("designation")}
                                placeholder="e.g. Frontend Developer"
                                className="border-leaf-border"
                            />
                        </div>
                    </div>

                    {/* Course & Rating */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                                Course
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

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                                Rating (1 - 5 Stars) *
                            </label>
                            <Select
                                value={String(currentRating ?? 5)}
                                onValueChange={(val) => setValue("rating", Number(val))}
                            >
                                <SelectTrigger className="w-full border-leaf-border bg-white">
                                    <SelectValue placeholder="Select Rating" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="5">★★★★★ (5 Stars)</SelectItem>
                                    <SelectItem value="4">★★★★☆ (4 Stars)</SelectItem>
                                    <SelectItem value="3">★★★☆☆ (3 Stars)</SelectItem>
                                    <SelectItem value="2">★★☆☆☆ (2 Stars)</SelectItem>
                                    <SelectItem value="1">★☆☆☆☆ (1 Star)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.rating && (
                                <p className="text-xs text-red-600">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Profile Image & Upload Preview */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                            Profile Image
                        </label>

                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-leaf-border bg-leaf-bg">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Profile preview"
                                        fill
                                        unoptimized={
                                            imagePreview.startsWith("blob:") ||
                                            imagePreview.startsWith("data:")
                                        }
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-xs text-leaf-muted">
                                        <Upload className="mb-1 size-6 text-leaf-muted" />
                                        <span>No image selected</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full max-w-xs border-leaf-border cursor-pointer bg-white text-sm"
                                />
                                <p className="text-xs text-leaf-muted">
                                    Upload a student avatar or photo. PNG, JPG or WEBP formats.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Review */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                            Review *
                        </label>
                        <Textarea
                            {...register("review")}
                            placeholder="Write the student's testimonial review here..."
                            rows={4}
                            className="border-leaf-border"
                        />
                        {errors.review && (
                            <p className="text-xs text-red-600">
                                {errors.review.message}
                            </p>
                        )}
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

                    {/* Switches for Featured & Active */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-lg border border-leaf-border bg-white p-4">
                            <Checkbox
                                checked={isFeatured}
                                onCheckedChange={(checked) =>
                                    setValue("is_featured", checked === true)
                                }
                            />

                            <div>
                                <p className="text-sm font-medium text-leaf-navy">
                                    Featured
                                </p>

                                <p className="text-xs text-leaf-muted">
                                    Show this testimonial in featured sections.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-lg border border-leaf-border bg-white p-4">
                            <Checkbox
                                checked={isActive}
                                onCheckedChange={(checked) =>
                                    setValue("is_active", checked === true)
                                }
                            />

                            <div>
                                <p className="text-sm font-medium text-leaf-navy">
                                    Active
                                </p>

                                <p className="text-xs text-leaf-muted">
                                    Show this testimonial on the website.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-leaf-border">
                        <Link
                            href="/admin/testimonials"
                            className="inline-flex items-center justify-center rounded-lg border border-leaf-border bg-white px-4 py-2 text-sm font-medium text-leaf-navy transition-colors hover:bg-leaf-bg"
                        >
                            Cancel
                        </Link>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-leaf-green-dark text-white hover:bg-leaf-green"
                        >
                            {isEditing ? "Update Testimonial" : "Add Testimonial"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

