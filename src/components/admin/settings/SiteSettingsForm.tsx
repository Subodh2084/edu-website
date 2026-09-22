"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { initialSiteSettings } from "@/data/site-settings";
import { getSiteSettings, saveSiteSettings, uploadImage } from "@/lib/queries/admin";
import type { SiteSettings } from "@/types/site-settings";

const urlOrEmpty = z
  .string()
  .refine(
    (val) => !val || val === "" || z.string().url().safeParse(val).success,
    { message: "Please enter a valid URL" }
  );

const emailOrEmpty = z
  .string()
  .refine(
    (val) => !val || val === "" || z.string().email().safeParse(val).success,
    { message: "Please enter a valid email address" }
  );

const siteSettingsSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  email: emailOrEmpty,
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  office_hours: z.string().optional(),
  facebook_url: urlOrEmpty,
  instagram_url: urlOrEmpty,
  linkedin_url: urlOrEmpty,
  github_url: urlOrEmpty,
  youtube_url: urlOrEmpty,
  google_maps_url: urlOrEmpty,
  footer_description: z.string().optional(),
  copyright_text: z.string().optional(),
});

type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

interface SiteSettingsFormProps {
  initialData?: SiteSettings;
}

export default function SiteSettingsForm({
  initialData = initialSiteSettings,
}: SiteSettingsFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData.logo
  );
  const [faviconPreview, setFaviconPreview] = useState<string | null>(
    initialData.favicon
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      company_name: initialData.company_name,
      email: initialData.email ?? "",
      phone: initialData.phone ?? "",
      whatsapp: initialData.whatsapp ?? "",
      address: initialData.address ?? "",
      office_hours: initialData.office_hours ?? "",
      facebook_url: initialData.social_media_links?.facebook ?? "",
      instagram_url: initialData.social_media_links?.instagram ?? "",
      linkedin_url: initialData.social_media_links?.linkedin ?? "",
      github_url: initialData.social_media_links?.github ?? "",
      youtube_url: initialData.social_media_links?.youtube ?? "",
      google_maps_url: initialData.google_maps_url ?? "",
      footer_description: initialData.footer_description ?? "",
      copyright_text: initialData.copyright_text ?? "",
    },
  });

  // Fetch live settings on mount to ensure form reflects database
  useEffect(() => {
    let isMounted = true;
    getSiteSettings().then((data) => {
      if (data && isMounted) {
        reset({
          company_name: data.company_name || initialSiteSettings.company_name,
          email: data.email ?? "",
          phone: data.phone ?? "",
          whatsapp: data.whatsapp ?? "",
          address: data.address ?? "",
          office_hours: data.office_hours ?? "",
          facebook_url: data.social_media_links?.facebook ?? "",
          instagram_url: data.social_media_links?.instagram ?? "",
          linkedin_url: data.social_media_links?.linkedin ?? "",
          github_url: data.social_media_links?.github ?? "",
          youtube_url: data.social_media_links?.youtube ?? "",
          google_maps_url: data.google_maps_url ?? "",
          footer_description: data.footer_description ?? "",
          copyright_text: data.copyright_text ?? "",
        });
        if (data.logo) setLogoPreview(data.logo);
        if (data.favicon) setFaviconPreview(data.favicon);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: SiteSettingsFormValues) => {
    setErrorMessage(null);
    try {
      let finalLogo = logoPreview;
      let finalFavicon = faviconPreview;

      if (logoFile) {
        const uploadedLogo = await uploadImage(logoFile, "branding");
        if (uploadedLogo) finalLogo = uploadedLogo;
      }

      if (faviconFile) {
        const uploadedFavicon = await uploadImage(faviconFile, "branding");
        if (uploadedFavicon) finalFavicon = uploadedFavicon;
      }

      const payload: Partial<SiteSettings> = {
        company_name: data.company_name,
        logo: finalLogo && !finalLogo.startsWith("blob:") ? finalLogo : null,
        favicon: finalFavicon && !finalFavicon.startsWith("blob:") ? finalFavicon : null,
        email: data.email || null,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        address: data.address || null,
        office_hours: data.office_hours || null,
        social_media_links: {
          facebook: data.facebook_url || "",
          instagram: data.instagram_url || "",
          linkedin: data.linkedin_url || "",
          github: data.github_url || "",
          youtube: data.youtube_url || "",
        },
        google_maps_url: data.google_maps_url || null,
        footer_description: data.footer_description || null,
        copyright_text: data.copyright_text || null,
        updated_at: new Date().toISOString(),
      };

      const success = await saveSiteSettings(payload);
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        setErrorMessage("Failed to save site settings. Please try again.");
      }
    } catch (err) {
      console.error("Error saving site settings:", err);
      setErrorMessage("An unexpected error occurred while saving.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isSubmitted && (
        <div className="rounded-lg border border-leaf-border bg-leaf-soft p-4 text-sm font-medium text-leaf-green-dark">
          Site settings saved successfully!
        </div>
      )}
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      {/* 1. General Information Card */}
      <Card className="border-leaf-border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-leaf-navy">
            General Information
          </CardTitle>
          <CardDescription className="text-leaf-muted">
            Manage your website branding and company information.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Company Name *
            </label>
            <Input
              {...register("company_name")}
              placeholder="e.g. LeafClutch Technology"
              className="border-leaf-border"
            />
            {errors.company_name && (
              <p className="text-xs text-red-600">
                {errors.company_name.message}
              </p>
            )}
          </div>

          {/* Logo & Favicon Upload */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Company Logo
              </label>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-leaf-border bg-leaf-bg flex items-center justify-center p-3">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Company logo preview"
                      fill
                      unoptimized={
                        logoPreview.startsWith("blob:") ||
                        logoPreview.startsWith("data:")
                      }
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-xs text-leaf-muted">
                      <Upload className="mb-1 size-5 text-leaf-muted" />
                      <span>No logo</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full max-w-xs border-leaf-border cursor-pointer bg-white text-xs"
                  />
                  <p className="text-xs text-leaf-muted">
                    Recommended: PNG or SVG with transparent background.
                  </p>
                </div>
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Website Favicon
              </label>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-leaf-border bg-leaf-bg flex items-center justify-center p-2">
                  {faviconPreview ? (
                    <Image
                      src={faviconPreview}
                      alt="Favicon preview"
                      fill
                      unoptimized={
                        faviconPreview.startsWith("blob:") ||
                        faviconPreview.startsWith("data:")
                      }
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-xs text-leaf-muted">
                      <Upload className="size-4 text-leaf-muted" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconChange}
                    className="w-full max-w-xs border-leaf-border cursor-pointer bg-white text-xs"
                  />
                  <p className="text-xs text-leaf-muted">
                    Square icon (.ico, .png).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Contact Information Card */}
      <Card className="border-leaf-border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-leaf-navy">
            Contact Information
          </CardTitle>
          <CardDescription className="text-leaf-muted">
            Manage contact details displayed across your site.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Email
              </label>
              <Input
                type="email"
                {...register("email")}
                placeholder="hello@example.com"
                className="border-leaf-border"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Phone Number
              </label>
              <Input
                {...register("phone")}
                placeholder="+977 9800000000"
                className="border-leaf-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                WhatsApp Number
              </label>
              <Input
                {...register("whatsapp")}
                placeholder="+977 9800000000"
                className="border-leaf-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
                Office Hours
              </label>
              <Input
                {...register("office_hours")}
                placeholder="Sun - Fri, 10:00 AM - 5:00 PM"
                className="border-leaf-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Physical Address
            </label>
            <Input
              {...register("address")}
              placeholder="Butwal, Nepal"
              className="border-leaf-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Social Media Section Card */}
      <Card className="border-leaf-border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-leaf-navy">
            Social Media Links
          </CardTitle>
          <CardDescription className="text-leaf-muted">
            Manage links to your official social media profiles.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Facebook */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted flex items-center gap-2">
                <FaFacebook className="size-4 text-[#1877F2]" />
                Facebook URL
              </label>
              <Input
                {...register("facebook_url")}
                placeholder="https://facebook.com/yourpage"
                className="border-leaf-border"
              />
              {errors.facebook_url && (
                <p className="text-xs text-red-600">
                  {errors.facebook_url.message}
                </p>
              )}
            </div>

            {/* Instagram */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted flex items-center gap-2">
                <FaInstagram className="size-4 text-[#E4405F]" />
                Instagram URL
              </label>
              <Input
                {...register("instagram_url")}
                placeholder="https://instagram.com/yourhandle"
                className="border-leaf-border"
              />
              {errors.instagram_url && (
                <p className="text-xs text-red-600">
                  {errors.instagram_url.message}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted flex items-center gap-2">
                <FaLinkedin className="size-4 text-[#0A66C2]" />
                LinkedIn URL
              </label>
              <Input
                {...register("linkedin_url")}
                placeholder="https://linkedin.com/company/yourcompany"
                className="border-leaf-border"
              />
              {errors.linkedin_url && (
                <p className="text-xs text-red-600">
                  {errors.linkedin_url.message}
                </p>
              )}
            </div>

            {/* GitHub */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted flex items-center gap-2">
                <FaGithub className="size-4 text-leaf-navy" />
                GitHub URL
              </label>
              <Input
                {...register("github_url")}
                placeholder="https://github.com/yourorg"
                className="border-leaf-border"
              />
              {errors.github_url && (
                <p className="text-xs text-red-600">
                  {errors.github_url.message}
                </p>
              )}
            </div>
          </div>

          {/* YouTube */}
          <div className="space-y-2 max-w-md">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted flex items-center gap-2">
              <FaYoutube className="size-4 text-[#FF0000]" />
              YouTube URL
            </label>
            <Input
              {...register("youtube_url")}
              placeholder="https://youtube.com/@yourchannel"
              className="border-leaf-border"
            />
            {errors.youtube_url && (
              <p className="text-xs text-red-600">
                {errors.youtube_url.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 4. Map & Footer Section Card */}
      <Card className="border-leaf-border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-leaf-navy">
            Map & Footer Information
          </CardTitle>
          <CardDescription className="text-leaf-muted">
            Manage your Google Maps location link and footer text.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Google Maps URL
            </label>
            <Input
              {...register("google_maps_url")}
              placeholder="https://maps.google.com/?q=..."
              className="border-leaf-border"
            />
            {errors.google_maps_url && (
              <p className="text-xs text-red-600">
                {errors.google_maps_url.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Footer Description
            </label>
            <Textarea
              {...register("footer_description")}
              placeholder="Short description displayed in the footer section..."
              rows={3}
              className="border-leaf-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-leaf-muted">
              Copyright Text
            </label>
            <Input
              {...register("copyright_text")}
              placeholder="© 2026 LeafClutch Technology. All rights reserved."
              className="border-leaf-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          className="border-leaf-border"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-leaf-green-dark text-white hover:bg-leaf-green"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
