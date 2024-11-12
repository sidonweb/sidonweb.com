import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function NotFound() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tight">
        404 - nothing's here!
      </h1>
      <p className="mb-4">
        you've entered uncharted territory, go back.
      </p>
      <Image
        alt="bonk"
        src="/photos/bonk-doge.gif"
        width={150}
        height={10}
        priority
        className="rounded-lg object-cover"
      />
    </section>
  );
}
