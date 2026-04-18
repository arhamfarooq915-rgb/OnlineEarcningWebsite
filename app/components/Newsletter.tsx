'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section 
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/home/craneImg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient Overlay - Blue to Orange */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(135deg, rgba(29, 45, 140, 0.85) 0%, rgba(241, 48, 5, 0.85) 100%)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 tracking-wide">
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news, offers, and insights from our team — delivered straight to your inbox.
          </p>
          
          {/* Newsletter Form - Stacked rows */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
            {/* Email Input Row */}
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 text-gray-700 text-lg placeholder-gray-400 focus:outline-none rounded-md"
              required
            />
            {/* Sign Up Button Row */}
            <button
              type="submit"
              className="w-full py-4 font-bold text-lg uppercase tracking-widest rounded-md transition-opacity hover:opacity-90 focus:outline-none"
              style={{ backgroundColor: '#f13005', color: 'white' }}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}