import Image from 'next/image';
import Link from 'next/link';
import { expertInsightsList } from '../expertInsight.js';

export default function ExpertInsightComponent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            className="text-sm font-semibold uppercase tracking-wide mb-4 block"
            style={{ color: '#f13005' }}
          >
            EXPERT INSIGHTS
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#1d2d8c' }}
          >
            Experts Insights
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Skilled logistics professionals ensuring your goods arrive safely and on time, 
            every time.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertInsightsList.map((insight) => (
            <div 
              key={insight.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Insight Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Insight Content */}
              <div className="p-6">
                {/* Title */}
                <h3 
                  className="text-lg md:text-xl font-bold mb-3 leading-tight"
                  style={{ color: '#1d2d8c' }}
                >
                  {insight.title.toUpperCase()}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                  {insight.description}
                </p>

                {/* Learn More Button */}
                <div className="pt-2">
                  <Link
                    href={insight.readMoreLink}
                    className="inline-block px-8 py-3 text-white font-normal text-sm uppercase transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#f13005' }}
                  >
                    LEARN MORE
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