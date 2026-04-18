import Image from 'next/image';
import Link from 'next/link';

export default function AboutComponent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/about-image.jpg"
                alt="Logistics workers at shipping containers"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: '#f13005' }}
                  >
                    20
                  </div>
                  <div 
                    className="text-sm font-semibold"
                    style={{ color: '#1d2d8c' }}
                  >
                    Years of Experience
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            {/* Section Label */}
            <div>
              <span 
                className="text-base font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-orange-50 inline-block mb-2"
                style={{ color: '#f13005' }}
              >
                ABOUT US
              </span>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ color: '#1d2d8c' }}
            >
              Your Gateway to Worldwide Delivery
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From local deliveries to global freight, SK International Logistics offers fast, secure, 
              and cost-effective transport by road, air, sea, and rail. We combine real-time tracking, 
              reliable warehousing, and professional packaging with flexible express options—
              delivering every shipment on schedule and within budget while keeping your goods 
              safe at every stage.
            </p>

            {/* Services */}
            <div className="space-y-6">
              {/* Global Service */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-20 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-3">
                    <Image
                      src="/aboutImgGlobalServicelogo.png"
                      alt="Global Service"
                      width={80}
                      height={80}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 
                    className="text-3xl font-medium mb-4"
                    style={{ color: '#1d2d8c' }}
                  >
                    Global Service
                  </h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    Ship worldwide with ease through our trusted network. We manage 
                    customs, tracking, and on-time delivery across 100+ countries.
                  </p>
                </div>
              </div>

              {/* Local Service */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-20 h-20 flex items-center justify-center bg-white rounded-2xl shadow-md p-3">
                    <Image
                      src="/aboutImgLocalServicelogo.png"
                      alt="Local Service"
                      width={80}
                      height={80}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 
                    className="text-3xl font-medium mb-4"
                    style={{ color: '#1d2d8c' }}
                  >
                    Local Service
                  </h3>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    Quick and reliable delivery within your city or region — perfect for 
                    urgent parcels and daily business needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-6">
              <Link
                href="/about"
                className="inline-block px-10 py-4 text-white font-bold text-lg rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: '#f13005' }}
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}