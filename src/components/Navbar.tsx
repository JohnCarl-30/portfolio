'use client'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="w-full  bg-white/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="md:pl-6 flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/home" className="font-bold text-gray-800 text-lg tracking-tight">
                        JC<span className="text-blue-500">.</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-8">
                        <Link href="#about" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">About</Link>
                        <Link href="#skills" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Skills</Link>
                        <Link href="#projects" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">Projects</Link>
                        <Link href="/contact" className="text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Contact
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar