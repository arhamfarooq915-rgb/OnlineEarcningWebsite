import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, breadcrumb, backgroundImage = "/generalImage.jpg" }: PageHeaderProps) {
  return (
    <section className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
          {title}
        </h1>
        
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="text-sm md:text-base">
            <span className="opacity-80">Home</span>
            <span className="mx-2 opacity-60">/</span>
            <span className="font-medium">{breadcrumb}</span>
          </nav>
        )}
      </div>
    </section>
  );
}