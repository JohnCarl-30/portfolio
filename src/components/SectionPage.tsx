"use client";

import { useLayoutEffect } from "react";

import HomeComponent from "@/components/Home";

export default function SectionPage({ targetId }: { targetId: string }) {
  useLayoutEffect(() => {
    const jump = () =>
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "auto", block: "start" });

    jump();
    const frame = requestAnimationFrame(jump);

    return () => cancelAnimationFrame(frame);
  }, [targetId]);

  return <HomeComponent />;
}
