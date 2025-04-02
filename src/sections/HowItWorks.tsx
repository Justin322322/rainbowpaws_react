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
    <section className="py-20 md:py-24 bg-gray-50" id="how-it-works"> 
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary"> 
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            A simple, caring process to honor your pet
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-12 md:space-y-0">

          {steps.map((step, index) => (
            // Use React.Fragment to handle mapping and conditional connectors without extra divs
            <React.Fragment key={step.number}>
              {/* Step Item */}
              <div className="flex flex-col items-center text-center md:flex-1 md:px-4"> {/* Added padding for spacing */}
                {/* Number Circle */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-5 font-bold text-xl flex-shrink-0 shadow-md"> {/* Adjusted size/margin */}
                  {step.number}
                </div>
                {/* Content */}
                <div className="flex-grow"> {/* Allow content to take vertical space */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p> {/* Slightly smaller text */}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-shrink-0 w-full md:w-auto md:flex-1 px-2 pt-[26px]"> {/* Adjust pt to vertically align line roughly with circle center */}
              
                   <div className="w-full h-px border-t-2 border-dashed border-primary/40"></div>
                  
                </div>
              )}
            </React.Fragment>
          ))}

        </div>
      </div>
    </section>
  );
}