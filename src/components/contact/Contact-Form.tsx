"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),

  email: z.string().email("Please enter a valid email address."),

  phone: z.string().min(7, "Please enter a valid phone number."),

  subject: z.string().min(3, "Please enter a subject."),

  inquiryType: z.string().min(1, "Please select an inquiry type."),

  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
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

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        className="w-full p-6 bg-leaf-green-dark text-white hover:bg-leaf-green-dark/90"
      >
        Send Message
      </Button>
    </form>
  );
}
