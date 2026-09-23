"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FolderKanban,
  GraduationCap,
  MoreHorizontal,
  Pen,
  Trash,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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

import { deleteStat, type StatRecord } from "@/lib/queries/stats";

const iconMap: Record<string, LucideIcon> = {
  Users,
  BookOpen,
  UserRoundCheck,
  FolderKanban,
  GraduationCap,
};

interface StatCardProps {
  stat: StatRecord;
  onDelete: (id: string) => void | Promise<void>;
}

export default function StatCard({
  stat,
  onDelete,
}: StatCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const Icon = stat.icon
    ? iconMap[stat.icon] ?? Users
    : Users;

  async function handleDelete() {
    try {
      setDeleting(true);
      setDeleteError(null);

      await deleteStat(stat.id);

      await onDelete(stat.id);
      setDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete stat:", error);
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete stat. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Card className="border-2 border-leaf-border shadow-lg transition-shadow hover:shadow-xl">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          {/* Icon */}
          <div className="flex size-11 items-center justify-center rounded-lg bg-leaf-soft">
            <Icon className="size-5 text-leaf-green-dark" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                variant="ghost"
                size="icon"
                className="size-8 text-leaf-muted hover:text-leaf-navy"
                />
              }
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open actions</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="border-2 border-leaf-border"
            >
              <DropdownMenuItem>
                <Link
                  href={`/admin/stats/${stat.id}`}
                  className="flex items-center gap-2"
                >
                  <Pen className="size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {
                  setDeleteError(null);
                  setDeleteOpen(true);
                }}
              >
                <Trash className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-bold text-leaf-navy">
            {stat.value}
          </p>
          <p className="mt-1 text-sm font-medium text-leaf-text">
            {stat.label}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-leaf-border pt-4">
            <Badge
              variant="outline"
              className={
                stat.is_active
                  ? "border-leaf-green/30 bg-leaf-soft text-leaf-green-dark"
                  : "border-leaf-border bg-leaf-bg text-leaf-muted"
              }
            >
              {stat.is_active ? "Active" : "Inactive"}
            </Badge>

            <span className="text-xs text-leaf-muted">
              Order: {stat.display_order}
            </span>
          </div>
        </CardContent>
      </Card>
      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent className="border-leaf-border bg-white border-2">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-leaf-navy">
              Delete this stat?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-leaf-navy">
                {stat.label}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
            {deleteError && (
              <p className="text-sm text-red-600" role="alert">
                {deleteError}
              </p>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
