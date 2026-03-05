import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SideNavbar from '../section/side-navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/img/pic.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          
          {/* Social Icons Row */}
          <div className="flex gap-4 mb-8 justify-center md:justify-start">
            <Link href="https://github.com" target="_blank" 
              className="w-16 h-16 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white text-2xl">🔍</span>
            </Link>
            <Link href="https://linkedin.com" target="_blank"
              className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white text-2xl">💼</span>
            </Link>
            <Link href="mailto:contact@example.com"
              className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-gray-700 text-2xl">✉️</span>
            </Link>
            <Link href="https://github.com" target="_blank"
              className="w-16 h-16 bg-gray-700 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white text-2xl">👤</span>
            </Link>
            <Link href="#contact"
              className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white text-sm font-semibold">Enter</span>
            </Link>
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Carlo Antonio Taleon
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A pretty okay software engineer from the Philippines.
          </p>

          {/* Bio Paragraphs */}
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I love creating web apps, dev tools, games, and doing machine learning! Professionally, I&apos;ve been doing React, Svelte, and NextJS. 
              But my latest grind right now is SolidJS and Rust.
            </p>
            
            <p>
              I love exploring unconventional bleeding edge tech so you can always catch me learning the next big thing.
            </p>
            
            <p>
              I contribute to open-source too! <Link href="https://vike.dev" className="text-blue-500 hover:underline">vike.dev</Link>, 
              <Link href="https://solid-sonner.vercel.app" className="text-blue-500 hover:underline"> solid-sonner</Link>, 
              <Link href="https://solid-primitives.netlify.app" className="text-blue-500 hover:underline"> solid-primitives</Link>, 
              <Link href="https://create-spring.vercel.app" className="text-blue-500 hover:underline"> create-spring (Solid primitives)</Link>. 
              I author some of my own libraries as well: 
              <Link href="#" className="text-blue-500 hover:underline"> bacon-hooks</Link>, 
              <Link href="#" className="text-blue-500 hover:underline"> solid-number-flow</Link>, 
              <Link href="#" className="text-blue-500 hover:underline"> solid-spring</Link>.
            </p>
            
            <p>
              Outside of coding, I like to travel ✈️, workout 🏋️, go for runs 🏃, and filming everyday life with my Sony camera 📸.
            </p>
            
            <p>
              Been to Japan 🇯🇵, Hong Kong 🇭🇰, and to Singapore so far, and it&apos;s been super fun!
            </p>
          </div>
        </div>

      </div>

      <SideNavbar />
    </div>
  );
}
