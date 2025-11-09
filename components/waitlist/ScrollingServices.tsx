'use client';

import { useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allServices = [...services.row1, ...services.row2, ...services.row3];

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

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          View All Services
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">All Services</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allServices.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200"
                  >
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <div className="text-gray-800 text-sm font-medium">{service.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
            animation: scroll-left 15s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 15s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
