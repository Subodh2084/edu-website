import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getContactMessageById } from "@/lib/queries/admin";

interface ContactMessageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusStyles = {
  new: "bg-leaf-green/10 text-leaf-green-dark",
  read: "bg-leaf-soft text-leaf-navy",
  replied: "bg-blue-50 text-blue-700",
  closed: "bg-gray-100 text-gray-600",
};

export default async function ContactMessageDetailPage({
  params,
}: ContactMessageDetailPageProps) {
  const { id } = await params;

  const message = await getContactMessageById(id);

  if (!message) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Link href="/admin/contact-messages">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-semibold text-leaf-navy">
            Contact Message
          </h1>
          <p className="text-sm text-leaf-muted">
            View the complete message details.
          </p>
        </div>
      </div>
      <Card className="border-leaf-border shadow-2xl">
        <CardHeader className="border-b-2 border-leaf-border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-leaf-navy">
                {message.subject || "No subject"}
              </h2>

              <p className="mt-1 text-sm text-leaf-muted">
                Received{" "}
                {new Date(message.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <Badge
              variant="secondary"
              className={statusStyles[message.status]}
            >
              {message.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-leaf-muted">
                Name
              </p>
              <p className="mt-1 font-medium text-leaf-navy">
                {message.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-leaf-muted">
                Email
              </p>
              <a
                href={`mailto:${message.email}`}
                className="mt-1 flex items-center gap-2 text-sm text-leaf-navy hover:text-leaf-green-dark"
              >
                <Mail className="size-4" />
                {message.email}
              </a>
            </div>

            {message.phone && (
              <div>
                <p className="text-xs font-medium uppercase text-leaf-muted">
                  Phone
                </p>
                <a
                  href={`tel:${message.phone}`}
                  className="mt-1 flex items-center gap-2 text-sm text-leaf-navy hover:text-leaf-green-dark"
                >
                  <Phone className="size-4" />
                  {message.phone}
                </a>
              </div>
            )}
          </div>
          <div className="border-t-2 border-leaf-border pt-6">
            <p className="mb-3 text-xs font-medium uppercase text-leaf-muted">
              Message
            </p>

            <p className="whitespace-pre-wrap text-sm leading-7 text-leaf-text">
              {message.message}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}