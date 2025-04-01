import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { HowItWorks } from '@/sections/HowItWorks';
import { MemorialServices } from '@/sections/MemorialServices';
import { OurPromise } from '@/sections/OurPromise';
import { WhyChoose } from '@/sections/WhyChoose';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <MemorialServices />
      <HowItWorks />
      <OurPromise />
      <WhyChoose />
    </main>
  );
}
