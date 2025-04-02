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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="our-promise">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Our Promise to You</h2>
          <p className="text-gray-600 text-lg">Committed to providing compassionate and dignified services</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {promises.map((promise) => (
            <div 
              key={promise.title} 
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-8">
                <promise.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {promise.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}