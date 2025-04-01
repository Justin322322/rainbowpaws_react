export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Choose a Service',
      description: 'Browse our verified memorial service providers in your area and select the service that best honors your pet.'
    },
    {
      number: 2,
      title: 'Book the Service',
      description: 'Schedule the memorial service at your preferred time and location with our easy booking system.'
    },
    {
      number: 3,
      title: 'Personalize',
      description: 'Work with the provider to customize the memorial service according to your wishes and preferences.'
    },
    {
      number: 4,
      title: 'Say Goodbye',
      description: 'Experience a beautiful and dignified farewell ceremony for your beloved pet with full support.'
    }
  ];

  return (
    <section className="py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-gray-600 text-lg">A simple process designed with care and understanding</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent -translate-x-1/2 md:block hidden" />
          
          <div className="space-y-20 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-600 text-white font-bold text-2xl mb-6 shadow-lg shadow-primary/20">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Circle connector for mobile */}
                <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent md:hidden" />
                
                {/* Image placeholder - you can replace this with actual illustrations */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 aspect-video flex items-center justify-center">
                  <div className="text-gray-400">Step {step.number} Illustration</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}