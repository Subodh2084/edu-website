"use client";

import { useEffect, useMemo, useState } from "react";

import CourseFilters from "@/components/admin/courses/CourseFilter";
import CourseHeader from "@/components/admin/courses/CourseHeader";
import CourseTable from "@/components/admin/courses/CourseTable";

import {
  deleteCourse,
  getAdminCourses,
  type AdminCourseItem,
} from "@/lib/queries/admin";

export default function CoursesPage() {
  const [courses, setCourses] = useState<AdminCourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [level, setLevel] = useState("all");

  const loadCourses = async () => {
    setLoading(true);

    const data = await getAdminCourses();

    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        (course.category_name || "").toLowerCase().includes(query);

      const matchesStatus =
        status === "all" || course.status === status;

      const matchesLevel =
        level === "all" || course.level === level;

      return matchesSearch && matchesStatus && matchesLevel;
    });
  }, [courses, search, status, level]);

  const handleDelete = async (id: string) => {
    const success = await deleteCourse(id);

    if (success) {
      setCourses((current) =>
        current.filter((course) => course.id !== id),
      );
    } else {
      window.alert("Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <CourseHeader />

      <CourseFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        level={level}
        onLevelChange={setLevel}
      />

      <CourseTable
        courses={filteredCourses}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}