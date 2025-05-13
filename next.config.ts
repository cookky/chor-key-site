import type { NextConfig } from "next";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const domain = SUPABASE_URL?.replace(/^https?:\/\//, '') ?? ''

const nextConfig: NextConfig = {
  turbo: false,
  images: {
    domains: [domain], // ใส่ domain ที่แท้จริงของโปรเจกต์คุณ
  },
};

export default nextConfig;
