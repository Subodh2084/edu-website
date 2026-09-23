"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Clock, Mail, MapPinIcon, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/queries/admin";
import { initialSiteSettings } from "@/data/site-settings";
import { courses as initialCourses } from "@/data/courses";
import { getPopularCourses, getFeaturedCourses } from "@/lib/queries/courses";
import type { SiteSettings } from "@/types/site-settings";
import type { Course } from "@/types/course";

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [popularCourses, setPopularCourses] = useState<Course[]>(() =>
    initialCourses.filter((c) => c.popular)
  );
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>(() =>
    initialCourses.filter((c) => c.featured)
  );

  useEffect(() => {
    let isMounted = true;
    getSiteSettings().then((data) => {
      if (data && isMounted) {
        setSettings((prev) => ({
          ...prev,
          ...data,
          social_media_links: {
            ...prev.social_media_links,
            ...(data.social_media_links || {}),
          },
        }));
      }
    });
    getPopularCourses().then((data) => {
      if (data && data.length > 0 && isMounted) {
        setPopularCourses(data);
      }
    });

    // Fetch featured courses
    getFeaturedCourses().then((data) => {
      if (data && data.length > 0 && isMounted) {
        setFeaturedCourses(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const companyName = settings.company_name || initialSiteSettings.company_name;
  const logo = settings.logo || initialSiteSettings.logo;
  const email = settings.email || initialSiteSettings.email;
  const phone = settings.phone || initialSiteSettings.phone;
  const whatsapp = settings.whatsapp || initialSiteSettings.whatsapp;
  const address = settings.address || initialSiteSettings.address;
  const googleMapsUrl = settings.google_maps_url || initialSiteSettings.google_maps_url;
  const officeHours = settings.office_hours || initialSiteSettings.office_hours;
  const footerDesc =
    settings.footer_description ||
    initialSiteSettings.footer_description ||
    "Empowering students with practical tech skills for modern careers.";
  const copyright =
    settings.copyright_text ||
    initialSiteSettings.copyright_text ||
    `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

  // Parse social media links safely whether stored as object or JSON string
  let socials: Record<string, string> = {};
  if (typeof settings.social_media_links === "string") {
    try {
      socials = JSON.parse(settings.social_media_links);
    } catch {
      socials = {};
    }
  } else if (settings.social_media_links && typeof settings.social_media_links === "object") {
    socials = settings.social_media_links;
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="footer-logo" aria-label={`${companyName} Home`}>
                <Image
                  src={logo || "/companyLogo/companyLogo.png"}
                  alt={companyName}
                  width={50}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                  className="footer-logo-img"
                  unoptimized={
                    Boolean(
                      logo?.startsWith("blob:") ||
                      logo?.startsWith("data:") ||
                      logo?.startsWith("http")
                    )
                  }
                />
              </Link>

              {footerDesc && <p className="footer-brand-desc">{footerDesc}</p>}

              <div className="footer-contact-info">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="footer-contact-item"
                    title={`Email ${email}`}
                  >
                    <Mail className="size-4 shrink-0" />
                    <span>{email}</span>
                  </a>
                )}

                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="footer-contact-item"
                    title={`Call ${phone}`}
                  >
                    <Phone className="size-4 shrink-0" />
                    <span>{phone}</span>
                  </a>
                )}

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                    title={`Chat on WhatsApp: ${whatsapp}`}
                  >
                    <FaWhatsapp className="size-4 shrink-0 text-[#25D366]" />
                    <span>{whatsapp}</span>
                  </a>
                )}

                {address && (
                  googleMapsUrl ? (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact-item"
                      title="View location on Google Maps"
                    >
                      <MapPinIcon className="size-4 shrink-0" />
                      <span>{address}</span>
                    </a>
                  ) : (
                    <div className="footer-contact-item">
                      <MapPinIcon className="size-4 shrink-0" />
                      <span>{address}</span>
                    </div>
                  )
                )}

                {officeHours && (
                  <div className="footer-contact-item" title="Office Hours">
                    <Clock className="size-4 shrink-0" />
                    <span>{officeHours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Company Column */}
            <div className="footer-col">
              <h4>Company</h4>

              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Popular Courses Column */}
            <div className="footer-col">
              <h4>Popular Courses</h4>

              <ul>
                {popularCourses.map((course) => (
                  <li key={`pop-${course.id || course.slug}`}>
                    <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Courses Column */}
            <div className="footer-col">
              <h4>Featured Courses</h4>

              <ul>
                {featuredCourses.map((course) => (
                  <li key={`feat-${course.id || course.slug}`}>
                    <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Column */}
            <div className="footer-col">
              <h4>Social Links</h4>

              <div className="footer-socials">
                {socials.facebook && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FaFacebookF className="size-4" />
                  </a>
                )}

                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <FaInstagram className="size-4" />
                  </a>
                )}

                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn className="size-4" />
                  </a>
                )}

                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <FaGithub className="size-4" />
                  </a>
                )}

                {socials.youtube && (
                  <a
                    href={socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <FaYoutube className="size-4" />
                  </a>
                )}

                {(socials.twitter || socials.x) && (
                  <a
                    href={socials.twitter || socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    title="Twitter / X"
                  >
                    <FaTwitter className="size-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>{copyright}</p>

            <div className="footer-bottom-links">
              <Link href="/contact">Contact</Link>
              <span className="footer-dot">·</span>
              <Link href="/admin">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}