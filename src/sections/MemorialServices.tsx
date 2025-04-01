interface Service {
  title: string;
  description: string;
  features: string[];
}

export function MemorialServices() {
  const services: Service[] = [
    {
      title: 'Private Memorial',
      description: 'An intimate farewell ceremony in our serene memorial hall, personalized to honor your beloved companion\'s unique spirit.',
      features: [
        '2-3 hours duration',
        'Up to 30 guests',
        'Personalized tribute'
      ]
    },
    {
      title: 'Memorial Ceremonies',
      description: 'Beautiful ceremonies to celebrate your pet\'s life, including memorial services and tribute presentations.',
      features: [
        'Customized ceremony',
        'Professional celebrant',
        'Memorial keepsakes'
      ]
    },
    {
      title: 'Home Services',
      description: 'Compassionate at-home memorial services for a peaceful farewell in familiar surroundings.',
      features: [
        'In-Home Care',
        'Flexible scheduling',
        'Private setting'
      ]
    }
  ];

  return (
    <section className="py-24 bg-secondary" id="memorial-services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-primary">Memorial Services</h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-secondary-foreground/80 text-lg">Choose the perfect way to honor your beloved companion's memory</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <div 
              key={service.title}
              className="bg-background/80 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-playfair font-semibold text-primary">{service.title}</h3>
                <p className="text-secondary-foreground/80 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature: string) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-accent mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 text-primary hover:text-accent font-medium flex items-center transition-colors uppercase tracking-wider text-sm">
                  Learn more
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}