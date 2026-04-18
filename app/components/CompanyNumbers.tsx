'use client';

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function Counter({ end, duration, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

export default function CompanyNumbers() {
  const stats = [
    {
      number: 1350,
      suffix: '',
      label: 'Offices & Logistic Facilities'
    },
    {
      number: 80,
      suffix: '+',
      label: 'Countries Worldwide'
    },
    {
      number: 65000,
      suffix: '+',
      label: 'Professional Workers'
    }
  ];

  return (
    <section 
      className="relative py-16 my-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/home/craneImg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient Overlay - Red to Purple */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(241, 48, 5, 0.85) 0%, rgba(139, 69, 19, 0.85) 50%, rgba(75, 0, 130, 0.85) 100%)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            
            {/* Left side - Title */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Our Company In Number
              </h2>
            </div>

            {/* Right side - Stats */}
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <Counter 
                  end={stat.number} 
                  duration={3} 
                  suffix={stat.suffix}
                />
                <p className="text-white text-sm md:text-base font-medium opacity-90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}