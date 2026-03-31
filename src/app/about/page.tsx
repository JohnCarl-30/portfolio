'use client'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// Web Audio API synth for mechanical keyboard click
const playClickSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // Oscillator for the deep 'thock'
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        // High-frequency noise for the 'clack' switch mechanism
        const bufferSize = ctx.sampleRate * 0.05; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        noise.start();
        osc.stop(ctx.currentTime + 0.05);
        noise.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Ignore if AudioContext fails (e.g. browser policy strictly requires interaction)
    }
};

// Realistic Keyboard Key component
const Keycap = ({ children, colorClass, shadowClass, href, isEnter = false, isExternal = false, className = '' }: any) => {
    const clickHandler = () => { playClickSound(); };

    const content = (
        <div 
           className={`
             group relative flex flex-col items-center justify-center font-bold text-sm
             ${isEnter ? 'w-24' : 'w-16'} h-16 rounded-xl border border-black/80
             transition-all duration-75 ease-in-out select-none cursor-pointer
             ${colorClass}
             ${shadowClass}
             active:translate-y-[6px] active:shadow-[0_0px_0_0_transparent] active:scale-[0.98]
             hover:brightness-110
             ${className}
           `}
           onMouseDown={clickHandler}
           onTouchStart={clickHandler}
        >
          {/* Inner bezel for 3D realism */}
          <div className="absolute inset-1 rounded-lg border-t-[1.5px] border-white/40 border-b-[1.5px] border-black/30 pointer-events-none" />
          {children}
        </div>
    );

    if (href) {
        if (isExternal) {
            return <a href={href} target="_blank" rel="noopener noreferrer" className="block outline-none" draggable={false}>{content}</a>;
        }
        return <Link href={href} className="block outline-none" draggable={false}>{content}</Link>;
    }
    return <div className="block outline-none" draggable={false}>{content}</div>;
};


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
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex-1 w-full">
              
              {/* Keyboard Icons Row */}
              <div className="flex flex-wrap gap-x-3 gap-y-4 mb-10 justify-center md:justify-start pt-2">
                
                {/* 1. Orange Search */}
                <Keycap 
                    href="/projects"
                    colorClass="bg-[#eb7a13]" 
                    shadowClass="shadow-[0_6px_0_0_#9a3412,0_10px_10px_rgba(0,0,0,0.3)]"
                >
                    <span className="text-white text-xl translate-y-[-2px]">🔍</span>
                    <span className="absolute top-1 right-2 text-white/70 text-[10px]">1</span>
                </Keycap>

                {/* 2. Blue Github */}
                <Keycap 
                    href="https://github.com"
                    isExternal
                    colorClass="bg-[#2563eb]" 
                    shadowClass="shadow-[0_6px_0_0_#1e3a8a,0_10px_10px_rgba(0,0,0,0.3)]"
                >
                    <span className="text-white text-xl translate-y-[-2px]">🐱</span>
                    <span className="absolute top-1 right-2 text-white/70 text-[10px]">2</span>
                </Keycap>

                {/* 3. White Empty */}
                <Keycap 
                    colorClass="bg-[#f8fafc]" 
                    shadowClass="shadow-[0_6px_0_0_#94a3b8,0_10px_10px_rgba(0,0,0,0.3)]"
                >
                    <span className="absolute top-1 right-2 text-gray-400 text-[10px]">3</span>
                </Keycap>

                {/* 4. Photo keycap */}
                <Keycap 
                    href="#photo"
                    colorClass="bg-[#1e40af]" 
                    shadowClass="shadow-[0_6px_0_0_#1e3a8a,0_10px_10px_rgba(0,0,0,0.3)]"
                    className="overflow-hidden"
                >
                    <div className="absolute inset-1.5 rounded-lg overflow-hidden bg-gray-300">
                        <Image src="/personal.jpg" alt="Profile" fill className="object-cover" />
                    </div>
                </Keycap>

                {/* 5. Enter button */}
                <Keycap 
                    href="#contact"
                    isEnter
                    colorClass="bg-[#3b82f6]" 
                    shadowClass="shadow-[0_6px_0_0_#1e3a8a,0_10px_10px_rgba(0,0,0,0.3)]"
                >
                    <span className="text-white text-sm font-semibold tracking-wide translate-y-[-2px]">Enter</span>
                    <span className="absolute top-1 right-2 text-white/70 text-[10px]">4</span>
                </Keycap>

              </div>

              {/* Name and Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 mt-4 tracking-tight">
                John Carl Santos
              </h1>
              <p className="text-sm text-gray-400 mb-8 font-medium">
                A pretty okay software engineer from the Philippines.
              </p>

              {/* Bio Paragraphs */}
              <div className="text-sm space-y-5 text-gray-800 leading-relaxed font-medium">
                <p>
                  I think im just mediocre to all things , outside coding, I play ml, cod, billiards, basketball. I also do gym and running.
                </p>
              </div>
            </div>

            {/* DEVS100 Card Sidebar */}
            <div className="w-full lg:w-[350px] flex-shrink-0 h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden self-stretch lg:self-auto border border-gray-100">
                <iframe
                    src="https://www.devs100.com/access-card/embed?name=John%20Carl%20Santos"
                    className="w-full h-full border-0"
                    title="DEVS100 Access Card"
                />
            </div>
        </div>

      </div>
    </div>
  );
}
