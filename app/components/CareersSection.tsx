'use client';

import { useState } from 'react';

export default function CareersSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    department: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Career application submitted:', formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left side - Content (Mobile: First, Desktop: Left) */}
            <div className="order-1">
              {/* Section Label */}
              <div className="mb-6">
                <span 
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: '#f13005' }}
                >
                  Careers
                </span>
              </div>

              {/* Main Heading */}
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#1d2d8c' }}
              >
                Interested In Joining Our Team?
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 lg:mb-0">
                Interest in joining a team, focus on what excites you about the company and 
                the specific role, and how your skills and experience align with their needs 
                and goals.
              </p>
            </div>

            {/* Right side - Form (Mobile: Second, Desktop: Right) */}
            <div className="order-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Row - First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                    style={{ borderRadius: '4px' }}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                    style={{ borderRadius: '4px' }}
                    required
                  />
                </div>

                {/* Second Row - Phone and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                    style={{ borderRadius: '4px' }}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500"
                    style={{ borderRadius: '4px' }}
                    required
                  />
                </div>

                {/* Third Row - Department Selection */}
                <div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700"
                    style={{ borderRadius: '4px' }}
                    required
                  >
                    <option value="">Select a Department</option>
                    <option value="logistics">Logistics</option>
                    <option value="operations">Operations</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="finance">Finance</option>
                    <option value="hr">Human Resources</option>
                    <option value="it">Information Technology</option>
                  </select>
                </div>

                {/* Fourth Row - Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 text-gray-700 placeholder-gray-500 resize-vertical"
                    style={{ borderRadius: '4px' }}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 text-white font-bold text-sm uppercase transition-colors hover:opacity-90"
                    style={{ 
                      backgroundColor: '#f13005',
                      borderRadius: '4px'
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>

              {/* Bottom Info Box */}
              <div 
                className="mt-6 p-4 text-white text-sm leading-relaxed"
                style={{ 
                  backgroundColor: '#1d2d8c',
                  borderRadius: '4px'
                }}
              >
                "Any questions" is a phrase used to invite or solicit questions from an audience or 
                individual, typically after a presentation, explanation, or discussion.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}