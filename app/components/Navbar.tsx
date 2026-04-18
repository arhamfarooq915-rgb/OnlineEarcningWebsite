'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Find Status', href: '/status' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block" style={{ backgroundColor: '#1d2d8c' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-white text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-xs" />
                <span>info@skinternationallogistic.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-xs" />
                <span>Toronto, ON, Canada</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-xs" />
                <span>Mon - Sat : 08:00 - 22:00</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f13005' }}>
                <FaFacebookF className="text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f13005' }}>
                <FaTwitter className="text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f13005' }}>
                <FaYoutube className="text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f13005' }}>
                <FaInstagram className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SK International Logistics"
                width={150}
                height={90}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: pathname === item.href ? '#f13005' : 'transparent',
                      color: pathname === item.href ? 'white' : '#1d2d8c'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/apply"
                className="px-6 py-3 text-white font-semibold text-sm rounded-md transition-colors hover:opacity-90"
                style={{ backgroundColor: '#f13005' }}
              >
                APPLY NOW
              </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
                style={{ color: '#f13005' }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Width */}
        {isMenuOpen && (
          <div 
            className="md:hidden absolute left-0 right-0 pb-4"
            style={{ backgroundColor: '#1d2d8c' }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium transition-colors"
                  style={{
                    color: pathname === item.href ? '#f13005' : 'white'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}