import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

interface CourseProjectsProps {
  projects: CourseProject[];
}

export default function CourseProjects({
  projects,
}: CourseProjectsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            Projects You'll Build
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-leaf-muted">
            Put your skills into practice by building real-world projects.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-leaf-border shadow-xl border-1 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-lg text-leaf-navy">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-leaf-text">
                  {project.description}
                </p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-leaf-muted">
                    Tech Stack
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((technology) => (
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}