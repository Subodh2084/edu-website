"use client";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";

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

const requirementSchema = z.object({
  requirement: z
    .string()
    .min(3, "Requirement must be at least 3 characters"),
});

type RequirementFormValues = z.infer<typeof requirementSchema>;

import {
  deleteCourseRequirement,
  getCourseRequirements,
  saveCourseRequirement,
} from "@/lib/queries/admin";

export default function CourseRequirements({ courseId }: { courseId: string }) {
  const [requirements, setRequirements] = useState<
    { id: string; requirement: string }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] =
    useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadRequirements = async () => {
    const data = await getCourseRequirements(courseId);
    setRequirements(
      data.map((item) => ({ id: item.id, requirement: item.requirement })),
    );
  };

  useEffect(() => {
    if (!courseId) return;
    loadRequirements();
  }, [courseId]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RequirementFormValues>({
    resolver: zodResolver(requirementSchema),
    defaultValues: {
      requirement: "",
    },
  });

  const handleAdd = () => {
    setEditingRequirement(null);
    reset({ requirement: "" });
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    const selectedRequirement = requirements.find(
      (item) => item.id === id,
    );

    if (!selectedRequirement) return;

    setEditingRequirement(id);
    setValue("requirement", selectedRequirement.requirement);
    setOpen(true);
  };

  const onSubmit = async (data: RequirementFormValues) => {
    const success = await saveCourseRequirement(courseId, {
      id: editingRequirement || undefined,
      requirement: data.requirement,
    });

    if (success) {
      await loadRequirements();
      reset();
      setEditingRequirement(null);
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">
            Course Requirements
          </CardTitle>

          <p className="mt-1 text-sm text-leaf-muted">
            Define what students should know or have before
            starting this course.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="w-fit text-white bg-leaf-green-dark hover:bg-leaf-green"
        >
          <Plus className="size-4" />
          Add Requirement
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {requirements.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-leaf-border p-3"
            >
              <span className="text-sm font-medium text-leaf-muted">
                {index + 1}.
              </span>

              <p className="flex-1 text-sm text-leaf-navy">
                {item.requirement}
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

                <DropdownMenuContent align="end" className={'bg-leaf-bg'}>
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
            setEditingRequirement(null);
          }
        }}
      >
        <DialogContent className={'bg-leaf-bg'}>
          <DialogHeader>
            <DialogTitle>
              {editingRequirement
                ? "Edit Course Requirement"
                : "Add Course Requirement"}
            </DialogTitle>

            <DialogDescription>
              {editingRequirement
                ? "Update this course requirement."
                : "Add a requirement students should meet before starting the course."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="requirement"
                className="text-sm font-medium text-leaf-navy"
              >
                Requirement
              </label>

              <Input
                id="requirement"
                placeholder="e.g. Basic JavaScript knowledge"
                {...register("requirement")}
              />

              {errors.requirement && (
                <p className="text-sm text-red-500">
                  {errors.requirement.message}
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
                {editingRequirement
                  ? "Save Changes"
                  : "Add Requirement"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent className={"bg-leaf-bg border-leaf-border"}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete this requirement?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This requirement will
              be removed from this course.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={async () => {
                if (!deleteId) return;
                const success = await deleteCourseRequirement(deleteId);
                if (success) await loadRequirements();
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