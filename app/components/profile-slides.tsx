"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/profile.jpg", "/profile2.jpg", "/profile3.jpg"];

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
        <div className="relative w-[180px] h-[180px] lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 rounded-full overflow-hidden group">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt={`Profile ${index + 1}`}
                    fill
                    className={`object-cover absolute inset-0 transition-all duration-1000 grayscale group-hover:grayscale-0 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}
        </div>
    );
}