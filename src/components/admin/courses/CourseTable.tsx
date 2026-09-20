"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

import type { AdminCourseItem } from "@/lib/queries/admin";

interface CourseTableProps {
  courses: AdminCourseItem[];
  loading?: boolean;
  onDelete: (id: string) => Promise<void> | void;
}

export default function CourseTable({
  courses,
  loading,
  onDelete,
}: CourseTableProps) {
  const [courseToDelete, setCourseToDelete] =
    useState<AdminCourseItem | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(courseToDelete.id);
      setCourseToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-md border border-leaf-border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-sm text-leaf-muted"
                >
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-sm text-leaf-muted"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium text-leaf-navy">
                    {course.title}
                  </TableCell>

                  <TableCell>
                    {course.category_name || "Uncategorized"}
                  </TableCell>

                  <TableCell className="capitalize">
                    {course.level}
                  </TableCell>

                  <TableCell>
                    NPR {Number(course.price || 0).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={
                        course.status === "published"
                          ? "bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft"
                          : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-leaf-muted"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="bg-leaf-bg"
                      >
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/courses/${course.id}`}
                            className="flex w-full items-center gap-2"
                          >
                            <Eye className="size-4" />
                            View
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <Link
                            href={`/admin/courses/${course.id}/edit`}
                            className="flex w-full items-center gap-2"
                          >
                            <Pencil className="size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setCourseToDelete(course)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!courseToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setCourseToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-leaf-border bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-leaf-navy">
              Delete Course?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-leaf-muted">
              Are you sure you want to delete{" "}
              <span className="font-medium text-leaf-navy">
                {courseToDelete?.title}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}