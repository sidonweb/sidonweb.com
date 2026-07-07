"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

export default function Meditations() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const resetAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.addEventListener("ended", handleAudioEnd);

            return () => {
                audio.removeEventListener("ended", handleAudioEnd);
            };
        }
    }, []);

    return (

        <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 sm:flex-row">
            <div className="group relative shrink-0">
                <Image
                    className="h-48 w-full object-cover sm:h-full sm:w-40"
                    width={500}
                    height={500}
                    src="/photos/chillguy.gif"
                    priority
                    alt="Relaxation"
                />
                <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                    <button
                        onClick={togglePlayPause}
                        className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                    >
                        {isPlaying ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4H6V20H10V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 4H14V20H18V4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.43005 3.76038L19.4301 12.7604L5.43005 21.7604V3.76038Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={resetAudio}
                        className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition pl-2"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 1L21 5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 23L3 19L7 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-1.5 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                    4 min · guided
                </p>
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                    Reset your mind
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    A four-minute guided imagery exercise to unwind and relax.
                    Hover the image to play.
                </p>
            </div>
            <audio ref={audioRef} src="/audio/meditate.mp3" />
        </div>

    );
}
