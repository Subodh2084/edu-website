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
  pdf_url?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];

}
   
interface CourseCurriculumProps {
  sections: Section[];
}

export default function CourseCurriculum({
  sections,
}: CourseCurriculumProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            Course Curriculum
          </h2>

          <p className="mt-2 text-sm text-leaf-muted">
            Explore the lessons and topics included in this course.
          </p>
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
                <div className="space-y-1 border-t border-leaf-border pt-2">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-4 rounded-md px-2 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <FileText className="size-4 shrink-0 text-leaf-green-dark" />
                         <Accordion>
                          <AccordionItem>
                            <AccordionTrigger className="text-left hover:no-underline">
                               <span className="text-sm text-leaf-text">
                               {lesson.title}
                        </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              {lesson.description}
                            </AccordionContent>

                         
                          </AccordionItem>
                         
                         </Accordion>
                         
                        
                        
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {lesson.pdf_url && (
                          <a
                            href={lesson.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-red-50 border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                            title="View PDF Document"
                          >
                            <FileText className="size-3.5 text-red-600" />
                            View PDF
                          </a>
                        )}
                        <span className="shrink-0 text-xs text-leaf-muted">
                          {lesson.duration}
                        </span>
                      </div>
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