'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    passportNumber: '',
    email: '',
    occupation: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            {/* Section Header */}
            <div className="mb-8">
              <span 
                className="text-sm font-semibold uppercase tracking-wide mb-4 block"
                style={{ color: '#f13005' }}
              >
                Send A Message
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                style={{ color: '#1d2d8c' }}
              >
                We'll get back to you shortly.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Need help or ready to ship? Our team is always just a message or call away. Let us 
                make your logistics simple with expert guidance and quick, reliable solutions.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Row - First Name */}
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                  required
                />
              </div>

              {/* Second Row - Last Name and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                  required
                />
              </div>

              {/* Third Row - Passport Number */}
              <div>
                <input
                  type="text"
                  name="passportNumber"
                  placeholder="Passport Number"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Fourth Row - Email and Occupation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Fifth Row - Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500 resize-vertical"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 text-white font-semibold text-sm uppercase rounded-md transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#f13005' }}
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/contactUsImage.jpg"
                alt="Logistics worker with safety equipment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}