'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function LogisticBeyondExpectation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/aboutLogisticsImages/logisticsImage.png',
    '/aboutLogisticsImages/logisticImage2.png',
    '/aboutLogisticsImages/logisticImage3.png'
  ];

  const features = [
    'Fast Service',
    '100% Accuracy',
    'Safety & Guarantee'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // 5 second interval

    return () => clearInterval(slideInterval);
  }, [images.length]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Content */}
            <div className="order-2 lg:order-1 px-4 lg:px-0">
              {/* Section Label */}
              <div className="mb-6">
                <span 
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: '#f13005' }}
                >
                  VISION & STRATEGY
                </span>
              </div>

              {/* Main Heading */}
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#1d2d8c' }}
              >
                LOGISTIC BEYOND EXPECTATION
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                We don't just deliver goods — we deliver reliability, speed, and service that exceed 
                industry standards and customer expectations.
              </p>

              {/* Features */}
              <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 text-white font-semibold text-sm"
                    style={{ backgroundColor: '#1d2d8c' }}
                  >
                    {feature}
                  </div>
                ))}
              </div>

              {/* Bottom Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                Swift and dependable delivery solutions designed to meet your tightest 
                deadlines — every time.
              </p>
            </div>

            {/* Right side - Image Slider */}
            <div className="order-1 lg:order-2 -mx-4 lg:mx-0">
              <div className="relative h-80 md:h-96 lg:h-[450px] lg:rounded-lg overflow-hidden lg:shadow-lg">
                {/* Current Image Display */}
                <div className="relative w-full h-full">
                  <Image
                    src={images[currentSlide]}
                    alt={`Logistics operation ${currentSlide + 1}`}
                    fill
                    className="object-cover transition-opacity duration-1000"
                    priority={currentSlide === 0}
                  />
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}