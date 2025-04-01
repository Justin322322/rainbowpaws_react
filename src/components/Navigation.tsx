import * as React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Navigation() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Rainbow Paws Logo" className="h-10 w-10" />
          <span className="font-semibold text-xl tracking-tight">Rainbow Paws</span>
        </div>
        
        <NavigationMenu.Root className="relative hidden md:block">
          <NavigationMenu.List className="flex space-x-8">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link 
                  href="/memorial-services" 
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Memorial Services
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link 
                  href="/how-it-works" 
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link 
                  href="/our-promise" 
                  className="text-base font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Our Promise
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="hidden md:inline-flex hover:text-primary"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button 
            size="sm" 
            asChild
            className="bg-gradient-to-r from-primary to-emerald-700 hover:opacity-90 transition-opacity border border-emerald-300 shadow-lg"
          >
            <Link href="/join">Join Us</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}