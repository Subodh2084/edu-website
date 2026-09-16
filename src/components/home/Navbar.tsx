"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { getNavCourses } from "@/lib/queries/courses";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [courses, setCourses] = useState<{ label: string; href: string; description: string }[]>([]);

  useEffect(() => {
    getNavCourses().then((fetched) => {
      setCourses(fetched);
    });
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-border/70 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0"
          aria-label="Leafclutch Technologies home"
        >
          <Image
            src="/companyLogo/companyLogo.png"
            alt="Leafclutch Technologies"
            width={130}
            height={48}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, 2).map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? "text-leaf-navy" : "text-leaf-muted hover:text-leaf-navy"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-0 -bottom-[1px] mx-auto h-0.5 w-5 rounded-full bg-leaf-green-dark" />
                )}
              </Link>
            );
          })}

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsCoursesOpen((prev) => !prev)}
              className="flex items-center gap-1.5 py-2 text-sm font-medium text-leaf-muted transition-colors hover:text-leaf-navy"
              aria-expanded={isCoursesOpen}
            >
              Courses
              <ChevronDown
                className={`size-4 transition-transform duration-200 ${
                  isCoursesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isCoursesOpen && (
              <div className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3">
                <div className="rounded-xl border border-leaf-border bg-white p-2 shadow-[0_15px_40px_rgba(7,29,92,0.10)]">
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-leaf-green-dark">
                      Learn with Leafclutch
                    </p>
                    <p className="mt-1 text-sm text-leaf-muted">
                      Explore our popular courses.
                    </p>
                  </div>

                  <div className="space-y-1">
                    {courses.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="group block rounded-lg px-3 py-3 transition-colors hover:bg-leaf-soft"
                      >
                        <p className="text-sm font-semibold text-leaf-navy">
                          {course.label}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Show More */}
                  <div className="mt-2 border-t border-leaf-border pt-2">
                    <Link
                      href="/courses"
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-leaf-green-dark transition-colors hover:bg-leaf-soft"
                    >
                      <span>View all courses</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/contact") ? "text-leaf-navy" : "text-leaf-muted hover:text-leaf-navy"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden items-center rounded-lg bg-leaf-green-dark px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-leaf-green hover:shadow-[0_6px_18px_rgba(22,165,22,0.18)] md:inline-flex"
        >
          Get Started
        </Link>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-leaf-navy hover:bg-leaf-soft md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-leaf-border/70 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="border-b border-leaf-border/60 px-1 py-3.5 text-sm font-medium text-leaf-text hover:text-leaf-navy"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="border-b border-leaf-border/60 px-1 py-3.5 text-sm font-medium text-leaf-text hover:text-leaf-navy"
              >
                About
              </Link>

              {/* Mobile Courses */}
              <div className="border-b border-leaf-border/60">
                <button
                  type="button"
                  onClick={() => setIsCoursesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-1 py-3.5 text-sm font-medium text-leaf-text"
                  aria-expanded={isCoursesOpen}
                >
                  Courses
                  <ChevronDown
                    className={`size-4 transition-transform ${
                      isCoursesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCoursesOpen && (
                  <div className="mb-3 space-y-1 rounded-lg bg-leaf-bg p-2">
                    {courses.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2.5 hover:bg-white"
                      >
                        <p className="text-sm font-medium text-leaf-navy">
                          {course.label}
                        </p>

                        <p className="mt-0.5 text-xs text-leaf-muted">
                          {course.description}
                        </p>
                      </Link>
                    ))}

                    <Link
                      href="/courses"
                      onClick={closeMobileMenu}
                      className="block border-t border-leaf-border px-3 pt-3 text-sm font-semibold text-leaf-green-dark"
                    >
                      View all courses →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/career"
                onClick={closeMobileMenu}
                className="border-b border-leaf-border/60 px-1 py-3.5 text-sm font-medium text-leaf-text hover:text-leaf-navy"
              >
                Careers
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="border-b border-leaf-border/60 px-1 py-3.5 text-sm font-medium text-leaf-text hover:text-leaf-navy"
              >
                Contact
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="mt-4 flex items-center justify-center rounded-lg bg-leaf-green-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-green"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}