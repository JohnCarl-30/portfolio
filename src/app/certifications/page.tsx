import Certifications from "@/components/Certifications";
import Navbar from "@/components/Navbar";
import SideNavbar from "@/app/section/side-navbar";

export default function CertificationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Certifications showAllByDefault showViewMoreButton={false} />
      </main>
      <SideNavbar />
    </div>
  );
}
