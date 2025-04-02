'use client';

import { useState } from 'react';

interface Service {
  title: string;
  description: string;
  features: string[];
  details?: {
    description: string;
  };
}

export function MemorialServices() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const services: Service[] = [
    {
      title: 'Private Memorial',
      description: 'An intimate farewell ceremony in our serene memorial hall, personalized to honor your beloved companion\'s unique spirit.',
      features: [
        '2-3 hours duration',
        'Up to 30 guests',
        'Personalized tribute'
      ],
      details: {
        description: 'Our private memorial service offers a dignified and intimate setting to celebrate your pet\'s life. The ceremony includes personalized readings, photo tributes, and the option for attendees to share memories. Our compassionate staff will guide you through creating a meaningful ceremony that perfectly reflects your pet\'s personality and your family\'s wishes.'
      }
    },
    {
      title: 'Memorial Ceremonies',
      description: 'Beautiful ceremonies to celebrate your pet\'s life, including memorial services and tribute presentations.',
      features: [
        'Customized ceremony',
        'Professional celebrant',
        'Memorial keepsakes'
      ],
      details: {
        description: 'Our memorial ceremonies are thoughtfully crafted to celebrate the unique bond you shared with your pet. Led by experienced celebrants, these ceremonies incorporate meaningful rituals, music, and shared memories. We offer various ceremony styles to match your preferences and beliefs.'
      }
    },
    {
      title: 'Home Services',
      description: 'Compassionate at-home memorial services for a peaceful farewell in familiar surroundings.',
      features: [
        'In-Home Care',
        'Flexible scheduling',
        'Private setting'
      ],
      details: {
        description: 'Our home services bring the comfort and dignity of a memorial service to your personal space. Our experienced team will help transform your chosen area into a serene memorial setting, allowing your pet to be honored in the comfort of familiar surroundings. This option provides maximum privacy and flexibility for your family.'
      }
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
          {services.map((service) => (
            <div 
              key={service.title}
              className="h-[28rem] perspective-1000"
              onClick={() => flippedCard === service.title && setFlippedCard(null)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedCard === service.title ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-auto backface-hidden bg-background/80 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">{service.title}</h3>
                      <p className="text-secondary-foreground/80 leading-relaxed mb-6">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start text-gray-700">
                            <svg
                              className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1"
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
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 sticky bottom-0 bg-background/80 pt-4">
                      <button 
                        className="text-primary hover:text-accent font-medium flex items-center transition-colors uppercase tracking-wider text-sm group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(service.title);
                        }}
                      >
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
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-auto backface-hidden bg-background/80 rounded-sm p-8 shadow-xl border border-primary/20 rotate-y-180"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">{service.title}</h3>
                      <p className="text-secondary-foreground/80 leading-relaxed">{service.details?.description}</p>
                    </div>
                    <div className="mt-6 sticky bottom-0 bg-background/80 pt-4">
                      <button 
                        className="text-primary hover:text-accent font-medium flex items-center transition-colors uppercase tracking-wider text-sm group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(null);
                        }}
                      >
                        Back to overview
                        <svg
                          className="w-5 h-5 ml-2 rotate-180 group-hover:-translate-x-1 transition-transform"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}