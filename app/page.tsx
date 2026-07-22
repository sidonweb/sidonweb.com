import HashScroll from "./components/hash-scroll";
import Intro from "./components/sections/intro";
import Work from "./components/sections/work";
import Stack from "./components/sections/stack";
import About from "./components/sections/about";
import Contact from "./components/sections/contact";
import { SectionDivider } from "./components/sections/section-shell";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <HashScroll />
      <Intro />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Stack />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
    </>
  );
}
