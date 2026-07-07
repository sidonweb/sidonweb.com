import type { MetadataRoute } from "next";
import { metaData } from "./config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${metaData.name} — Full Stack Engineer`,
    short_name: "sidonweb",
    description: metaData.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#060607",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
