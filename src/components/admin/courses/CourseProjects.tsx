"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

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

const projectSchema = z.object({
  title: z.string().min(3, "Project title must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  technologies: z.string().min(1, "Please add at least one technology"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const initialProjects = [
  {
    id: "1",
    title: "E-Commerce Website",
    description:
      "Build a modern e-commerce website with product browsing, cart functionality, and a responsive user interface.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Create a task management application where users can organize, manage, and track their daily tasks.",
    technologies: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    id: "3",
    title: "Portfolio Website",
    description:
      "Design and develop a professional portfolio website to showcase projects, skills, and professional experience.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
];

export default function CourseProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
    },
  });

  const handleAdd = () => {
    setEditingProject(null);

    reset({
      title: "",
      description: "",
      technologies: "",
    });

    setOpen(true);
  };

  const handleEdit = (id: string) => {
    const selectedProject = projects.find((item) => item.id === id);

    if (!selectedProject) return;

    setEditingProject(id);

    setValue("title", selectedProject.title);
    setValue("description", selectedProject.description);
    setValue("technologies", selectedProject.technologies.join(", "));

    setOpen(true);
  };

  const onSubmit = (data: ProjectFormValues) => {
    const technologies = data.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    if (editingProject) {
      setProjects((current) =>
        current.map((item) =>
          item.id === editingProject
            ? {
                ...item,
                title: data.title,
                description: data.description,
                technologies,
              }
            : item,
        ),
      );
    } else {
      setProjects((current) => [
        ...current,
        {
          id: Date.now().toString(),
          title: data.title,
          description: data.description,
          technologies,
        },
      ]);
    }

    reset();
    setEditingProject(null);
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-leaf-navy">Course Projects</CardTitle>

          <p className="mt-1 text-sm text-leaf-muted">
            Manage the projects students will build during this course.
          </p>
        </div>

        <Button
          onClick={handleAdd}
          className="w-fit bg-leaf-green-dark text-white hover:bg-leaf-green"
        >
          <Plus className="size-4" />
          Add Project
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex items-start gap-3 rounded-md border border-leaf-border p-3"
            >
              <span className="text-sm font-medium text-leaf-muted">
                {index + 1}.
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-leaf-navy">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-leaf-muted">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <Badge
                      key={technology}
                      variant="outline"
                      className="border-leaf-border text-leaf-navy"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
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
                  <DropdownMenuItem onClick={() => handleEdit(project.id)}>
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setDeleteId(project.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Add / Edit Dialog */}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            reset();
            setEditingProject(null);
          }
        }}
      >
        <DialogContent className="bg-leaf-bg">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Course Project" : "Add Course Project"}
            </DialogTitle>

            <DialogDescription>
              {editingProject
                ? "Update this course project."
                : "Add a project that students will build during the course."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Project Title */}

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-leaf-navy"
              >
                Project Title
              </label>

              <Input
                id="title"
                placeholder="e.g. E-Commerce Website"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-leaf-navy"
              >
                Description
              </label>

              <Textarea
                id="description"
                placeholder="Describe what students will build..."
                rows={4}
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Technologies */}

            <div className="space-y-2">
              <label
                htmlFor="technologies"
                className="text-sm font-medium text-leaf-navy"
              >
                Tech Stack
              </label>

              <Input
                id="technologies"
                placeholder="e.g. React, TypeScript, Tailwind CSS"
                {...register("technologies")}
              />

              <p className="text-xs text-leaf-muted">
                Separate technologies with commas.
              </p>

              {errors.technologies && (
                <p className="text-sm text-red-500">
                  {errors.technologies.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-leaf-green-dark text-white hover:bg-leaf-green"
              >
                {editingProject ? "Save Changes" : "Add Project"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(value) => {
          if (!value) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent className="border-leaf-border bg-leaf-bg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This project will be removed from
              this course.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (!deleteId) return;

                setProjects((current) =>
                  current.filter((item) => item.id !== deleteId),
                );

                setDeleteId(null);
              }}
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
