"use client";

import {
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

import { Category } from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="rounded-md border border-leaf-border bg-white">
      <Table className="border border-leaf-border">
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="border border-leaf-border"
            >
              <TableCell className="font-medium text-leaf-navy">
                {category.name}
              </TableCell>

              <TableCell>
                {category.slug}
              </TableCell>

              <TableCell>
                <Badge
                  className={
                    category.is_active
                      ? "bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft"
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                  }
                >
                  {category.is_active
                    ? "Active"
                    : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell>
                {category.display_order}
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
                    <DropdownMenuItem
                      onClick={() => onEdit(category)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => onDelete(category.id)}
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