"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

// Helper for animation delays
const getDelay = (step: number) => `delay-${step * 150}`;

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate cloud visibility and position based on scroll
  const getCloudStyles = (
    initialX: number,
    initialY: number,
    size: number,
    speed: number = 0.3
  ) => {
    // Start showing clouds at bottom of viewport
    const startY = 100;
    const scrollProgress = Math.max(0, Math.min(1, scrollY / 600));
    const opacity = initialY > startY ? 0 : 0.5;
    const scale = 1 + (scrollProgress * 0.5); // Scale from 1x to 1.5x
    
    return {
      position: 'absolute' as const,
      left: `${initialX}%`,
      bottom: `${initialY}%`,
      width: `${size}rem`,
      opacity: scrollProgress > 0 ? opacity + (scrollProgress * 0.5) : opacity,
      transform: `translate(${scrollY * speed * (initialX > 50 ? -1 : 1)}px, ${-scrollY * 0.2}px) scale(${scale})`,
      transition: 'opacity 0.6s ease-out, transform 0.3s ease-out',
      filter: 'blur(0.5px)',
      transformOrigin: 'center center',
    };
  };

  const clouds = [
    // Original clouds
    { x: -5, y: 0, size: 20, speed: 0.15 },     // Left cloud
    { x: 50, y: -5, size: 26, speed: 0.2 },     // Center cloud
    { x: 105, y: -2, size: 22, speed: 0.25 },   // Right cloud
    { x: 20, y: -8, size: 16, speed: 0.18 },    // Small left cloud
    { x: 80, y: -10, size: 18, speed: 0.22 },   // Small right cloud
    // Additional clouds
    { x: -15, y: -12, size: 24, speed: 0.17 },  // Far left cloud
    { x: 35, y: -3, size: 19, speed: 0.23 },    // Left-center cloud
    { x: 65, y: -7, size: 21, speed: 0.19 },    // Right-center cloud
    { x: 95, y: -15, size: 17, speed: 0.21 },   // Far right cloud
    { x: 10, y: -6, size: 23, speed: 0.16 }     // Additional left cloud
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white pt-20 overflow-hidden"
      role="banner"
      aria-label="Welcome to Rainbow Paws"
    >
      {/* Video Background & Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Enhanced multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-primary/80 to-background/90 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 z-15" />
        <div className="absolute inset-0 bg-black/20 z-10" /> {/* Additional overlay for better text contrast */}
        <video
          autoPlay muted loop playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 transform blur-[3px]"
          aria-hidden="true"
          ref={(el) => {
            if (el) {
              el.playbackRate = 0.75;
            }
          }}
        >
          <source src="/media/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Enhanced Cloud Layer with better visibility */}
      <div className="absolute inset-0 z-[25] pointer-events-none overflow-visible">
        {clouds.map((cloud, index) => (
          <img
            key={index}
            src="/media/cloud.png"
            alt=""
            className="absolute max-w-[90vw] mix-blend-screen"
            style={getCloudStyles(
              cloud.x,
              cloud.y,
              cloud.size,
              cloud.speed
            )}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Enhanced main heading with stronger text-shadow */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4 leading-tight animate-fade-down text-white [text-shadow:_3px_3px_6px_rgb(0_0_0_/_60%)] ${getDelay(1)}`}
          >
            Rainbow <span className="text-[#FF8A2B] font-bold [text-shadow:_2px_2px_4px_rgb(0_0_0_/_60%),_0_0_20px_rgba(255,138,43,0.4)]">Paws</span>
          </h1>
          
          {/* Enhanced tagline with better visibility */}
          <p className={`text-xl md:text-2xl mb-6 text-white/95 font-semibold [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)] ${getDelay(2)}`}>
            Honoring Your Pet's Memory with Grace
          </p>

          <div
            className={`w-28 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 animate-fade-right ${getDelay(3)}`}
          />
          
          {/* Main description text */}
          <p
            className={`text-xl md:text-2xl mb-12 text-white/95 max-w-2xl mx-auto leading-relaxed animate-fade-up ${getDelay(4)} [text-shadow:_1px_1px_3px_rgb(0_0_0_/_50%)]`}
          >
            Providing dignified and compassionate memorial services for your
            beloved companions with{' '}
            <span className="text-[#FF8A2B]/95 font-medium [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">grace</span> and{' '}
            <span className="text-[#FF8A2B]/95 font-medium [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">respect</span>.
          </p>

          {/* Enhanced button styling with consistent heights and rounded corners */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-stretch gap-y-4 gap-x-6 animate-fade-up ${getDelay(5)}`}
          >
            <Button
              size="lg" asChild
              variant="default"
              className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl min-h-[3.5rem] hover:shadow-primary/20"
            >
              <Link href="/start" className="relative overflow-hidden px-8">
                <span className="relative z-10">Begin Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              </Link>
            </Button>
            <Button
              variant="outline" 
              size="lg" 
              asChild
              className="border-white/40 hover:border-white text-white hover:text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl min-h-[3.5rem] hover:shadow-accent/20"
            >
              <Link href="/providers" className="px-8">
                Join Our Provider Network
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-40 ${getDelay(7)}`}
      >
        <div 
          className="relative group cursor-pointer"
          onClick={() => {
            const memorialSection = document.getElementById('memorial-services');
            if (memorialSection) {
              memorialSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="absolute -inset-2.5 bg-primary/20 rounded-full blur-lg animate-pulse group-hover:scale-110 transition-transform duration-300" />
          <ChevronDown
            className="w-9 h-9 text-white relative z-10 group-hover:text-accent transition-colors duration-300"
            strokeWidth={1.25}
          />
        </div>
      </div>
    </section>
  );
}