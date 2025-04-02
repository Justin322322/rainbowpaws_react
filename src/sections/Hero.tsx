import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react'; // Using a cleaner icon

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white pt-20 overflow-hidden" // Added overflow-hidden
      role="banner"
      aria-label="Welcome to Rainbow Paws"
    >
      {/* Video Background & Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Overlay: Darker gradient + subtle blur for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-primary/70 to-primary/80 z-10" />
        {/* Optional: Add a very subtle backdrop blur IF the video blur isn't enough
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-primary/70 to-primary/80 z-10 backdrop-blur-[2px]" />
        */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto" // Suggest 'auto' for potentially faster loading
          className="w-full h-full object-cover blur-md scale-105" // Increased blur slightly, scaled to prevent edge gaps
          aria-hidden="true"
        >
          <source src="/media/hero-background.mp4" type="video/mp4" />
          {/* Consider adding other formats like webm for better compatibility */}
          {/* <source src="/media/hero-background.webm" type="video/webm" /> */}
          Your browser does not support the video tag. {/* Fallback Text */}
        </video>
      </div>

      {/* Content - Enhanced Readability & Style */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 animate-fade-in motion-safe:animate-fade-up"> {/* Keeping original animation for simplicity */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight text-white text-shadow-md"> {/* Larger on lg, Added Text Shadow */}
          A Gentle <span className="italic text-amber-50">Farewell</span> {/* Emphasis with italics and subtle color shift */}
        </h1>
        <p className="text-lg md:text-xl mb-12 text-white/95 max-w-2xl mx-auto leading-relaxed text-shadow"> {/* Slightly brighter text, Added Text Shadow */}
          Providing dignified and compassionate memorial services for your beloved companions with grace and respect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fade-in motion-safe:animate-fade-up motion-safe:delay-200"> {/* Staggered delay kept */}
          {/* Primary Button: Enhanced Hover Effects */}
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out border-none shadow-lg hover:shadow-xl transform hover:scale-[1.03] focus:scale-[1.03]" // Added scale transform, transition-all
          >
            <Link href="/start">Begin Your Journey</Link>
          </Button>
          {/* Outline Button: Glassmorphism Style for Better Contrast */}
          <Button
            variant="outline"
            size="lg"
            asChild
            className="bg-white/10 text-white hover:bg-white/20 border-white/40 hover:border-white/70 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-[1.03] focus:scale-[1.03]" // Semi-transparent bg, lighter border, backdrop-blur, scale transform
          >
            <Link href="/providers">Join Our Provider Network</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - Refined */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20"> {/* Slightly higher, added z-index just in case */}
         <ChevronDown className="w-7 h-7 text-white/60 hover:text-white/80 transition-colors" strokeWidth={1.5}/> {/* Nicer icon, slightly larger, softer color, hover effect */}
      </div>
    </section>
  );
}

/* --- Notes & Required Tailwind Setup ---

1.  **Text Shadow Utilities (Add to `tailwind.config.js`)**:
    To use `text-shadow` and `text-shadow-md`, you need to define them. Add this plugin to your `tailwind.config.js`:
    ```javascript
    // tailwind.config.js
    const plugin = require('tailwindcss/plugin')

    module.exports = {
      // ... other config
      theme: {
        extend: {
          textShadow: {
            DEFAULT: '0 1px 3px var(--tw-shadow-color, rgba(0,0,0,0.4))', // Default subtle shadow
            md: '0 2px 5px var(--tw-shadow-color, rgba(0,0,0,0.5))',    // Medium shadow for headings
          },
          // ... other extensions
        },
      },
      plugins: [
        plugin(function ({ matchUtilities, theme }) {
          matchUtilities(
            {
              'text-shadow': (value) => ({
                textShadow: value,
              }),
            },
            { values: theme('textShadow') }
          )
        }),
        // ... other plugins
      ],
    }
    ```
    *Run your build process again after modifying the config.*

2.  **Icon Library (`lucide-react`)**:
    This code uses the `ChevronDown` icon from `lucide-react`. Make sure you have it installed:
    `npm install lucide-react` or `yarn add lucide-react`.

*/