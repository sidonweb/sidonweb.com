import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Siddharth Singh · Full-stack engineer",
    short_name: "Siddharth Singh",
    description:
      "Full-stack engineer building real-time systems, AI features, and tools that stay calm under load.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
