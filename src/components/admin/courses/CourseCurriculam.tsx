"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

import {
  deleteCourseLesson,
  deleteCourseSection,
  getCourseById,
  getCourseCurriculum,
  saveCourseLesson,
  saveCourseSection,
  uploadCoursePdf,
} from "@/lib/queries/admin";

const sectionSchema = z.object({
  title: z.string().min(3, "Section title must be at least 3 characters"),
  description: z.string().optional(),
});

const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  description: z.string().optional(),
  video_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  pdf_url: z.string().optional(),
  duration: z.string().optional(),
});

type SectionFormValues = z.infer<typeof sectionSchema>;
type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonItem {
  id: string;
  title: string;
  description?: string;
  video_url?: string;
  pdf_url?: string;
  duration?: string;
}

interface SectionItem {
  id: string;
  title: string;
  description?: string;
  lessons: LessonItem[];
}

export default function CourseCurriculum({ courseId }: { courseId: string }) {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [deleteSectionId, setDeleteSectionId] = useState<string | null>(null);
  const [deleteLessonId, setDeleteLessonId] = useState<string | null>(null);

  const loadCurriculum = async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await getCourseCurriculum(courseId);
      const mapped: SectionItem[] = (data || []).map((sec: any) => ({
        id: sec.id,
        title: sec.title,
        description: sec.description || "",
        lessons: (sec.lessons || []).map((les: any) => ({
          id: les.id,
          title: les.title,
          description: les.description || "",
          video_url: les.video_url || "",
          pdf_url: les.pdf_url || "",
          duration: les.duration || "",
        })),
      }));

      setSections(mapped);
      setExpandedSections(mapped.map((s) => s.id));
    } catch (err) {
      console.error("Failed to load curriculum:", err);
    } finally {
      setLoading(false);
    }
  };

  const [coursePdf, setCoursePdf] = useState<string | null>(null);
  const [uploadingCoursePdf, setUploadingCoursePdf] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    getCourseById(courseId).then((c: any) => {
      if (c?.syllabus_pdf_url || c?.pdf_url) {
        setCoursePdf(c.syllabus_pdf_url || c.pdf_url);
      }
    });
  }, [courseId]);

  const handleCoursePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCoursePdf(true);
    try {
      const url = await uploadCoursePdf(courseId, file);
      if (url) setCoursePdf(url);
    } catch (err) {
      console.error("Failed to upload course PDF:", err);
    } finally {
      setUploadingCoursePdf(false);
    }
  };

  useEffect(() => {
    loadCurriculum();
  }, [courseId]);

  const {
    register: registerSection,
    handleSubmit: handleSectionSubmit,
    reset: resetSection,
    setValue: setSectionValue,
    formState: { errors: sectionErrors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    register: registerLesson,
    handleSubmit: handleLessonSubmit,
    reset: resetLesson,
    setValue: setLessonValue,
    formState: { errors: lessonErrors },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      pdf_url: "",
      duration: "",
    },
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };

  const handleAddSection = () => {
    setEditingSection(null);
    resetSection({ title: "", description: "" });
    setSectionDialogOpen(true);
  };

  const handleEditSection = (id: string) => {
    const section = sections.find((item) => item.id === id);
    if (!section) return;

    setEditingSection(id);
    setSectionValue("title", section.title);
    setSectionValue("description", section.description || "");
    setSectionDialogOpen(true);
  };

  const onSectionSubmit = async (data: SectionFormValues) => {
    setSubmitting(true);
    try {
      await saveCourseSection(courseId, {
        id: editingSection || undefined,
        title: data.title,
        description: data.description,
      });
      await loadCurriculum();
      resetSection();
      setEditingSection(null);
      setSectionDialogOpen(false);
    } catch (err) {
      console.error("Failed to save section:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddLesson = (sectionId: string) => {
    setSelectedSection(sectionId);
    setEditingLesson(null);
    resetLesson({ title: "", description: "", video_url: "", pdf_url: "", duration: "" });
    setLessonDialogOpen(true);
  };

  const handleEditLesson = (sectionId: string, lessonId: string) => {
    const section = sections.find((item) => item.id === sectionId);
    const lesson = section?.lessons.find((item) => item.id === lessonId);
    if (!lesson) return;

    setSelectedSection(sectionId);
    setEditingLesson(lessonId);

    setLessonValue("title", lesson.title);
    setLessonValue("description", lesson.description || "");
    setLessonValue("video_url", lesson.video_url || "");
    setLessonValue("pdf_url", lesson.pdf_url || "");
    setLessonValue("duration", lesson.duration || "");

    setLessonDialogOpen(true);
  };

  const onLessonSubmit = async (data: LessonFormValues) => {
    if (!selectedSection) return;
    setSubmitting(true);
    try {
      await saveCourseLesson(selectedSection, {
        id: editingLesson || undefined,
        title: data.title,
        description: data.description,
        video_url: data.video_url,
        pdf_url: data.pdf_url,
        duration: data.duration,
      });
      await loadCurriculum();
      resetLesson();
      setEditingLesson(null);
      setSelectedSection(null);
      setLessonDialogOpen(false);
    } catch (err) {
      console.error("Failed to save lesson:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSection = async () => {
    if (!deleteSectionId) return;
    setSubmitting(true);
    try {
      await deleteCourseSection(deleteSectionId);
      await loadCurriculum();
      setDeleteSectionId(null);
    } catch (err) {
      console.error("Failed to delete section:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLesson = async () => {
    if (!deleteLessonId) return;
    setSubmitting(true);
    try {
      await deleteCourseLesson(deleteLessonId);
      await loadCurriculum();
      setDeleteLessonId(null);
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">Course Curriculum</CardTitle>
          <p className="mt-1 text-sm text-leaf-muted">
            Organize sections, lessons, and PDF materials for this course.
          </p>
        </div>

        <Button
          onClick={handleAddSection}
          className="w-fit bg-leaf-green-dark text-white hover:bg-leaf-green"
        >
          <Plus className="size-4" />
          Add Section
        </Button>
      </CardHeader>

      <CardContent>
        {/* Course PDF Document Upload */}
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 border border-red-200">
              <FileText className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-leaf-navy">Course Syllabus PDF Document</h4>
              <p className="text-xs text-leaf-muted">
                Upload 1 official PDF document for this course for students to view or download.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {coursePdf && (
              <a
                href={coursePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-white border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors shadow-sm"
              >
                <FileText className="size-4 text-red-600" />
                View PDF
              </a>
            )}

            <label className="relative inline-flex items-center justify-center gap-2 rounded-md bg-leaf-navy px-4 py-2 text-xs font-semibold text-white hover:bg-leaf-navy/90 transition-colors cursor-pointer shadow-sm">
              {uploadingCoursePdf ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Uploading PDF...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  {coursePdf ? "Change Course PDF" : "Upload Course PDF"}
                </>
              )}
              <input
                type="file"
                accept=".pdf,application/pdf"
                disabled={uploadingCoursePdf}
                onChange={handleCoursePdfUpload}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-leaf-muted">
            <Loader2 className="size-6 animate-spin mr-2" />
            Loading curriculum...
          </div>
        ) : sections.length === 0 ? (
          <div className="py-8 text-center text-sm text-leaf-muted border rounded-md border-dashed">
            No sections created yet. Click "Add Section" to create your first course section.
          </div>
        ) : (
          <div className="space-y-3">
            {sections.map((section, index) => {
              const isExpanded = expandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="rounded-md border border-leaf-border"
                >
                  {/* Section Row */}
                  <div className="flex items-start gap-3 p-3">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="mt-1 text-leaf-muted"
                    >
                      {isExpanded ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronRight className="size-4" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-leaf-navy">
                        Section {index + 1}: {section.title}
                      </h3>

                      {section.description && (
                        <p className="mt-1 text-sm text-leaf-muted">
                          {section.description}
                        </p>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-leaf-muted"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="bg-leaf-bg">
                        <DropdownMenuItem
                          onClick={() => handleEditSection(section.id)}
                        >
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setDeleteSectionId(section.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Lessons */}
                  {isExpanded && (
                    <div className="border-t border-leaf-border px-3 py-3">
                      <div className="space-y-2 pl-7">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-start gap-3 rounded-md border border-leaf-border p-3"
                          >
                            <span className="text-sm font-medium text-leaf-muted">
                              {lessonIndex + 1}.
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-leaf-navy">
                                  {lesson.title}
                                </p>
                              </div>

                              {lesson.description && (
                                <p className="mt-1 text-sm text-leaf-muted">
                                  {lesson.description}
                                </p>
                              )}

                              {lesson.duration && (
                                <p className="mt-1 text-xs text-leaf-muted">
                                  {lesson.duration}
                                </p>
                              )}
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 text-leaf-muted"
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
                                  onClick={() =>
                                    handleEditLesson(section.id, lesson.id)
                                  }
                                >
                                  <Pencil className="size-4" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => setDeleteLessonId(lesson.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="size-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          onClick={() => handleAddLesson(section.id)}
                          className="mt-2"
                        >
                          <Plus className="size-4" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Section Dialog */}
      <Dialog
        open={sectionDialogOpen}
        onOpenChange={(value) => {
          setSectionDialogOpen(value);
          if (!value) {
            resetSection();
            setEditingSection(null);
          }
        }}
      >
        <DialogContent className="bg-leaf-bg">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Course Section" : "Add Course Section"}
            </DialogTitle>
            <DialogDescription>
              {editingSection
                ? "Update this course section."
                : "Add a new section to the course curriculum."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSectionSubmit(onSectionSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="section-title"
                className="text-sm font-medium text-leaf-navy"
              >
                Section Title
              </label>
              <Input
                id="section-title"
                placeholder="e.g. Introduction to React"
                {...registerSection("title")}
              />
              {sectionErrors.title && (
                <p className="text-sm text-red-500">
                  {sectionErrors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="section-description"
                className="text-sm font-medium text-leaf-navy"
              >
                Description
              </label>
              <Textarea
                id="section-description"
                placeholder="Describe what this section covers..."
                rows={4}
                {...registerSection("description")}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSectionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                {editingSection ? "Save Changes" : "Add Section"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog
        open={lessonDialogOpen}
        onOpenChange={(value) => {
          setLessonDialogOpen(value);
          if (!value) {
            resetLesson();
            setEditingLesson(null);
            setSelectedSection(null);
          }
        }}
      >
        <DialogContent className="bg-leaf-bg max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? "Edit Course Lesson" : "Add Course Lesson"}
            </DialogTitle>
            <DialogDescription>
              {editingLesson
                ? "Update this lesson details or attached materials."
                : "Add a new lesson to this section."}
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleLessonSubmit(onLessonSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label
                htmlFor="lesson-title"
                className="text-sm font-medium text-leaf-navy"
              >
                Lesson Title
              </label>
              <Input
                id="lesson-title"
                placeholder="e.g. React Fundamentals & Setup"
                {...registerLesson("title")}
              />
              {lessonErrors.title && (
                <p className="text-sm text-red-500">
                  {lessonErrors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lesson-description"
                className="text-sm font-medium text-leaf-navy"
              >
                Description
              </label>
              <Textarea
                id="lesson-description"
                placeholder="Describe what students will learn..."
                rows={3}
                {...registerLesson("description")}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="video-url"
                className="text-sm font-medium text-leaf-navy"
              >
                Video URL (Optional)
              </label>
              <Input
                id="video-url"
                placeholder="https://..."
                {...registerLesson("video_url")}
              />
              {lessonErrors.video_url && (
                <p className="text-sm text-red-500">
                  {lessonErrors.video_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="duration"
                className="text-sm font-medium text-leaf-navy"
              >
                Duration
              </label>
              <Input
                id="duration"
                placeholder="e.g. 30 min"
                {...registerLesson("duration")}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLessonDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                {editingLesson ? "Save Changes" : "Add Lesson"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Section Dialog */}
      <AlertDialog
        open={!!deleteSectionId}
        onOpenChange={(value) => {
          if (!value) setDeleteSectionId(null);
        }}
      >
        <AlertDialogContent className="border-leaf-border bg-leaf-bg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this section?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The section and its lessons will be
              removed from this course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSection}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Lesson Dialog */}
      <AlertDialog
        open={!!deleteLessonId}
        onOpenChange={(value) => {
          if (!value) setDeleteLessonId(null);
        }}
      >
        <AlertDialogContent className="border-leaf-border bg-leaf-bg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this lesson?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This lesson will be removed from the
              course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLesson}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
