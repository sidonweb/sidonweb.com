import { ImageGrid } from "app/components/image-grid";
import PageHeader from "app/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A collection of photos taken by Siddharth Singh while travelling and out with a camera.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Siddharth Singh",
    description:
      "A collection of photos taken by Siddharth Singh while travelling and out with a camera.",
    url: "https://sidonweb.com/gallery",
    type: "website",
  },
};

const images = [
  { src: "/photos/image1.jpeg", alt: "Beach view" },
  { src: "/photos/image2.jpeg", alt: "Mountain view" },
  { src: "/photos/image3.jpeg", alt: "Forest path" },
  { src: "/photos/image4.jpeg", alt: "City skyline" },
  { src: "/photos/image5.jpeg", alt: "Beach view" },
  { src: "/photos/image6.jpeg", alt: "Mountain view" },
  { src: "/photos/image7.jpeg", alt: "Forest path" },
  { src: "/photos/image8.jpeg", alt: "City skyline" },
  { src: "/photos/image9.jpeg", alt: "Beach view" },
  { src: "/photos/image10.jpg", alt: "Mountain view" },
  { src: "/photos/image11.jpg", alt: "Forest path" },
  { src: "/photos/image12.jpg", alt: "City skyline" },
  { src: "/photos/image13.jpg", alt: "Beach view" },
  { src: "/photos/image14.jpg", alt: "Mountain view" },
  { src: "/photos/image15.jpg", alt: "Forest path" },
  { src: "/photos/image16.jpg", alt: "City skyline" },
  { src: "/photos/image17.jpg", alt: "City skyline" },
];

export default function Gallery() {
  return (
    <section>
      <PageHeader
        label="Gallery"
        title="Moments off the clock"
        description="Photos I've taken while travelling and out with a camera, mostly on my phone."
      />
      <div className="mt-6">
        <ImageGrid images={images} />
      </div>
    </section>
  );
}
