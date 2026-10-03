import type { MetadataRoute } from "next";

/** Lets search engines index the whole site. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
