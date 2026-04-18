import Image from 'next/image';
import { teamList } from '../teamList.js';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function TeamComponent() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span 
            className="text-sm font-semibold uppercase tracking-wide mb-4 block"
            style={{ color: '#f13005' }}
          >
            OUR TEAM
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#1d2d8c' }}
          >
            Experts Behind Every Delivery
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Skilled logistics professionals ensuring your goods arrive safely and on time, 
            every time.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {teamList.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-lg overflow-visible hover:shadow-xl transition-shadow duration-300 w-full max-w-sm p-6"
            >
              {/* Member Image */}
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: '#f13005' }}
                >
                  {member.name}
                </h3>
                <p 
                  className="text-sm font-medium mb-4"
                  style={{ color: '#1d2d8c' }}
                >
                  {member.position}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <a
                    href={member.socialLinks.facebook}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#f13005' }}
                    aria-label={`${member.name} Facebook`}
                  >
                    <FaFacebookF className="text-white text-sm" />
                  </a>
                  <a
                    href={member.socialLinks.twitter}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#f13005' }}
                    aria-label={`${member.name} Twitter`}
                  >
                    <FaTwitter className="text-white text-sm" />
                  </a>
                  <a
                    href={member.socialLinks.linkedin}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ backgroundColor: '#f13005' }}
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <FaLinkedinIn className="text-white text-sm" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}