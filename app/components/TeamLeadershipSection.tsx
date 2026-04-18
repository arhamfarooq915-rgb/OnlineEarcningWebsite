import Image from 'next/image';

export default function TeamLeadershipSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Content */}
            <div className="order-2 lg:order-1">
              {/* Main Heading */}
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#1d2d8c' }}
              >
                EXPERIENCE THE CREATIVITY AND TOGETHERNESS
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Company team is a group of Shadow Courrier within an organization who 
                collaborate to achieve common goals and objectives. These teams are 
                formed to leverage the collective expertise of employees, improve 
                communication and collaboration, and increase productivity.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative h-80 md:h-96 lg:h-[450px] rounded-lg overflow-hidden">
                <Image
                  src="/teams/teamLeader.jpg"
                  alt="Team leader working at desk with analytics dashboard"
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