import { ImageGrid } from 'app/components/image-grid'
import React from 'react'

const images = [
  { src: "/photos/image1.jpeg", alt: "Beach view" },
  { src: "/photos/image2.jpeg", alt: "Mountain view"},
  { src: "/photos/image3.jpeg", alt: "Forest path" },
  { src: "/photos/image4.jpeg", alt: "City skyline"},
  { src: "/photos/image5.jpeg", alt: "Beach view" },
  { src: "/photos/image6.jpeg", alt: "Mountain view"},
  { src: "/photos/image7.jpeg", alt: "Forest path" },
  { src: "/photos/image8.jpeg", alt: "City skyline"},
  { src: "/photos/image9.jpeg", alt: "Beach view" },
  { src: "/photos/image10.jpg", alt: "Mountain view"},
  { src: "/photos/image11.jpg", alt: "Forest path" },
  { src: "/photos/image12.jpg", alt: "City skyline"},
  { src: "/photos/image13.jpg", alt: "Beach view" },
  { src: "/photos/image14.jpg", alt: "Mountain view"},
  { src: "/photos/image15.jpg", alt: "Forest path" },
  { src: "/photos/image16.jpg", alt: "City skyline"},
  { src: "/photos/image17.jpg", alt: "City skyline"},
];

export default function Gallery() {
  return (
            <section>
                <h1 className="mb-8 text-2xl font-medium tracking-tight">some pictures taken by me</h1>
                <div className="space-y-6">
                    <ImageGrid images={images} />
                </div>
            </section>
  )
}