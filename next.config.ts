import type { NextConfig } from "next";

// GitHub Pages deploys under /portfolio in GitHub Actions
// Vercel and local development serve from the root /
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? "/portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

