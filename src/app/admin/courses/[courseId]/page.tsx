import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseOverview from "@/components/admin/courses/CourseOverview";
import CourseOutcomes from "@/components/admin/courses/CourseOutcomes";
import CourseRequirements from "@/components/admin/courses/CourseRequirements";
import CourseAudience from "@/components/admin/courses/CourseAudience";
import CourseProjects from "@/components/admin/courses/CourseProjects";
import CourseCurriculum from "@/components/admin/courses/CourseCurriculam";

export default async function CourseManagementPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-leaf-navy">
            React Development
          </h1>

          <Badge className="bg-leaf-soft text-leaf-green-dark hover:bg-leaf-soft">
            Published
          </Badge>
        </div>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage course content, curriculum, instructors and reviews.
        </p>

        <p className="mt-1 text-xs text-leaf-muted">
          Course ID: {courseId}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-leaf-muted">Level</p>
              <p className="font-medium text-leaf-navy">
                Intermediate
              </p>
            </div>

            <div>
              <p className="text-sm text-leaf-muted">Duration</p>
              <p className="font-medium text-leaf-navy">
                3 Months
              </p>
            </div>

            <div>
              <p className="text-sm text-leaf-muted">Price</p>
              <p className="font-medium text-leaf-navy">
                NPR 15,000
              </p>
            </div>

            <div>
              <p className="text-sm text-leaf-muted">Language</p>
              <p className="font-medium text-leaf-navy">
                English
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full flex flex-col">
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="audience">Target Audience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
            </CardHeader>
            <CardContent>
               <CourseOverview courseId={courseId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum</CardTitle>
            </CardHeader>

            <CardContent>
              <CourseCurriculum/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes">
          <Card>
            <CardHeader>
              <CardTitle>Course Outcomes</CardTitle>
            </CardHeader>

            <CardContent>
               <CourseOutcomes/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>

            <CardContent>
               <CourseRequirements/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
            </CardHeader>

            <CardContent>
               <CourseAudience/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>

            <CardContent>
                <CourseProjects/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}