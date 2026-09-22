import { Mail } from "lucide-react";

export default function ContactMessageHeader() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-leaf-soft text-leaf-green-dark">
        <Mail className="size-5" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-leaf-navy">
          Contact Messages
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage messages and inquiries submitted through the website.
        </p>
      </div>
    </div>
  );
}