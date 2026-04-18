import Image from 'next/image';
import Link from 'next/link';
import { globalLogisticHomeList } from '../globalLogisticHome.js';

export default function GlobalLogisticsHomeComponent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            className="text-sm font-semibold uppercase tracking-wide mb-4 block"
            style={{ color: '#f13005' }}
          >
            OUR SERVICE
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#1d2d8c' }}
          >
            Global Logistics Made Simple
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Fast, secure, and cost effective shipping by road, air, sea, and rail plus 
            warehousing, packaging, and express delivery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {globalLogisticHomeList.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                {/* Title */}
                <h3 
                  className="text-lg md:text-xl font-bold mb-3 leading-tight uppercase"
                  style={{ color: '#1d2d8c' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                  {service.description}
                </p>

                {/* Read More Button */}
                <div className="pt-2">
                  <Link
                    href={service.readMoreLink}
                    className="inline-block px-8 py-3 text-white font-normal text-sm uppercase transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#f13005' }}
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}