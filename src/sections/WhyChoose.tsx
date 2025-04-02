import { CheckCircle, Heart, Map } from 'lucide-react';

export function WhyChoose() {
  const benefits = [
    {
      title: 'Verified Providers',
      description: 'All our service providers are thoroughly vetted and licensed professionals.',
      icon: CheckCircle,
      color: 'from-blue-500/20 to-blue-600/10'
    },
    {
      title: 'Compassionate Care',
      description: 'Treating every pet with dignity and every family with understanding.',
      icon: Heart,
      color: 'from-red-500/20 to-red-600/10'
    },
    {
      title: 'Nationwide Service',
      description: 'Connected with providers across the Philippines for accessible care.',
      icon: Map,
      color: 'from-emerald-500/20 to-emerald-600/10'
    }
  ];

  return (
    <section className="py-24 bg-white" id="why-choose">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Why Choose PawRest</h2>
          <p className="text-gray-600 text-lg">Experience the difference in our compassionate approach</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title} 
              className="relative bg-white rounded-2xl shadow-lg p-8"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6`}>
                <benefit.icon className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}