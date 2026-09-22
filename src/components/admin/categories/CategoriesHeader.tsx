import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
  onAdd: () => void;
}

export default function CategoryHeader({
  onAdd,
}: CategoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Categories
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage the categories used to organize your courses.
        </p>
      </div>

      <Button
        onClick={onAdd}
        className="w-fit bg-leaf-green-dark text-white hover:bg-leaf-green"
      >
        <Plus className="size-4" />
        Add Category
      </Button>
    </div>
  );
}