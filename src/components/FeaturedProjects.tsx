'use client'
import Heading from "./sub/Heading";
import Image from "next/image";
import { projectsData } from "../app/data/Projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FeaturedProjects = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      }
    }
  }

  // Display only top 3 featured projects
  const featured = projectsData.slice(0, 3);

  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto gap-y-10 px-6 lg:px-8 py-24" id="featured-projects">
        <div className="md:pl-6 w-full flex items-center justify-between">
            <Heading text={"Featured Projects"} />
            <Link 
                href="/projects" 
                className="group flex items-center gap-2 text-blue-500 font-medium hover:text-blue-600 transition-colors"
            >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        <motion.div
            className="md:pl-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {featured.map((project) => (
                <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    {/* Image Container with Hover Overlay */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                        {/* We use a div as placeholder for the image if it doesn't exist */}
                        {project.url ? (
                            <Image
                                src={project.url}
                                alt={project.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-blue-50 dark:bg-slate-900 flex items-center justify-center text-blue-200 dark:text-blue-900">
                                No Image
                            </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <Link 
                                href={`/projects/${project.id}`}
                                className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white px-6 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                            >
                                View Project
                            </Link>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-xl text-foreground mb-2">{project.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">{project.desc}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.slice(0, 3).map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border">
                                    {tag}
                                </span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border">
                                    +{project.tech.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default FeaturedProjects;
