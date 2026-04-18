import Image from 'next/image';
import Link from 'next/link';
import AboutComponent from './components/AboutComponent';
import GlobalLogisticsHomeComponent from './components/GlobalLogisticsHomeComponent';
import TeamComponent from './components/TeamComponent';
import ExpertInsightComponent from './components/ExpertInsightComponent';
import PartnersComponent from './components/PartnersComponent';

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/home/craneImg.jpg"
              alt="Logistics and shipping containers"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-white">
            <div className="max-w-2xl">
              {/* Welcome text */}
              <p className="text-sm md:text-base mb-4 font-medium">
                Welcome to SK International Logistics
              </p>
              
              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Empower Your Business with Better Logistics
              </h1>
              
              {/* Description */}
              <div className="mb-8 space-y-2">
                <p className="text-lg md:text-xl">
                  Your trusted partner for seamless global shipping and transport solutions.
                </p>
                <p className="text-base md:text-lg opacity-90">
                  From road to air, ocean to rail, we move your goods with speed, safety and precision.
                </p>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col gap-4 items-start">
                <Link
                  href="/status"
                  className="px-8 py-4 text-white font-semibold text-sm transition-colors hover:opacity-90 sm:rounded-md"
                  style={{ backgroundColor: '#1d2d8c' }}
                >
                  FIND JOB STATUS
                </Link>
                <Link
                  href="/apply"
                  className="px-8 py-4 text-white font-semibold text-sm transition-colors hover:opacity-90 sm:rounded-md"
                  style={{ backgroundColor: '#f13005' }}
                >
                  APPLY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* About Component */}
      <AboutComponent />

      {/* Global Logistics Home Component */}
      <GlobalLogisticsHomeComponent />

      {/* Team Component */}
      <TeamComponent />

      {/* Expert Insight Component */}
      <ExpertInsightComponent />

      {/* Partners Component */}
      <PartnersComponent />
    </>
  );
}
