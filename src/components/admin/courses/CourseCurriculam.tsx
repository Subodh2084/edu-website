"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
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

  duration: z.string().optional(),
});

type SectionFormValues = z.infer<typeof sectionSchema>;
type LessonFormValues = z.infer<typeof lessonSchema>;

const initialSections = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React and its core concepts.",
    lessons: [
      {
        id: "1-1",
        title: "What is React?",
        description: "Introduction to React and why it is used.",
        video_url: "",
        duration: "20 min",
      },
      {
        id: "1-2",
        title: "Components and JSX",
        description: "Understand components and JSX syntax.",
        video_url: "",
        duration: "30 min",
      },
    ],
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Learn how to manage state and side effects using hooks.",
    lessons: [
      {
        id: "2-1",
        title: "useState Hook",
        description: "Learn how to manage component state.",
        video_url: "",
        duration: "25 min",
      },
      {
        id: "2-2",
        title: "useEffect Hook",
        description: "Understand side effects in React applications.",
        video_url: "",
        duration: "30 min",
      },
    ],
  },
];

export default function CourseCurriculum() {
  const [sections, setSections] = useState(initialSections);

  const [expandedSections, setExpandedSections] = useState<string[]>(
    initialSections.map((section) => section.id),
  );

  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [deleteSectionId, setDeleteSectionId] = useState<string | null>(null);

  const [deleteLessonId, setDeleteLessonId] = useState<string | null>(null);

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
      duration: "",
    },
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId],
    );
  };

  const handleAddSection = () => {
    setEditingSection(null);

    resetSection({
      title: "",
      description: "",
    });

    setSectionDialogOpen(true);
  };

  const handleEditSection = (id: string) => {
    const section = sections.find((item) => item.id === id);

    if (!section) return;

    setEditingSection(id);

    setSectionValue("title", section.title);
    setSectionValue("description", section.description);

    setSectionDialogOpen(true);
  };

  const onSectionSubmit = (data: SectionFormValues) => {
    if (editingSection) {
      setSections((current) =>
        current.map((section) =>
          section.id === editingSection
            ? {
                ...section,
                title: data.title,
                description: data.description || "",
              }
            : section,
        ),
      );
    } else {
      setSections((current) => [
        ...current,
        {
          id: Date.now().toString(),
          title: data.title,
          description: data.description || "",
          lessons: [],
        },
      ]);
    }

    resetSection();
    setEditingSection(null);
    setSectionDialogOpen(false);
  };

  const handleAddLesson = (sectionId: string) => {
    setSelectedSection(sectionId);
    setEditingLesson(null);

    resetLesson({
      title: "",
      description: "",
      video_url: "",
      duration: "",
    });

    setLessonDialogOpen(true);
  };

  const handleEditLesson = (sectionId: string, lessonId: string) => {
    const section = sections.find((item) => item.id === sectionId);

    const lesson = section?.lessons.find((item) => item.id === lessonId);

    if (!lesson) return;

    setSelectedSection(sectionId);
    setEditingLesson(lessonId);

    setLessonValue("title", lesson.title);
    setLessonValue("description", lesson.description);
    setLessonValue("video_url", lesson.video_url);
    setLessonValue("duration", lesson.duration);

    setLessonDialogOpen(true);
  };

  const onLessonSubmit = (data: LessonFormValues) => {
    if (!selectedSection) return;

    setSections((current) =>
      current.map((section) => {
        if (section.id !== selectedSection) {
          return section;
        }

        if (editingLesson) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) =>
              lesson.id === editingLesson
                ? {
                    ...lesson,
                    title: data.title,
                    description: data.description || "",
                    video_url: data.video_url || "",
                    duration: data.duration || "",
                  }
                : lesson,
            ),
          };
        }

        return {
          ...section,
          lessons: [
            ...section.lessons,
            {
              id: Date.now().toString(),
              title: data.title,
              description: data.description || "",
              video_url: data.video_url || "",
              duration: data.duration || "",
            },
          ],
        };
      }),
    );

    resetLesson();
    setEditingLesson(null);
    setSelectedSection(null);
    setLessonDialogOpen(false);
  };

  const handleDeleteSection = () => {
    if (!deleteSectionId) return;

    setSections((current) =>
      current.filter((section) => section.id !== deleteSectionId),
    );

    setDeleteSectionId(null);
  };

  const handleDeleteLesson = () => {
    if (!deleteLessonId) return;

    setSections((current) =>
      current.map((section) => ({
        ...section,
        lessons: section.lessons.filter(
          (lesson) => lesson.id !== deleteLessonId,
        ),
      })),
    );

    setDeleteLessonId(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">Course Curriculum</CardTitle>

          <p className="mt-1 text-sm text-leaf-muted">
            Organize the sections and lessons included in this course.
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
        <div className="space-y-3">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);

            return (
              <div
                key={section.id}
                className="rounded-md border border-leaf-border"
              >
                {/* Section */}

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
                            <p className="text-sm font-medium text-leaf-navy">
                              {lesson.title}
                            </p>

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
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
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
        <DialogContent className="bg-leaf-bg">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? "Edit Course Lesson" : "Add Course Lesson"}
            </DialogTitle>

            <DialogDescription>
              {editingLesson
                ? "Update this lesson."
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
                placeholder="e.g. What is React?"
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
                rows={4}
                {...registerLesson("description")}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="video-url"
                className="text-sm font-medium text-leaf-navy"
              >
                Video URL
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

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLessonDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {editingLesson ? "Save Changes" : "Add Lesson"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Section */}

      <AlertDialog
        open={!!deleteSectionId}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteSectionId(null);
          }
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

      {/* Delete Lesson */}

      <AlertDialog
        open={!!deleteLessonId}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteLessonId(null);
          }
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
