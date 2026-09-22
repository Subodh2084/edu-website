import { FileText } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];

}
   
interface CourseCurriculumProps {
  sections: Section[];
  pdf_url?: string;
}

export default function CourseCurriculum({
  sections,
  pdf_url,
}: CourseCurriculumProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
              Course Curriculum
            </h2>

            <p className="mt-2 text-sm text-leaf-muted">
              Explore the lessons and topics included in this course.
            </p>
          </div>

          {pdf_url && (
            <a
              href={pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-colors shrink-0 w-fit"
            >
              <FileText className="size-4 text-white" />
              Download Syllabus (PDF)
            </a>
          )}
        </div>

   
        <Accordion className="w-full">
          {sections.map((section, index) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="mb-3 rounded-lg border border-leaf-border bg-white px-5 last:mb-0"
            >
              <AccordionTrigger className="py-5 text-left hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-leaf-navy">
                    {index + 1}
                  </span>

                  <span className="font-semibold text-leaf-navy">
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4">
                <div className="space-y-2 border-t border-leaf-border pt-3">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-leaf-border/60 bg-white p-3.5 hover:border-leaf-green/40 transition-colors"
                    >
                      <div className="flex min-w-0 items-start sm:items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-leaf-soft text-leaf-green-dark">
                          <FileText className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <span className="text-sm font-semibold text-leaf-navy">
                            {lesson.title}
                          </span>

                          {lesson.description && (
                            <p className="mt-1 text-xs text-leaf-muted leading-relaxed">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {lesson.duration && (
                        <span className="shrink-0 text-xs font-medium text-leaf-muted sm:text-right">
                          {lesson.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}