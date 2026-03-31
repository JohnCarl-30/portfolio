import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-10 mt-auto">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Logo or Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="font-bold text-gray-800 tracking-tight text-xl">
                        John Carl Santos<span className="text-blue-500">.</span>
                    </Link>
                    <p className="text-sm text-gray-500">
                        Bridging design and technology together.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-5">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:contact@example.com" className="text-gray-400 hover:text-red-500 transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-50 text-center flex items-center justify-center w-full max-w-6xl mx-auto px-6">
                <p className="text-xs text-gray-400">
                    Copyright © {new Date().getFullYear()} John Carl Santos. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
