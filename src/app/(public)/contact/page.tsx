"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/contact/Contact-Form";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getSiteSettings } from "@/lib/queries/admin";
import type { SiteSettings } from "@/types/site-settings";

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const email = settings?.email || "info@leafclutchtech.com.np";
  const phone = settings?.phone || "+977-9766715768";
  const whatsapp = settings?.whatsapp || "+9779800000000";
  const address = settings?.address || "Siddharthanagar, Rupandehi, Nepal";
  const officeHours = settings?.office_hours || "Sunday – Friday: 10:00 AM – 6:00 PM";

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: (
        <a
          href={`mailto:${email}`}
          className="transition-colors hover:text-leaf-green-dark"
        >
          {email}
        </a>
      ),
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: <p>{address}</p>,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: (
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="transition-colors hover:text-leaf-green-dark"
        >
          {phone}
        </a>
      ),
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: <p>{officeHours}</p>,
    },
  ];

  return (
    <main>
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-leaf-soft px-4 py-2 text-xs font-semibold tracking-[0.15em] text-leaf-green-dark">
              CONTACT US
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl lg:text-5xl">
              Let&apos;s start a conversation
            </h1>

            <p className="mt-4 text-base leading-7 text-leaf-text">
              Have a question about our courses, training programs, or
              internships? Get in touch with our team.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            {/* Contact Information */}
            <div className="rounded-2xl p-7 bg-leaf-bg text-leaf-navy sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-wider text-leaf-navy">
                Contact Information
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                We&apos;d love to hear from you
              </h2>

              <p className="mt-4 text-sm leading-7">
                Reach out through any of these channels and our team will get
                back to you as soon as possible.
              </p>
              <div className="mt-10 space-y-7">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl text-leaf-green-dark">
                        <Icon className="size-6" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold">
                          {item.title}
                        </h3>

                        <div className="mt-1 text-sm leading-6">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 flex items-center justify-center p-3 gap-3 rounded-xl border bg-leaf-green-dark text-white hover:bg-leaf-green transition-colors"
                >
                  <FaWhatsapp className="size-5 text-white" />
                  Chat with us on WhatsApp
                </a>
              )}
            </div>
            <div className="rounded-2xl border border-leaf-border bg-white p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-leaf-navy text-center">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm leading-6 text-leaf-muted text-center">
                Fill out the form below and we&apos;ll get back to you.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}