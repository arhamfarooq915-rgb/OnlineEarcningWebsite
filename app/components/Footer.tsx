import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const services = [
    { name: 'Ocean Freight', href: '#' },
    { name: 'Road Transport', href: '#' },
    { name: 'Air Freight', href: '#' },
    { name: 'Warehousing', href: '#' },
    { name: 'Cargo Insurance', href: '#' },
  ];

  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="SK International Logistics"
                width={150}
                height={75}
                className="h-12 w-auto"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              SK International Logistics provides fast, secure, and cost-effective shipping by road, air, sea, and rail, with trusted warehousing and express options worldwide.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: '#f13005' }}
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: '#f13005' }}
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: '#f13005' }}
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: '#f13005' }}
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: '#f13005' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-xl font-semibold flex items-center"
                    style={{ color: '#1d2d8c' }}
                  >
                    <span className="mr-3 text-3xl font-bold" style={{ color: '#f13005', lineHeight: '1' }}>›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: '#f13005' }}
            >
              Our Services
            </h3>
            <ul className="space-y-5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-xl font-semibold flex items-center"
                    style={{ color: '#1d2d8c' }}
                  >
                    <span className="mr-3 text-3xl font-bold" style={{ color: '#f13005', lineHeight: '1' }}>›</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 
              className="text-2xl font-bold mb-8"
              style={{ color: '#f13005' }}
            >
              Information
            </h3>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <FaPhone 
                   className="mt-1 text-2xl" 
                  style={{ color: '#f13005' }} 
                />
                <div>
                  <p className="text-lg font-bold" style={{ color: '#1d2d8c' }}>
                    +91 8822021340
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <FaEnvelope 
                  className="mt-1 text-2xl" 
                  style={{ color: '#f13005' }} 
                />
                <div>
                  <p className="text-lg font-bold" style={{ color: '#1d2d8c' }}>
                    info@skinternationallogistic.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt 
                  className="mt-1 text-2xl" 
                  style={{ color: '#f13005' }} 
                />
                <div>
                  <p className="text-lg font-bold" style={{ color: '#1d2d8c' }}>
                    123 King Street West,<br />
                    Suite 500 Toronto, ON<br />
                    M5H 1A1, Canada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div 
        className="py-6"
        style={{ backgroundColor: '#f13005' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white text-base font-medium">
              © {currentYear} SK International Logistics. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}