import Image from 'next/image';

export default function PartnersComponent() {
  const partners = [
    { id: 1, image: '/home/partners/partner1.png', alt: 'Partner 1' },
    { id: 2, image: '/home/partners/partner2.png', alt: 'Partner 2' },
    { id: 3, image: '/home/partners/partner3.png', alt: 'Partner 3' },
  ];

  // Repeat partners to create a continuous row
  const repeatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#1d2d8c' }}
          >
            Our Partners
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Skilled logistics professionals ensuring your goods arrive safely and on time, 
            every time.
          </p>
        </div>

        {/* Partners Marquee */}
        <div className="overflow-hidden relative pt-6 border-t border-gray-100">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center p-4 mx-3 hover:scale-110 transition-transform duration-300"
              >
                <div className="relative w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28">
                  <Image
                    src={partner.image}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}