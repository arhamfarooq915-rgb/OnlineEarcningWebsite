import Image from 'next/image';
import Link from 'next/link';
import { servicesList } from '../servicesList.js';

export default function GlobalLogistics() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
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
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Fast, secure, and cost-effective shipping by road, air, sea, and rail plus 
              warehousing, packaging, and express delivery.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                  {/* Service Title */}
                  <h3 
                    className="text-xl font-bold mb-3 uppercase text-center"
                    style={{ color: '#1d2d8c' }}
                  >
                    {service.title}
                  </h3>

                  {/* Salary Information */}
                  <div className="text-center mb-4">
                    <p className="text-gray-600 text-sm mb-1">
                      Average Monthly Salary: <span className="font-semibold">{service.averageSalary}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                      Pay per: <span className="font-semibold">{service.payPer}</span>
                    </p>
                  </div>

                  {/* Apply Now Button */}
                  <div className="text-center">
                    <Link
                      href="/apply"
                      className="inline-block px-6 py-3 text-white font-bold text-sm uppercase transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#f13005' }}
                    >
                      APPLY NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}