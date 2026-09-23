"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Folder,
  MessageSquare,
  HelpCircle,
  Settings,
  Tag,
  LogOut,
  ChartColumnBig
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { adminLogout } from "@/actions/auth";

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
    title: "Offers",
    href: "/admin/offers",
    icon: Tag,
  },
    {
    title: "Stats",
    href: "/admin/stats",
    icon: ChartColumnBig,
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
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Sidebar className="bg-leaf-navy text-white">
      <div className="flex flex-col items-center justify-center gap-2 border-b border-white/10 p-4">
        <Image
          src="/companyLogo/logoDark.png"
          alt="LeafClutch Technology"
          width={150}
          height={150}
        />

        <span className="text-lg font-bold">
          Leafclutch Technology
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
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full justify-start gap-3 text-white"
          >
            <LogOut className="size-4 text-red-400" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
