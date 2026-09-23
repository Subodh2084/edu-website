"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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

import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  onDelete: (id: string) => void;
}

export default function TestimonialCard({
  testimonial,
  onDelete,
}: TestimonialCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col border-2 shadow-lg justify-between border-leaf-border bg-white">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-leaf-border">
                <AvatarImage
                  src={testimonial.profile_image ?? undefined}
                  alt={testimonial.student_name}
                />

                <AvatarFallback className="bg-leaf-soft font-semibold text-leaf-green-dark">
                  {testimonial.student_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-sm font-semibold text-leaf-navy sm:text-base">
                  {testimonial.student_name}
                </h3>

                {testimonial.designation && (
                  <p className="text-xs text-leaf-muted">
                    {testimonial.designation}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-leaf-muted"
                  />
                }
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-leaf-bg">
                <DropdownMenuItem className="p-0">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm text-leaf-navy"
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between space-y-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${index < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-leaf-border"
                    }`}
                />
              ))}
            </div>

            <p className="line-clamp-3 text-sm leading-relaxed text-leaf-muted">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-leaf-border/60 pt-3">
            {testimonial.course && (
              <Badge
                variant="outline"
                className="border-leaf-border text-xs text-leaf-navy"
              >
                {testimonial.course}
              </Badge>
            )}

            {testimonial.is_featured && (
              <Badge className="bg-leaf-soft text-xs text-leaf-green-dark hover:bg-leaf-soft">
                Featured
              </Badge>
            )}

            <Badge
              className={
                testimonial.is_active
                  ? "bg-leaf-soft text-xs text-leaf-green-dark hover:bg-leaf-soft"
                  : "bg-yellow-50 text-xs text-yellow-700 hover:bg-yellow-50"
              }
            >
              {testimonial.is_active ? "Active" : "Inactive"}
            </Badge>

            <span className="ml-auto text-xs text-leaf-muted">
              Order: {testimonial.display_order}
            </span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border-leaf-border bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-leaf-navy">
              Delete Testimonial?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-leaf-muted">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                onDelete(testimonial.id);
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