import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Choose a Service',
      description: 'Browse verified providers in your area and select the service.'
    },
    {
      number: 2,
      title: 'Book the Service',
      description: 'Schedule easily at your preferred time and location.'
    },
    {
      number: 3,
      title: 'Personalize',
      description: 'Work with the provider to customize the memorial service.'
    },
    {
      number: 4,
      title: 'Say Goodbye',
      description: 'Experience a dignified farewell with full support.'
    }
  ];

  return (
    <section className="py-24 bg-background" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-primary">
            How It Works
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-secondary-foreground/80 text-lg">
            A simple, caring process to honor your pet
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-12 md:space-y-0">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center text-center md:flex-1 md:px-6">
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center mb-6 font-bold text-xl shadow-md">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-playfair font-semibold mb-3 text-primary">{step.title}</h3>
                  <p className="text-secondary-foreground/80 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-shrink-0 w-full md:w-auto md:flex-1 px-2 pt-7">
                  <div className="w-full h-px border-t-2 border-dashed border-accent/30"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}