"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/queries/contact";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  subject: z.string().min(3, "Please enter a subject."),
  inquiryType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmitSuccess(false);

    try {
      const fullSubject = data.inquiryType
        ? `[${data.inquiryType}] ${data.subject}`
        : data.subject;

      await submitContactMessage({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: fullSubject,
        message: data.message,
      });

      setSubmitSuccess(true);
      form.reset();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {submitSuccess && (
        <div className="flex items-center gap-3 rounded-md bg-green-50 p-4 text-green-800 border border-green-200">
          <CheckCircle2 className="size-5 shrink-0 text-green-600" />
          <p className="text-sm font-medium">
            Thank you! Your message has been sent successfully. We will get back to you shortly.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-md bg-red-50 p-4 text-red-800 border border-red-200">
          <AlertCircle className="size-5 shrink-0 text-red-600" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-leaf-navy"
          >
            Full Name
          </label>

          <Input
            id="fullName"
            placeholder="Enter your full name"
            disabled={isSubmitting}
            {...form.register("fullName")}
          />

          {form.formState.errors.fullName && (
            <p className="text-sm text-red-600">
              {form.formState.errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-leaf-navy">
            Email Address
          </label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isSubmitting}
            {...form.register("email")}
          />

          {form.formState.errors.email && (
            <p className="text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-leaf-navy">
            Phone Number
          </label>

          <Input
            id="phone"
            type="tel"
            placeholder="+977 98XXXXXXXX"
            disabled={isSubmitting}
            {...form.register("phone")}
          />

          {form.formState.errors.phone && (
            <p className="text-sm text-red-600">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-leaf-navy">
          Subject
        </label>

        <Input
          id="subject"
          placeholder="How can we help you?"
          disabled={isSubmitting}
          {...form.register("subject")}
        />

        {form.formState.errors.subject && (
          <p className="text-sm text-red-600">
            {form.formState.errors.subject.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-leaf-navy">
          Message
        </label>

        <Textarea
          id="message"
          placeholder="Tell us more about your inquiry..."
          className="min-h-36 resize-none"
          disabled={isSubmitting}
          {...form.register("message")}
        />

        {form.formState.errors.message && (
          <p className="text-sm text-red-600">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-6 bg-leaf-green-dark text-white hover:bg-leaf-green-dark/90 transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
