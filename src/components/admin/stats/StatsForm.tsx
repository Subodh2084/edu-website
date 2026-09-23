"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  FolderKanban,
  GraduationCap,
  Loader2,
  UserRoundCheck,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
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
  createStat,
  updateStat,
  type StatRecord,
} from "@/lib/queries/stats";

const statSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
    .max(20, "Value must be 20 characters or less"),

  label: z
    .string()
    .min(1, "Label is required")
    .max(50, "Label must be 50 characters or less"),

  icon: z.string().min(1, "Please select an icon"),

  display_order: z
    .number()
    .min(0, "Display order must be 0 or greater"),

  is_active: z.boolean(),
});

type StatFormValues = z.input<typeof statSchema>;

const iconOptions = [
  {
    value: "Users",
    label: "Users",
    icon: Users,
  },
  {
    value: "BookOpen",
    label: "Courses",
    icon: BookOpen,
  },
  {
    value: "UserRoundCheck",
    label: "Mentors",
    icon: UserRoundCheck,
  },
  {
    value: "FolderKanban",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    value: "GraduationCap",
    label: "Graduation",
    icon: GraduationCap,
  },
];

interface StatsFormProps {
  stat?: StatRecord;
}

export default function StatsForm({ stat }: StatsFormProps) {
  const router = useRouter();
  const isEditing = Boolean(stat);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StatFormValues>({
    resolver: zodResolver(statSchema),
    defaultValues: {
      value: stat?.value ?? "",
      label: stat?.label ?? "",
      icon: stat?.icon ?? "Users",
      display_order: stat?.display_order ?? 0,
      is_active: stat?.is_active ?? true,
    },
  });

  const selectedIcon = watch("icon");
  const isActive = watch("is_active");

  const onSubmit = async (data: StatFormValues) => {
    setSubmitError(null);

    try {
      if (stat) {
        await updateStat(stat.id, data);
      } else {
        await createStat(data);
      }

      router.push("/admin/stats");
      router.refresh();
    } catch (error) {
      console.error("Error saving stat:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to save stat. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link
        href="/admin/stats"
        className="inline-flex items-center gap-2 text-sm font-medium text-leaf-muted transition-colors hover:text-leaf-navy"
      >
        <ArrowLeft className="size-4" />
        Back to Stats
      </Link>

      <Card className="border-leaf-border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-leaf-navy">
            {isEditing ? "Edit Stat" : "Create Stat"}
          </CardTitle>

          <CardDescription className="text-leaf-muted">
            {isEditing
              ? "Update the details of this homepage statistic."
              : "Add a new statistic to display in the homepage hero section."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitError && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Value */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Value *
              </label>

              <Input
                {...register("value")}
                placeholder="e.g. 1,000+"
                className="border-leaf-border"
              />

              {errors.value && (
                <p className="text-xs text-red-600">
                  {errors.value.message}
                </p>
              )}
            </div>

            {/* Label */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Label *
              </label>

              <Input
                {...register("label")}
                placeholder="e.g. Students"
                className="border-leaf-border"
              />

              {errors.label && (
                <p className="text-xs text-red-600">
                  {errors.label.message}
                </p>
              )}
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Icon *
              </label>

              <Select
                value={selectedIcon}
                onValueChange={(value) => {
                  setValue("icon", value ?? "", {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger className="w-full border-leaf-border bg-white">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  {iconOptions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="size-4" />
                          {item.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {errors.icon && (
                <p className="text-xs text-red-600">
                  {errors.icon.message}
                </p>
              )}
            </div>

            {/* Display Order */}
            <div className="max-w-xs space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Display Order
              </label>

              <Input
                type="number"
                min={0}
                {...register("display_order", {
                  valueAsNumber: true,
                })}
                className="border-leaf-border"
              />

              {errors.display_order && (
                <p className="text-xs text-red-600">
                  {errors.display_order.message}
                </p>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-start gap-3 rounded-lg border border-leaf-border bg-white p-4">
              <Checkbox
                checked={isActive}
                onCheckedChange={(checked) =>
                  setValue("is_active", checked === true, {
                    shouldValidate: true,
                  })
                }
              />

              <div>
                <p className="text-sm font-medium text-leaf-navy">
                  Active
                </p>

                <p className="text-xs text-leaf-muted">
                  Show this stat on the website.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-leaf-border pt-4">
              <Link
                href="/admin/stats"
                className="inline-flex items-center justify-center rounded-lg border border-leaf-border bg-white px-4 py-2 text-sm font-medium text-leaf-navy transition-colors hover:bg-leaf-bg"
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {isSubmitting && (
                  <Loader2 className="size-4 animate-spin" />
                )}

                {isEditing ? "Update Stat" : "Save Stat"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

