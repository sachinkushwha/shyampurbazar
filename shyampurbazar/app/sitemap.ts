import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shyampurbazar-s.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://shyampurbazar-s.vercel.app/about",
      lastModified: new Date(),
    },
  ];
}
