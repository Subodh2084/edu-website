"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Folder,
  Users,
  MessageSquare,
  HelpCircle,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Folder,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "FAQs",
    href: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    title: "Contact Messages",
    href: "/admin/contact-messages",
    icon: MessageSquare,
  },
  {
    title: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="bg-leaf-navy text-white">
      <div className="flex items-center justify-center gap-2 border-b border-white/10 p-4">
        <Image
          src="/companyLogo/companyLogo.png"
          alt="LeafClutch Technology"
          width={50}
          height={50}
        />

        <span className="text-sm font-bold">
          LeafClutch Technology
        </span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = path === link.href;

                return (
                  <SidebarMenuItem key={link.href}>
                    <Link
                      href={link.href}
                      className={`mt-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white text-leaf-navy"
                          : "text-leaf-soft hover:bg-leaf-soft hover:text-leaf-navy"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white"
          >
            <LogOut className="size-4 text-red-400" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}