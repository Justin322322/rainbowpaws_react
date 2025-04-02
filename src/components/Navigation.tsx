'use client';

import { Button } from '@/components/ui/button';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 z-50 border-b border-border/40 shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Rainbow Paws Home">
          <img
            src="/media/dog.png"
            alt="Rainbow Paws Logo"
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-semibold text-lg text-primary tracking-tight">
            Rainbow Paws
          </span>
        </Link>

        <NavigationMenu.Root className="relative hidden md:block">
          <NavigationMenu.List className="flex space-x-10">
            {[

              { id: 'memorial-services', label: 'Memorial Services' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'our-promise', label: 'Our Promise' },
            ].map((item) => (
              <NavigationMenu.Item key={item.id}>
                <NavigationMenu.Link asChild>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary after:origin-center after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {item.label}
                  </button>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}

          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden md:inline-flex text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors duration-200"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out border-none shadow-md hover:shadow-lg transform hover:scale-[1.03] focus:scale-[1.03]"
          >
            <Link href="/join">Join Us</Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}