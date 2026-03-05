export interface ProjectItem {
  name: string;
  desc: string;
  url: string;
  tech: string[];
}

export const projectsData: ProjectItem[] = [
  {
    name: "SparkleGrove.com",
    desc: "A lifestyle blog featuring DIY crafts, home decor ideas, and inspiration for creating a cozy and stylish living space.",
    url: "/projects/image-1.jpg",
    tech: ["Figma", "Photoshop", "HTML"],
  },
  {
    name: "TechTrekker.net",
    desc: "A technology news and review site covering the latest gadgets, software updates, and trends in the tech industry.",
    url: "/projects/image-2.jpg",
    tech: ["Figma", "Photoshop"],
  },
  {
    name: "CozyNestHomes.org",
    desc: "A resource for homeowners and renters alike, offering tips on interior design, home improvement projects, and sustainable living practices.",
    url: "/projects/image-3.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "WanderLuxeTravels.co",
    desc: "A travel website that provides luxury travel guides, destination reviews, and tips for planning unforgettable vacations.",
    url: "/projects/image-4.jpg",
    tech: ["HTML", "CSS", "JavaScript", "TailwindCSS"],
  },
  {
    name: "ByteBoosters.io",
    desc: "A tech startup specializing in software development, offering innovative solutions and services for businesses looking to enhance their digital presence.",
    url: "/projects/image-5.jpg",
    tech: ["Figma", "ReactJS", "TailwindCSS", "CSS"],
  },
  {
    name: "GreenLeafGardens.biz",
    desc: "An online store and community hub for gardening enthusiasts, featuring a wide range of plants, gardening tools, and expert advice.",
    url: "/projects/image-6.jpg",
    tech: ["ReactJS", "TailwindCSS", "CSS", "FramerMotion"],
  },
  {
    name: "PixelPerfectDesigns.info",
    desc: "A graphic design portfolio showcasing the work of a freelance designer, including branding, web design, and illustration projects.",
    url: "/projects/image-7.jpg",
    tech: ["NextJS", "FramerMotion"],
  },
  {
    name: "HarmonyHealthHub.com",
    desc: "A wellness website focused on holistic health, offering articles on nutrition, fitness, mental health, and alternative therapies.",
    url: "/projects/image-8.jpg",
    tech: ["NextJS", "ReactJS", "FramerMotion"],
  },
  {
    name: "StellarSkiesAstronomy.org",
    desc: "An educational site dedicated to astronomy, providing resources for amateur astronomers, star maps, and information on celestial events.",
    url: "/projects/image-9.jpg",
    tech: ["ReactJS", "JavaScript", "ThreeJS"],
  },
  {
    name: "UrbanEatsDelights.com",
    desc: "A food and dining guide covering the best urban restaurants, street food, and culinary experiences around the world.",
    url: "/projects/image-10.jpg",
    tech: ["NextJS", "ThreeJS"],
  },
];

export const projectsButton: string[] = [
  "All",
  "Figma",
  "Photoshop",
  "HTML",
  "CSS",
  "JavaScript",
  "ReactJS",
  "TailwindCSS",
  "NextJS",
  "FramerMotion",
  "ThreeJS",
];
