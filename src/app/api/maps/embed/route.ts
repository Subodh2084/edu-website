import { NextRequest, NextResponse } from "next/server";

function isGoogleMapsUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      (hostname === "maps.app.goo.gl" ||
        hostname === "maps.google.com" ||
        hostname === "www.google.com" ||
        hostname === "google.com")
    );
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const requestedUrl = request.nextUrl.searchParams.get("url");

  if (!requestedUrl || !isGoogleMapsUrl(requestedUrl)) {
    return NextResponse.json({ error: "Invalid Google Maps URL." }, { status: 400 });
  }

  let mapUrl = requestedUrl;

  try {
    // Google Maps share links use maps.app.goo.gl and must be expanded before
    // they can be loaded in an iframe.
    if (new URL(requestedUrl).hostname.toLowerCase() === "maps.app.goo.gl") {
      const response = await fetch(requestedUrl, {
        redirect: "follow",
        cache: "no-store",
      });

      if (response.ok && isGoogleMapsUrl(response.url)) {
        mapUrl = response.url;
      }
    }
  } catch {
    // The original share link remains a usable fallback for the iframe.
  }

  const embedUrl = new URL(mapUrl);
  if (embedUrl.hostname.toLowerCase() !== "maps.app.goo.gl") {
    embedUrl.searchParams.set("output", "embed");
  }

  return NextResponse.redirect(embedUrl);
}
