'use client';

import { Button } from '@/components/ui/button';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { Menu, Heart } from 'lucide-react';

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-primary/10">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Rainbow Paws Home">
          <div className="relative">
            <img
              src="/media/dog.png"
              alt="Rainbow Paws Logo"
              className="h-10 w-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <Heart className="absolute -right-1 -top-1 w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <span className="font-playfair font-semibold text-xl text-primary">
            Rainbow Paws
          </span>
        </Link>

        <NavigationMenu.Root className="relative hidden md:block">
          <NavigationMenu.List className="flex space-x-12">
            {[
              { id: 'memorial-services', label: 'Memorial Services' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'our-promise', label: 'Our Promise' },
              { id: 'why-choose', label: 'Why Choose Us' }
            ].map((item) => (
              <NavigationMenu.Item key={item.id}>
                <NavigationMenu.Link asChild>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-all duration-200 py-2 relative 
                    after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent 
                    after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
                    before:absolute before:bottom-0 before:left-1/2 before:w-1 before:h-[2px] before:bg-accent/50
                    before:scale-0 hover:before:scale-100 before:transition-transform before:duration-200"
                  >
                    {item.label}
                  </button>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden md:inline-flex text-secondary-foreground/80 hover:text-primary hover:bg-accent/5 transition-all duration-200"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-accent hover:bg-accent/90 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02] border-none"
          >
            <Link href="/join">Join Us</Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-secondary-foreground/80 hover:text-primary hover:bg-accent/5 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}