'use client';

const services = {
  row1: [
    { name: 'Barbers', icon: '✂️' },
    { name: 'Hairdressers', icon: '💇' },
    { name: 'Tattoos', icon: '🖊️' },
    { name: 'Massage', icon: '💆' },
    { name: 'Nails', icon: '💅' },
    { name: 'Hairstyle', icon: '💇‍♀️' },
    { name: 'Jet Wash', icon: '🚿' },
    { name: 'Window Cleaners', icon: '🪟' },
    { name: 'Estheticians', icon: '✨' },
    { name: 'Personal Shopper', icon: '🛍️' },
    { name: 'Gardeners', icon: '🌱' },
    { name: 'Piercing', icon: '💎' },
  ],
  row2: [
    { name: 'Concierge', icon: '🔑' },
    { name: 'Painter', icon: '🎨' },
    { name: 'Makeup Artist', icon: '💄' },
    { name: 'Handyman', icon: '🔧' },
    { name: 'Private Chef', icon: '👨‍🍳' },
    { name: 'Car Wash', icon: '🚗' },
    { name: 'Sneaker Cleaning', icon: '👟' },
    { name: 'Car Breakdown', icon: '🔧' },
    { name: 'Domestic Services', icon: '🏠' },
    { name: 'Shoe Cleaning', icon: '👞' },
    { name: 'Meal Prep', icon: '🍱' },
  ],
  row3: [
    { name: 'Mobile Laundry', icon: '👕' },
    { name: 'Mobile Detail', icon: '✨' },
    { name: 'Health & Wellness', icon: '💪' },
    { name: 'Face Cleanse', icon: '🧖' },
    { name: 'Logistics', icon: '📦' },
    { name: 'Groceries', icon: '🛒' },
    { name: 'Garden Services', icon: '🌿' },
    { name: 'Painting', icon: '🖌️' },
    { name: 'Vehicle Services', icon: '🚙' },
    { name: 'Photography', icon: '📸' },
    { name: 'Car Detailing', icon: '🧽' },
  ],
};

export default function ScrollingServices() {
  return (
    <div>
      {/* Row 1 - Scrolling Left */}
      <div className="relative mb-4">
        <div className="flex gap-4 animate-scroll-left">
          {services.row1.concat(services.row1).map((service, index) => (
            <div
              key={`row1-${index}`}
              className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <div className="text-gray-800 text-sm font-medium">{service.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="relative mb-4">
        <div className="flex gap-4 animate-scroll-right">
          {services.row2.concat(services.row2).map((service, index) => (
            <div
              key={`row2-${index}`}
              className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <div className="text-gray-800 text-sm font-medium">{service.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Scrolling Left */}
      <div className="relative">
        <div className="flex gap-4 animate-scroll-left">
          {services.row3.concat(services.row3).map((service, index) => (
            <div
              key={`row3-${index}`}
              className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <div className="text-gray-800 text-sm font-medium">{service.name}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 25s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 25s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
