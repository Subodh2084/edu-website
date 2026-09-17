import CourseFilters from "@/components/admin/courses/CourseFilter";
import CourseHeader from "@/components/admin/courses/CourseHeader";
import CourseTable from "@/components/admin/courses/CourseTable";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <CourseHeader />
      <CourseFilters/>
      <CourseTable />
    </div>
  );
}