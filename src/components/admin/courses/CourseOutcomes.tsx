"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const outcomeSchema = z.object({
  outcome: z.string().min(3, "Outcome must be at least 3 characters"),
});

type OutcomeFormValues = z.infer<typeof outcomeSchema>;

const initialOutcomes = [
  {
    id: "1",
    outcome: "Understand React fundamentals",
  },
  {
    id: "2",
    outcome: "Build reusable React components",
  },
  {
    id: "3",
    outcome: "Manage application state",
  },
  {
    id: "4",
    outcome: "Build production-ready applications",
  },
];

export default function CourseOutcomes() {
  const [outcomes, setOutcomes] = useState(initialOutcomes);
  const [open, setOpen] = useState(false);
  const [editingOutcome, setEditingOutcome] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OutcomeFormValues>({
    resolver: zodResolver(outcomeSchema),
    defaultValues: {
      outcome: "",
    },
  });

  const handleAdd = () => {
    setEditingOutcome(null);
    reset({ outcome: "" });
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    const selectedOutcome = outcomes.find((item) => item.id === id);

    if (!selectedOutcome) return;

    setEditingOutcome(id);
    setValue("outcome", selectedOutcome.outcome);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setOutcomes((current) => current.filter((item) => item.id !== id));
  };

  const onSubmit = (data: OutcomeFormValues) => {
    if (editingOutcome) {
      setOutcomes((current) =>
        current.map((item) =>
          item.id === editingOutcome
            ? { ...item, outcome: data.outcome }
            : item,
        ),
      );
    } else {
      setOutcomes((current) => [
        ...current,
        {
          id: Date.now().toString(),
          outcome: data.outcome,
        },
      ]);
    }

    reset();
    setEditingOutcome(null);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">Course Outcomes</CardTitle>

          <p className="mt-1 text-sm text-leaf-muted">
            Define what students will learn from this course.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="w-fit bg-leaf-green-dark text-white hover:bg-leaf-green"
        >
          <Plus className="size-4" />
          Add Outcome
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {outcomes.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-md border border-leaf-border p-3"
            >
              <span className="text-sm font-medium text-leaf-muted">
                {index + 1}.
              </span>

              <p className="flex-1 text-sm text-leaf-navy">{item.outcome}</p>

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
                  className={"bg-leaf-bg border-leaf-border"}
                >
                  <DropdownMenuItem onClick={() => handleEdit(item.id)}>
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

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            reset();
            setEditingOutcome(null);
          }
        }}
      >
        <DialogContent className={"bg-leaf-bg border-leaf-border"}>
          <DialogHeader>
            <DialogTitle>
              {editingOutcome ? "Edit Course Outcome" : "Add Course Outcome"}
            </DialogTitle>

            <DialogDescription>
              {editingOutcome
                ? "Update this learning outcome."
                : "Add a learning outcome for this course."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="outcome"
                className="text-sm font-medium text-leaf-navy"
              >
                Outcome
              </label>

              <Input
                id="outcome"
                placeholder="e.g. Build reusable React components"
                {...register("outcome")}
              />

              {errors.outcome && (
                <p className="text-sm text-red-500">{errors.outcome.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 text-white">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-leaf-green-dark hover:bg-leaf-green"
              >
                {editingOutcome ? "Save Changes" : "Add Outcome"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent className={"bg-leaf-bg border-leaf-border"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this outcome?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This outcome will be removed from
              this course.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (!deleteId) return;

                setOutcomes((current) =>
                  current.filter((item) => item.id !== deleteId),
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
