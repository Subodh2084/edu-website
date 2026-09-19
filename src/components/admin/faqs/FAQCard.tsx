"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

import { courses } from "@/data/courses";
import type { FAQ } from "@/types/faq";

interface FAQCardProps {
  faq: FAQ;
  onDelete: (id: string) => void;
}

export default function FAQCard({ faq, onDelete }: FAQCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Use dynamic course_title if joined, or fallback to static lookup
  const courseTitle =
    faq.course_title ||
    (faq.course_id ? courses.find((c) => c.id === faq.course_id)?.title : null) ||
    (faq.course_id ? "Associated Course" : "General / All Courses");


  return (
    <>
      <Card className="border-leaf-border shadow-lg bg-white flex flex-col justify-between">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="border-leaf-border bg-leaf-soft text-leaf-green-dark font-medium"
            >
              {faq.category}
            </Badge>

            <div className="flex items-center gap-2">
              <Badge
                className={
                  faq.is_active
                    ? "bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft"
                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                }
              >
                {faq.is_active ? "Active" : "Inactive"}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-leaf-muted size-8"
                    />
                  }
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-leaf-bg">
                  <DropdownMenuItem className="p-0">
                    <Link
                      href={`/admin/faqs/${faq.id}/edit`}
                      className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-leaf-navy"
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="font-medium text-leaf-navy text-base leading-snug">
              {faq.question}
            </h3>

            <p className="line-clamp-3 text-sm text-leaf-muted leading-relaxed">
              {faq.answer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-leaf-border/60 text-xs text-leaf-muted">
            <span>Course: {courseTitle}</span>
            <span>Order: {faq.display_order}</span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-leaf-navy">
              Delete FAQ?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-leaf-muted">
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(faq.id);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
