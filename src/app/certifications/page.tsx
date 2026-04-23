import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Certifications from "@/components/Certifications";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/app/section/side-navbar";

export default function CertificationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-shell pt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-hover)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
        <Certifications showAllByDefault showViewMoreButton={false} />
      </main>
      <SideNavbar />
    </div>
  );
}
