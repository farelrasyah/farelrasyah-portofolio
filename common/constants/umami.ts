export const UMAMI_ACCOUNT = {
  username: "Farel Rasyah",
  api_key: process.env.UMAMI_API_KEY,
  base_url: "https://api.umami.is/v1/websites",
  endpoint: {
    page_views: "/pageviews",
    sessions: "/sessions/stats",
  },
  parameters: {
    startAt: 1717174800000, // 1 Juni 2024 00:00 WIB
    endAt: 1767190799000, // 31 Desember 2025 23:59 WIB
    unit: "month",
    timezone: "Asia/Jakarta",
  },
  is_active: true,
websites: [
  {
    domain: "farelrasyah.vercel.app",
    website_id: process.env.UMAMI_WEBSITE_ID_VERCEL,
    umami_url:
      "https://us.umami.is/share/wg6XA2bPFWg8Qc7r/www.farelrasyah.vercel.app",
  },
],

};
