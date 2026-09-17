
"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const audienceSchema = z.object({
  description: z
    .string()
    .min(10, "Audience description must be at least 10 characters"),
});

type AudienceFormValues = z.infer<typeof audienceSchema>;

const initialAudience = [
  {
    id: "1",
    description:
      "This course is designed for beginners, students, and aspiring frontend developers who want to learn modern web development.",
  },
  {
    id: "2",
    description:
      "Students who want to build practical projects and develop the skills required for a career in frontend development.",
  },
];

export default function CourseAudience() {
  const [audience, setAudience] = useState(initialAudience);
  const [open, setOpen] = useState(false);
  const [editingAudience, setEditingAudience] =
    useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleAdd = () => {
    setEditingAudience(null);
    reset({ description: "" });
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    const selectedAudience = audience.find(
      (item) => item.id === id,
    );

    if (!selectedAudience) return;

    setEditingAudience(id);
    setValue("description", selectedAudience.description);
    setOpen(true);
  };

  const onSubmit = (data: AudienceFormValues) => {
    if (editingAudience) {
      setAudience((current) =>
        current.map((item) =>
          item.id === editingAudience
            ? {
                ...item,
                description: data.description,
              }
            : item,
        ),
      );
    } else {
      setAudience((current) => [
        ...current,
        {
          id: Date.now().toString(),
          description: data.description,
        },
      ]);
    }

    reset();
    setEditingAudience(null);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">
            Target Audience
          </CardTitle>

          <p className="mt-1 text-sm text-leaf-muted">
            Describe who this course is designed for.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="w-fit bg-leaf-green-dark text-white hover:bg-leaf-green"
        >
          <Plus className="size-4" />
          Add Audience
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {audience.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-md border border-leaf-border p-3"
            >
              <span className="text-sm font-medium text-leaf-muted">
                {index + 1}.
              </span>

              <p className="flex-1 text-sm leading-6 text-leaf-navy">
                {item.description}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-leaf-muted"
                    />
                  }
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-leaf-bg"
                >
                  <DropdownMenuItem
                    onClick={() => handleEdit(item.id)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setDeleteId(item.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Add / Edit Dialog */}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            reset();
            setEditingAudience(null);
          }
        }}
      >
        <DialogContent className="bg-leaf-bg">
          <DialogHeader>
            <DialogTitle>
              {editingAudience
                ? "Edit Target Audience"
                : "Add Target Audience"}
            </DialogTitle>

            <DialogDescription>
              {editingAudience
                ? "Update this target audience description."
                : "Describe who this course is designed for."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-leaf-navy"
              >
                Description
              </label>

              <Textarea
                id="description"
                placeholder="Describe who this course is designed for..."
                rows={5}
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {editingAudience
                  ? "Save Changes"
                  : "Add Audience"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent className="border-leaf-border bg-leaf-bg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this target audience?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This audience description
              will be removed from this course.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (!deleteId) return;

                setAudience((current) =>
                  current.filter(
                    (item) => item.id !== deleteId,
                  ),
                );

                setDeleteId(null);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
