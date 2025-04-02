import { CheckCircle, Heart, Map } from 'lucide-react';

export function WhyChoose() {
  const benefits = [
    {
      title: 'Verified Providers',
      description: 'All our service providers are thoroughly vetted and licensed professionals.',
      icon: CheckCircle
    },
    {
      title: 'Compassionate Care',
      description: 'Treating every pet with dignity and every family with understanding.',
      icon: Heart
    },
    {
      title: 'Nationwide Service',
      description: 'Connected with providers across the Philippines for accessible care.',
      icon: Map
    }
  ];

  return (
    <section className="py-24 bg-secondary" id="why-choose">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-primary">Why Choose Rainbow Paws</h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-secondary-foreground/80 text-lg">Experience the difference in our compassionate approach</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="bg-background/80 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <benefit.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold mb-4 text-primary">
                {benefit.title}
              </h3>
              <p className="text-secondary-foreground/80 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}