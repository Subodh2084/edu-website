export interface SiteSettings {
  id: string;
  company_name: string;
  logo: string | null;
  favicon: string | null;
  email: string | null;
  
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  social_media_links: Record<string, string>;
  google_maps_url: string | null;
  office_hours: string | null;
  footer_description: string | null;
  copyright_text: string | null;
  updated_at: string;
}
