"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaCircleChevronLeft,
  FaCircleChevronRight,
  FaCircleXmark,
} from "react-icons/fa6";

interface ImageGridProps {
  images: {
    src: string;
    alt: string;
  }[];
  columns?: 2 | 3 | 4;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns = 3,
}) => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  const gridClass = {
    2: "grid-cols-2 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];


  return (
    <section>
      <div className={`grid ${gridClass} gap-4 my-8`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setExpandedImage(index)}
          >
            <Image
              alt={image.alt}
              src={image.src}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {expandedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
            aria-label="Close"
          >
            <FaCircleXmark
              className={`h-6 w-6 text-[#D4D4D4] hover:opacity-75`}
            />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              alt={images[expandedImage].alt}
              src={images[expandedImage].src}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              {/* Prev */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage(
                    (expandedImage - 1 + images.length) % images.length
                  );
                }}
                aria-label="Previous image"
              >
                <FaCircleChevronLeft
                  className={`h-8 w-8 text-[#D4D4D4] hover:opacity-75`}
                />
              </button>

              {/* Next */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage((expandedImage + 1) % images.length);
                }}
                aria-label="Next image"
              >
                <FaCircleChevronRight
                  className={`h-8 w-8 text-[#D4D4D4] hover:opacity-75`}
                />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};
