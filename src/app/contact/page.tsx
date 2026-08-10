"use client";

import PageHeader from "@/components/home/PageHeader";
import SayHi from "@/components/home/SayHi";

export default function ContactPage() {
  return (
    <main className="shell flex-1 pb-20">
      <PageHeader
        label="contact"
        title="Say hi."
        description="Open to conversations about AI engineering, retrieval systems, and products that need to work after the demo."
      />

      <SayHi standalone />
    </main>
  );
}
