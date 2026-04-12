'use client'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowUpRight, Github, Search, MapPin, Coffee, Dumbbell } from 'lucide-react';

const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
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
  } catch {
    // Ignore
  }
};

function Keycap({
  children,
  href,
  isExternal = false,
  variant = 'default',
  wide = false,
}: {
  children: React.ReactNode;
  href?: string;
  isExternal?: boolean;
  variant?: 'default' | 'blue' | 'orange' | 'dark';
  wide?: boolean;
}) {
  const variantStyles = {
    default: 'bg-foreground/5 border-foreground/10 text-foreground hover:bg-foreground/10',
    blue: 'bg-blue-500 border-blue-600 text-primary-foreground hover:bg-blue-600',
    orange: 'bg-amber-500 border-amber-600 text-primary-foreground hover:bg-amber-600',
    dark: 'bg-foreground/90 border-foreground text-background hover:bg-foreground',
  };

  const content = (
    <div
      className={`
        relative flex items-center justify-center rounded-xl border
        transition-all duration-100 ease-in-out select-none cursor-pointer
        ${wide ? 'px-5 py-3' : 'p-3'}
        ${variantStyles[variant]}
        active:translate-y-[2px] active:scale-[0.97]
      `}
      onMouseDown={playClickSound}
      onTouchStart={playClickSound}
    >
      {children}
    </div>
  );

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="outline-none" draggable={false}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="outline-none" draggable={false}>
        {content}
      </Link>
    );
  }
  return content;
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-4">About</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            John Carl Santos
          </h1>
          <p className="text-lg text-muted-foreground mt-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Software Engineer from the Philippines
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Profile Image - Large */}
          <div className="md:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-muted relative group">
            <Image
              src="/img/pic.jpg"
              alt="John Carl Santos"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-sm font-medium text-background/90 bg-foreground/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                @johncarlsantos
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Bio Card */}
            <div className="rounded-2xl border border-border bg-card p-8 flex-1">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Bio</p>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  {"I'm a software engineer who's pretty okay at what I do. I build things for the web and enjoy the process of turning ideas into working applications."}
                </p>
                <p>
                  {"Outside of coding, I play ML, COD, billiards, and basketball. I also hit the gym and go running to stay active. I'd say I'm mediocre at most things, but that doesn't stop me from trying everything."}
                </p>
              </div>
            </div>

            {/* Keyboard Navigation Row */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Quick Nav</p>
              <div className="flex flex-wrap gap-3">
                <Keycap href="/projects" variant="orange">
                  <Search className="w-5 h-5" />
                </Keycap>
                <Keycap href="https://github.com/JohnCarl-30" isExternal variant="blue">
                  <Github className="w-5 h-5" />
                </Keycap>
                <Keycap variant="default">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                    <Image src="/img/pic.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                </Keycap>
                <Keycap href="#contact" variant="dark" wide>
                  <span className="text-sm font-semibold tracking-wide flex items-center gap-2">
                    Enter <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Keycap>
              </div>
            </div>

            {/* Interests Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Coffee className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Hobbies</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Gaming', 'Billiards', 'Basketball'].map((hobby) => (
                    <span
                      key={hobby}
                      className="text-xs px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground border border-border"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Dumbbell className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Fitness</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Gym', 'Running'].map((activity) => (
                    <span
                      key={activity}
                      className="text-xs px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground border border-border"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DEVS100 Card - Full Width */}
          <div className="md:col-span-12 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-6 pb-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Membership</p>
            </div>
            <div className="flex items-center justify-center px-6 pb-8">
              <div className="w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.devs100.com/access-card/embed?name=John%20Carl%20Santos"
                  className="w-full h-full border-0"
                  title="DEVS100 Access Card"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
