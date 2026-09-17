import type { SiteSettings } from "@/types/site-settings";

export const initialSiteSettings: SiteSettings = {
  id: "site-settings-1",
  company_name: "LeafClutch Technology",
  logo: "/companyLogo/companyLogo.png",
  favicon: "/favicon.ico",
  email: "hello@leafclutch.com",
  phone: "+977 9800000000",
  whatsapp: "+977 9800000000",
  address: "Butwal, Nepal",
  social_media_links: {
    facebook: "https://facebook.com/leafclutch",
    instagram: "https://instagram.com/leafclutch",
    linkedin: "https://linkedin.com/company/leafclutch",
    github: "https://github.com/leafclutch",
    youtube: "https://youtube.com/@leafclutch",
  },
  google_maps_url: "https://maps.google.com/?q=Butwal+Nepal",
  office_hours: "Sun - Fri, 10:00 AM - 5:00 PM",
  footer_description: "Empowering students with practical tech skills for modern careers.",
  copyright_text: "© 2026 LeafClutch Technology. All rights reserved.",
  updated_at: new Date().toISOString(),
};
