"use client";

import Link from "next/link";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

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

const courses = [
  {
    id: "1",
    title: "Full Stack Web Development",
    category: "Web Development",
    level: "Intermediate",
    price: 15000,
    status: "published",
  },
  {
    id: "2",
    title: "UI/UX Design",
    category: "Design",
    level: "Beginner",
    price: 10000,
    status: "published",
  },
  {
    id: "3",
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    price: 8000,
    status: "draft",
  },
  {
    id: "4",
    title: "Digital Marketing",
    category: "Marketing",
    level: "Intermediate",
    price: 12000,
    status: "published",
  },
];

export default function CourseTable() {
  return (
    <div className="rounded-md border border-leaf-border bg-white">
      <Table className="border border-leaf-border">
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              className="border border-leaf-border"
            >
              <TableCell className="font-medium text-leaf-navy">
                {course.title}
              </TableCell>

              <TableCell>
                {course.category}
              </TableCell>

              <TableCell>
                {course.level}
              </TableCell>

              <TableCell>
                NPR {course.price.toLocaleString()}
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
                        className="flex items-center gap-2 w-full"
                      >
                        <Eye className="size-4" />
                        View
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="flex items-center gap-2 w-full"
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        console.log(
                          "Delete course:",
                          course.id,
                        );
                      }}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}