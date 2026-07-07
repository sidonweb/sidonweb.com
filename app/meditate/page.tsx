import Meditations from "app/components/meditations";
import PageHeader from "app/components/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditate",
  description:
    "A short guided imagery meditation to unwind, reset, and step away from the screen.",
  alternates: { canonical: "/meditate" },
  openGraph: {
    title: "Meditate — Siddharth Singh",
    description:
      "A short guided imagery meditation to unwind, reset, and step away from the screen.",
    url: "https://sidonweb.com/meditate",
    type: "website",
  },
};

export default function Meditate() {
  return (
    <section>
      <PageHeader
        label="Meditate"
        title="Debug your mind"
        description="A short guided session to slow down and reset. Sometimes the best fix is stepping away from the screen."
      />
      <div className="mt-8">
        <Meditations />
      </div>
    </section>
  );
}
