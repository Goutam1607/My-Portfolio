import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the whole site into plain HTML/CSS/JS files in the `out/` folder,
  // so it can be hosted as a free static site (Render, Vercel, Netlify, GitHub Pages…).
  output: "export",
  images: {
    // Next's on-the-fly image resizing needs a server, which static sites don't have.
    // Images are served as-is, so keep files in public/ reasonably small.
    unoptimized: true,
  },
};

export default nextConfig;
