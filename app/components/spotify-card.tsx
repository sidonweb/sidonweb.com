"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";

function VinylDisc({ albumImage, title }: { albumImage?: string; title?: string }) {
    return (
        <div className="vinyl-disc w-16 h-16 rounded-full bg-[#111] relative flex items-center justify-center overflow-hidden">
            <div className="groove groove-1" />
            <div className="groove groove-2" />
            <div className="groove groove-3" />
            <div className="groove groove-4" />
            <div className="groove groove-5" />

            {/* Label */}
            <div className="w-7 h-7 rounded-full overflow-hidden relative z-[2] shadow-[0_0_0_1px_rgba(255,255,255,0.1)] flex-shrink-0 flex items-center justify-center">
                {albumImage
                    ? <img src={albumImage} alt={title} className="w-full h-full object-cover rounded-full block" />
                    : <div className="w-full h-full rounded-full bg-white/[0.08]" />
                }
                {/* Hole */}
                <div className="absolute w-[5px] h-[5px] rounded-full bg-[#060607] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" />
            </div>

            {/* Shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.12] to-transparent pointer-events-none z-[4]" />
        </div>
    );
}

export default function SpotifyCard() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/spotify")
                .then(res => res.json())
                .then(setData)
                .catch(err => console.error("Error fetching Spotify data:", err));
        };
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);


    if (!data) {
        return (
            <div className="flex items-center gap-4 rounded-lg my-4 p-2 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-sm animate-pulse w-full cursor-pointer">
                <div className="flex-shrink-0 w-16 h-16 relative">
                    <VinylDisc />
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col gap-1 min-w-0">
                        <div className="rounded h-[9px] w-[60px] bg-gray-400/20" />
                        <div className="rounded h-3 w-[120px] bg-gray-400/20" />
                        <div className="rounded h-[10px] w-[80px] bg-gray-400/20" />
                    </div>
                    <FaSpotify className="h-[40px] w-[40px]" />
                </div>
            </div>
        );
    }

    return (
        <Link href={data.songUrl || "https://open.spotify.com"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div className="flex items-center gap-4 rounded-lg my-4 p-2 bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 transition-[background,border-color] duration-200 w-full cursor-pointer">

                {/* Vinyl */}
                <div className={`flex-shrink-0 w-16 h-16 relative ${data.isPlaying ? "vinyl-spinning" : ""}`}>
                    <VinylDisc albumImage={data.albumImage} title={data.title} />
                </div>

                <div className="flex flex-row justify-between items-center w-full">


                    {/* Track info */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        {/* Status row */}
                        <div className="flex items-center gap-[5px] mt-[3px]">
                            <span className={`relative flex-shrink-0 w-[5px] h-[5px] rounded-full transition-colors duration-300 ${data.isPlaying ? "bg-[#1DB954] status-dot-active" : "bg-[#555]"}`} />
                            <span className={`text-[0.72rem] tracking-[0.02em] ${data.isPlaying ? "text-[#1DB954]" : "text-neutral-500 dark:text-neutral-400"}`}>
                                {data.isPlaying ? "Listening now" : "Last played"}
                            </span>
                        </div>

                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap overflow-hidden text-ellipsis m-0 leading-[1.3]">
                            {data.title || "Not Playing"}
                        </p>
                        <p className="text-[0.78rem] text-neutral-600 dark:text-neutral-400 m-0 whitespace-nowrap overflow-hidden text-ellipsis leading-[1.3]">
                            {data.artist || "Spotify"}
                        </p>
                    </div>

                    <FaSpotify className="h-[40px] w-[40px]" />

                </div>

            </div>
        </Link>
    );
}