import type { MetadataRoute } from "next";

// Generated once at build time (required for the static export)
export const dynamic = "force-static";

/** Lets search engines index the whole site. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
