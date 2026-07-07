"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/profile2.jpg", "/profile3.jpg", "/profile.jpg"];

export default function ProfileSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt="Siddharth Singh"
                    fill
                    sizes="128px"
                    priority={index === 0}
                    className={`object-cover absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            ))}
        </div>

    );
}