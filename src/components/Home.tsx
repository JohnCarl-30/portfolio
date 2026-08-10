"use client";

import Credentials from "@/components/home/Credentials";
import Experience from "@/components/home/Experience";
import Identity from "@/components/home/Identity";
import Intro from "@/components/home/Intro";
import Notes from "@/components/home/Notes";
import Playground from "@/components/home/Playground";
import Projects from "@/components/home/Projects";
import SayHi from "@/components/home/SayHi";
import ScrollProgress from "@/components/home/ScrollProgress";
import SectionDock from "@/components/home/SectionDock";
import Stack from "@/components/home/Stack";
import { PreviewProvider } from "@/components/home/HoverPreview";

export default function HomeComponent() {
  return (
    <PreviewProvider>
      <ScrollProgress />

      <main className="shell flex-1 pb-4">
        <Identity />
        <Intro />
        <Notes />
        <Projects />
        <Experience />
        <Stack />
        <Credentials />
        <SayHi />
        <Playground />
      </main>

      <SectionDock />
    </PreviewProvider>
  );
}
