import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FeaturedProjects from "@/components/FeaturedProjects";
import FeaturedBlog from "@/components/FeaturedBlog";
import SideNavbar from "@/app/section/side-navbar";
import Contact from "@/components/Contact";

export default function HomeComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <About />
        <FeaturedProjects />
        <FeaturedBlog />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <SideNavbar />
    </div>
  );
}
