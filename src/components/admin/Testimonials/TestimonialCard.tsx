"use client";

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

import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
    testimonial: Testimonial;
    onDelete: (id: string) => void;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    onDelete: (id: string) => void;
}

export default function TestimonialCard({
    testimonial,
    onDelete
}: TestimonialCardProps) {
    return (
        <Card className="border-leaf-border bg-white">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage
                                src={testimonial.profile_image ?? undefined}
                                alt={testimonial.student_name}
                            />

                            <AvatarFallback className="bg-leaf-soft text-leaf-green-dark">
                                {testimonial.student_name
                                    .charAt(0)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="font-medium text-leaf-navy">
                                {testimonial.student_name}
                            </h3>

                            {testimonial.designation && (
                                <p className="text-sm text-leaf-muted">
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
                            <DropdownMenuItem className="p-0">
                                <Link
                                    href={`/admin/testimonials/${testimonial.id}/edit`}
                                    className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer text-sm text-leaf-navy"
                                >
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => onDelete(testimonial.id)}
                                className="text-red-600 focus:text-red-600"
                            >
                                <Trash2 className="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
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

                <p className="line-clamp-3 text-sm text-leaf-muted">
                    {testimonial.review}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-leaf-border text-leaf-navy"
                    >
                        {testimonial.course}
                    </Badge>

                    {testimonial.is_featured && (
                        <Badge className="bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft">
                            Featured
                        </Badge>
                    )}

                    <Badge
                        className={
                            testimonial.is_active
                                ? "bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft"
                                : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                        }
                    >
                        {testimonial.is_active
                            ? "Active"
                            : "Inactive"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}