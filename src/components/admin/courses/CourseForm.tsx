"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const courseSchema = z.object({
  title: z.string().min(3, "Course title must be at least 3 characters"),

  short_description: z
    .string()
    .min(10, "Short description must be at least 10 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  category_id: z
    .string()
    .min(1, "Please select a category"),

  preview_video_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  discount_price: z.coerce
    .number()
    .min(0, "Discount price cannot be negative")
    .optional(),

  level: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Please select a level",
  }),

  duration: z
    .string()
    .min(1, "Duration is required"),

  language: z
    .string()
    .min(1, "Language is required"),

  status: z.enum(["draft", "published", "archived"], {
    message: "Please select a status",
  }),

  featured: z.boolean(),

  popular: z.boolean(),
});

type CourseFormValues = z.input<typeof courseSchema>;

interface CourseFormProps {
  courseId?: string;
}

const mockCourse = {
  id: "1",
  title: "React Development",
  short_description:
    "Learn React from fundamentals to building production-ready applications.",
  description:
    "A complete React development course covering components, hooks, state management, routing, API integration, and modern frontend development.",
  category_id: "web-development",
  preview_video_url: "https://youtube.com/example",
  price: 15000,
  discount_price: 12000,
  level: "intermediate" as const,
  duration: "3 Months",
  language: "English",
  status: "published" as const,
  featured: true,
  popular: true,
};

export default function CourseForm({
  courseId,
}: CourseFormProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),

    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      category_id: "",
      preview_video_url: "",
      price: 0,
      discount_price: undefined,
      level: "beginner",
      duration: "",
      language: "English",
      status: "draft",
      featured: false,
      popular: false,
    },
  });

  useEffect(() => {
    if (!courseId) return;

    if (courseId === mockCourse.id) {
      reset(mockCourse);
    }
  }, [courseId, reset]);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setThumbnail(URL.createObjectURL(file));
  };

  const onSubmit = (data: CourseFormValues) => {
    if (courseId) {
      console.log("Updating course:", courseId);
      console.log(data);
      return;
    }

    console.log("Creating course:", data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-leaf-navy">
              Course Title
            </label>

            <Input
              placeholder="Enter course title"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Short Description */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-leaf-navy">
              Short Description
            </label>

            <Textarea
              placeholder="Enter a short description"
              {...register("short_description")}
            />

            {errors.short_description && (
              <p className="text-sm text-red-500">
                {errors.short_description.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-leaf-navy">
              Description
            </label>

            <Textarea
              placeholder="Enter course description"
              className="min-h-32"
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Course Details */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Category */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Category
              </label>

              <Select
                value={watch("category_id")}
                onValueChange={(value) => {
                  if (!value) return;

                  setValue("category_id", value, {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="web-development">
                    Web Development
                  </SelectItem>

                  <SelectItem value="design">
                    UI/UX Design
                  </SelectItem>

                  <SelectItem value="programming">
                    Programming
                  </SelectItem>
                </SelectContent>
              </Select>

              {errors.category_id && (
                <p className="text-sm text-red-500">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            {/* Preview Video */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Preview Video URL
              </label>

              <Input
                placeholder="https://youtube.com/..."
                {...register("preview_video_url")}
              />

              {errors.preview_video_url && (
                <p className="text-sm text-red-500">
                  {errors.preview_video_url.message}
                </p>
              )}
            </div>

            {/* Price */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Price
              </label>

              <Input
                type="number"
                placeholder="15000"
                {...register("price")}
              />

              {errors.price && (
                <p className="text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Discount Price */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Discount Price
              </label>

              <Input
                type="number"
                placeholder="12000"
                {...register("discount_price")}
              />

              {errors.discount_price && (
                <p className="text-sm text-red-500">
                  {errors.discount_price.message}
                </p>
              )}
            </div>

            {/* Level */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Level
              </label>

              <Select
                value={watch("level")}
                onValueChange={(value) => {
                  if (!value) return;

                  setValue(
                    "level",
                    value as CourseFormValues["level"],
                    {
                      shouldValidate: true,
                    },
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="beginner">
                    Beginner
                  </SelectItem>

                  <SelectItem value="intermediate">
                    Intermediate
                  </SelectItem>

                  <SelectItem value="advanced">
                    Advanced
                  </SelectItem>
                </SelectContent>
              </Select>

              {errors.level && (
                <p className="text-sm text-red-500">
                  {errors.level.message}
                </p>
              )}
            </div>

            {/* Duration */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Duration
              </label>

              <Input
                placeholder="3 Months"
                {...register("duration")}
              />

              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Language */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Language
              </label>

              <Input
                placeholder="English"
                {...register("language")}
              />

              {errors.language && (
                <p className="text-sm text-red-500">
                  {errors.language.message}
                </p>
              )}
            </div>

            {/* Status */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-leaf-navy">
                Status
              </label>

              <Select
                value={watch("status")}
                onValueChange={(value) => {
                  if (!value) return;

                  setValue(
                    "status",
                    value as CourseFormValues["status"],
                    {
                      shouldValidate: true,
                    },
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="draft">
                    Draft
                  </SelectItem>

                  <SelectItem value="published">
                    Published
                  </SelectItem>

                  <SelectItem value="archived">
                    Archived
                  </SelectItem>
                </SelectContent>
              </Select>

              {errors.status && (
                <p className="text-sm text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Thumbnail */}

          <div className="space-y-2">
            <label className="text-sm font-medium text-leaf-navy">
              Course Thumbnail
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />

            {thumbnail && (
              <div className="relative mt-3 h-52 w-full overflow-hidden rounded-lg border border-leaf-border">
                <Image
                  src={thumbnail}
                  alt="Course thumbnail preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Featured / Popular */}

          <div className="flex flex-col gap-4 rounded-lg border border-leaf-border p-4 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-2 text-sm text-leaf-navy">
              <input
                type="checkbox"
                {...register("featured")}
              />

              Featured Course
            </label>

            <label className="flex items-center gap-2 text-sm text-leaf-navy">
              <input
                type="checkbox"
                {...register("popular")}
              />

              Popular Course
            </label>
          </div>

          {/* Submit */}

          <Button
            type="submit"
            className="bg-leaf-green-dark text-white hover:bg-leaf-green-dark/80 hover:text-white px-4 py-2 rounded"
          >
            {courseId ? "Update Course" : "Create Course"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}