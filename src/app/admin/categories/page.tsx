"use client";

import { useEffect, useState } from "react";

import CategoryHeader from "@/components/admin/categories/CategoriesHeader";
import CategoryTable from "@/components/admin/categories/CategoriesTable";
import CategoryForm from "@/components/admin/categories/CategoriesForm";
import { Category } from "@/types/category";
import { getCategories, saveCategory, deleteCategory } from "@/lib/queries/admin";
import { initialCategories } from "@/data/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch live categories from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getCategories()
      .then((data) => {
        if (isMounted && data.length > 0) setCategories(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setErrorMsg(null);
    const success = await deleteCategory(id);
    if (success) {
      setCategories((current) => current.filter((c) => c.id !== id));
    } else {
      setErrorMsg("Failed to delete category. It may be in use by existing courses.");
    }
  };

  const handleSave = async (categoryData: Omit<Category, "id">) => {
    setErrorMsg(null);
    const payload = editingCategory
      ? { ...categoryData, id: editingCategory.id }
      : categoryData;

    const saved = await saveCategory(payload as Category & { name: string });

    if (!saved) {
      setErrorMsg("Failed to save category. Please try again.");
      return false;
    }

    if (editingCategory) {
      setCategories((current) =>
        current.map((c) => (c.id === editingCategory.id ? saved : c))
      );
    } else {
      setCategories((current) => [...current, saved]);
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <CategoryHeader onAdd={handleAdd} />

      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="rounded-md border border-leaf-border bg-white p-8 text-center text-sm text-leaf-muted">
          Loading categories…
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryForm
        open={open}
        onOpenChange={setOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}