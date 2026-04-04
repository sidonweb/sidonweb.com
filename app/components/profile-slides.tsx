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
        }, 8000); // Change image every 6 seconds

        return () => clearInterval(interval);
    }, []);

    return (

        <div className="border border-neutral-200 dark:border-[#222] p-2 w-[150px] h-[150px] overflow-hidden shrink-0 relative group rounded-xl">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    fill
                    className={`object-cover absolute inset-0 transition-all duration-1000 rounded-xl p-1 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            ))}
        </div>

    );
}