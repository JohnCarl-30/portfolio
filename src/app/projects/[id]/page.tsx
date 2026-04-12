import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, UserCircle, Calendar } from "lucide-react";
import { projectsData } from "@/app/data/Projects";
import Navbar from "@/components/Navbar";

// Get static paths
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-20">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 w-full mt-4 flex-grow">
        
        {/* Back navigation */}
        <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-600 transition-colors mb-8"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Hero Section: Image + Title/Desc */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
            {/* Project Main Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                {project.url ? (
                    <Image
                        src={project.url}
                        alt={project.name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Title & Description */}
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{project.name}</h1>
                <div className="prose prose-lg text-gray-600">
                    {project.longDescription.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>

        {/* Content Section: Details & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Sidebar Details (Role, Timeline, Tech Stack) */}
            <div className="col-span-1 flex flex-col gap-10">
                
                {/* Project Details */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Project Details</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                                <UserCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Role</p>
                                <p className="text-gray-900 font-semibold">{project.role || "Developer"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Timeline</p>
                                <p className="text-gray-900 font-semibold">{project.timeline || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.tech.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm">
                                <span className="font-medium text-sm text-gray-700">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content (Key Features) */}
            <div className="col-span-1 lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
                
                {project.keyFeatures.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {project.keyFeatures.map((feature, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm mb-4">
                                    <Image
                                        src={feature.image || "/projects/image-1.jpg"}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic bg-gray-100 p-6 rounded-xl border border-gray-200 text-center">
                        Key features details are coming soon.
                    </p>
                )}

                {/* Live Demo Button */}
                <div className="mt-14 flex justify-center lg:justify-start">
                    {project.liveDemoUrl ? (
                        <a 
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-900 text-white font-medium hover:bg-emerald-800 transition-colors shadow-lg"
                        >
                            Live Demo <ArrowRight className="w-5 h-5" />
                        </a>
                    ) : (
                        <button disabled className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-300 text-gray-500 font-medium cursor-not-allowed">
                            Live Demo <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
            
        </div>
      </main>
    </div>
  );
}
