export default function ContactInfoGrid() {
  const contactInfo = [
    {
      title: 'ADDRESS',
      content: (
        <div className="text-center">
          <p className="text-gray-600">123 King Street West, Suite 500 Toronto, ON M5H</p>
          <p className="text-gray-600">1A1, Canada</p>
        </div>
      )
    },
    {
      title: 'CALL US',
      content: (
        <div className="text-center">
          <p className="text-gray-600">+91 8822021340</p>
        </div>
      )
    },
    {
      title: 'MAIL US',
      content: (
        <div className="text-center">
          <p className="text-gray-600">info@skinternationallogistic.com</p>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Title */}
                <h3 
                  className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide"
                  style={{ color: '#1d2d8c' }}
                >
                  {info.title}
                </h3>
                
                {/* Content */}
                <div className="text-base md:text-lg">
                  {info.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}