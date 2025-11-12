'use client';

import { useState } from 'react';
import {
  Scissors,
  Sparkles,
  Trophy,
  Heart,
  Droplets,
  Home,
  ShoppingBag,
  Flower2,
  Key,
  Paintbrush,
  Palette,
  Wrench,
  ChefHat,
  Car,
  Footprints,
  UtensilsCrossed,
  Shirt,
  Package,
  ShoppingCart,
  Leaf,
  Camera
} from 'lucide-react';
import { GiEarrings } from 'react-icons/gi';

const pastelColors = [
  'text-pink-400',
  'text-purple-400',
  'text-blue-400',
  'text-cyan-400',
  'text-teal-400',
  'text-green-400',
  'text-lime-400',
  'text-yellow-400',
  'text-orange-400',
  'text-rose-400',
  'text-indigo-400',
  'text-violet-400',
];

const services = {
  row1: [
    { name: 'Barbers', icon: Scissors, color: 'text-blue-400' },
    { name: 'Hairdressers', icon: Sparkles, color: 'text-pink-400' },
    { name: 'Sports Booking', icon: Trophy, color: 'text-orange-400' },
    { name: 'Massage', icon: Heart, color: 'text-rose-400' },
    { name: 'Nails', icon: Sparkles, color: 'text-purple-400' },
    { name: 'Hairstyle', icon: Scissors, color: 'text-cyan-400' },
    { name: 'Jet Wash', icon: Droplets, color: 'text-blue-400' },
    { name: 'Window Cleaners', icon: Home, color: 'text-teal-400' },
    { name: 'Estheticians', icon: Sparkles, color: 'text-violet-400' },
    { name: 'Personal Shopper', icon: ShoppingBag, color: 'text-pink-400' },
    { name: 'Gardeners', icon: Flower2, color: 'text-green-400' },
    { name: 'Piercing', icon: GiEarrings, color: 'text-indigo-400' },
  ],
  row2: [
    { name: 'Concierge', icon: Key, color: 'text-yellow-400' },
    { name: 'Painter', icon: Paintbrush, color: 'text-purple-400' },
    { name: 'Makeup Artist', icon: Palette, color: 'text-pink-400' },
    { name: 'Handyman', icon: Wrench, color: 'text-orange-400' },
    { name: 'Private Chef', icon: ChefHat, color: 'text-rose-400' },
    { name: 'Car Wash', icon: Car, color: 'text-cyan-400' },
    { name: 'Sneaker Cleaning', icon: Footprints, color: 'text-lime-400' },
    { name: 'Car Breakdown', icon: Wrench, color: 'text-orange-400' },
    { name: 'Domestic Services', icon: Home, color: 'text-teal-400' },
    { name: 'Shoe Cleaning', icon: Footprints, color: 'text-blue-400' },
    { name: 'Meal Prep', icon: UtensilsCrossed, color: 'text-green-400' },
    { name: 'Padel Bookings', icon: Trophy, color: 'text-violet-400' },
  ],
  row3: [
    { name: 'Mobile Laundry', icon: Shirt, color: 'text-cyan-400' },
    { name: 'Mobile Detail', icon: Sparkles, color: 'text-yellow-400' },
    { name: 'Health & Wellness', icon: Heart, color: 'text-rose-400' },
    { name: 'Face Cleanse', icon: Sparkles, color: 'text-pink-400' },
    { name: 'Logistics', icon: Package, color: 'text-orange-400' },
    { name: 'Groceries', icon: ShoppingCart, color: 'text-green-400' },
    { name: 'Garden Services', icon: Leaf, color: 'text-teal-400' },
    { name: 'Painting', icon: Paintbrush, color: 'text-purple-400' },
    { name: 'Vehicle Services', icon: Car, color: 'text-blue-400' },
    { name: 'Photography', icon: Camera, color: 'text-indigo-400' },
    { name: 'Car Detailing', icon: Sparkles, color: 'text-violet-400' },
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
          {services.row1.concat(services.row1).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={`row1-${index}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className={`w-10 h-10 ${service.color}`} strokeWidth={1.5} />
                </div>
                <div className="text-gray-800 text-sm font-medium">{service.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="relative mb-4">
        <div className="flex gap-4 animate-scroll-right">
          {services.row2.concat(services.row2).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={`row2-${index}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className={`w-10 h-10 ${service.color}`} strokeWidth={1.5} />
                </div>
                <div className="text-gray-800 text-sm font-medium">{service.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3 - Scrolling Left */}
      <div className="relative">
        <div className="flex gap-4 animate-scroll-left">
          {services.row3.concat(services.row3).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={`row3-${index}`}
                className="bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200 flex-shrink-0 w-32"
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className={`w-10 h-10 ${service.color}`} strokeWidth={1.5} />
                </div>
                <div className="text-gray-800 text-sm font-medium">{service.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition shadow-sm"
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
                {allServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200"
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent className={`w-10 h-10 ${service.color}`} strokeWidth={1.5} />
                      </div>
                      <div className="text-gray-800 text-sm font-medium">{service.name}</div>
                    </div>
                  );
                })}
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
