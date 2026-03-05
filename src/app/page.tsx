import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Heading from "@/components/sub/Heading";
import Navbar from "@/components/Navbar";
import SideNavbar from "./section/side-navbar";

export default function Home() {
  return <div>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <SideNavbar />
  </div>
}