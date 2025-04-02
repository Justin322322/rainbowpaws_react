import { Heart, Leaf, Star } from 'lucide-react';

export function OurPromise() {
  const promises = [
    {
      title: 'With Honor',
      description: 'We ensure every farewell reflects the depth of love shared between you and your cherished companion, honoring their unique spirit.',
      icon: Star
    },
    {
      title: 'With Care',
      description: 'Our gentle approach provides comfort in difficult moments, offering environmentally mindful services that respect both memory and nature.',
      icon: Leaf
    },
    {
      title: 'With Love',
      description: 'Each pet receives the same loving care we would give to our own, because we understand the profound bond you shared.',
      icon: Heart
    }
  ];

  return (
    <section className="py-24 bg-background" id="our-promise">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-primary">Our Promise to You</h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-secondary-foreground/80 text-lg">Committed to providing compassionate and dignified services</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {promises.map((promise) => (
            <div 
              key={promise.title} 
              className="bg-secondary/80 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <promise.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-primary">
                {promise.title}
              </h3>
              <p className="text-secondary-foreground/80 leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}