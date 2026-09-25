import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The resume used to be served under its original upload name, and that
      // URL is already out on LinkedIn and past applications.
      {
        source: "/JohnCarl_Santoss_Resume%20\\(2\\).pdf",
        destination: "/john-carl-santos-resume.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
