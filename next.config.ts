import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Keep résumé links shared from the old static site working.
      {
        source: "/assets/pdf/:file*",
        destination: "/Manav_Rai_Resume.pdf",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
