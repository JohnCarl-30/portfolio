'use client'
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectsButton } from "@/app/data/Projects";
import Navbar from "@/components/Navbar";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Filter by Search Query
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by Category Tab
      const matchesTab = activeTab === "All" || project.category === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pt-24 pb-16 dark:bg-zinc-950">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full flex-grow flex flex-col mt-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                <Link href="/#featured-projects" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="mb-6 text-4xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-white">Portfolio Projects</h1>
                
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-3 pl-10 leading-5 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 sm:text-sm"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {projectsButton.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            activeTab === tab
                                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-white/10 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            layout
        >
            <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={project.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900"
                    >
                        {/* Image Container with Hover Overlay */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                            {project.url ? (
                                <Image
                                    src={project.url}
                                    alt={project.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200">
                                    No Image
                                </div>
                            )}
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <Link 
                                    href={`/projects/${project.id}`}
                                    className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                                >
                                    View Project
                                </Link>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                            <p className="mb-4 flex-grow text-sm text-gray-600 line-clamp-3 dark:text-gray-300">{project.desc}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-white/10 dark:bg-slate-800 dark:text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-white/10 dark:bg-slate-800 dark:text-gray-300">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {filteredProjects.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400">
                    No projects found for &quot;{searchQuery}&quot; in {activeTab}.
                </div>
            )}
        </motion.div>
    </div>
    </div>
  );
}
