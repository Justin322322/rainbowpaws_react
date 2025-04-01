import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white pt-20" role="banner" aria-label="Welcome to Rainbow Paws">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 animate-fade-in motion-safe:animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 leading-tight text-primary-foreground animate-gradient">
          A Gentle <span className="text-accent inline-block hover:scale-105 transition-transform">Farewell</span>
        </h1>
        <p className="text-lg md:text-xl mb-12 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed animate-fade-in motion-safe:animate-fade-up motion-safe:delay-200">
          Providing dignified and compassionate memorial services for your beloved companions with grace and respect
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fade-in motion-safe:animate-fade-up motion-safe:delay-300">
          <Button 
            size="lg" 
            asChild
            className="bg-accent text-accent-foreground hover:scale-105 transition-all duration-300 text-base shadow-lg hover:shadow-accent/20 border border-accent/30 uppercase tracking-wider"
          >
            <Link href="/start">Begin Your Journey</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            asChild
            className="backdrop-blur-sm bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 hover:scale-105 transition-all duration-300 text-base shadow-lg hover:shadow-primary-foreground/20 uppercase tracking-wider"
          >
            <Link href="/providers">Join Our Provider Network</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white/70" 
          fill="none" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}