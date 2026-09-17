"use client";

import { useState } from "react";

import CategoryHeader from "@/components/admin/categories/CategoriesHeader";
import CategoryTable from "@/components/admin/categories/CategoriesTable";
import CategoryForm from "@/components/admin/categories/CategoriesForm";
import { Category } from "@/types/category";

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description:
      "Learn modern technologies for building websites and web applications.",
    image: null,
    is_active: true,
    display_order: 1,
  },
  {
    id: "2",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Learn modern UI and UX design principles.",
    image: null,
    is_active: true,
    display_order: 2,
  },
  {
    id: "3",
    name: "Programming",
    slug: "programming",
    description: "Learn programming languages and development concepts.",
    image: null,
    is_active: true,
    display_order: 3,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [open, setOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories((current) =>
      current.filter((category) => category.id !== id),
    );
  };

  const handleSave = (categoryData: Omit<Category, "id">) => {
    if (editingCategory) {
      setCategories((current) =>
        current.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, ...categoryData }
            : cat,
        ),
      );
    } else {
      const newCategory: Category = {
        id: String(Date.now()),
        ...categoryData,
      };
      setCategories((current) => [...current, newCategory]);
    }
  };

  return (
    <div className="space-y-6">
      <CategoryHeader onAdd={handleAdd} />

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryForm
        open={open}
        onOpenChange={setOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}