'use client';

import { useState, useEffect } from 'react';
import { Scissors, Home, Shirt, UtensilsCrossed } from 'lucide-react';
import { GiNails } from 'react-icons/gi';

export default function ComprehensiveHero() {
  const rotatingServices = [
    'Barbers',
    'Laundry',
    'Shoe Cleaning',
    'Nail Techs',
    'Cleaners',
    'Meal Prep',
    'Car Detailing',
    'Personal Training',
  ];

  const services = [
    { icon: Scissors, name: 'Barbers', color: 'text-blue-400' },
    { icon: Home, name: 'Cleaners', color: 'text-teal-400' },
    { icon: Shirt, name: 'Laundry', color: 'text-cyan-400' },
    { icon: GiNails, name: 'Nail Techs', color: 'text-purple-400' },
    { icon: UtensilsCrossed, name: 'Meal Prep', color: 'text-green-400' },
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % rotatingServices.length);
        setIsAnimating(false);
      }, 200);
    }, 1500);

    return () => clearInterval(interval);
  }, [rotatingServices.length]);

  return (
    <div className="text-center md:text-left">
      {/* Title - Fixed height */}
      <h1 className="text-5xl md:text-6xl font-bold mb-2 md:mb-3 leading-tight text-gray-900 h-[120px] md:h-[140px] flex items-center justify-center md:justify-start">
        <span className="text-center md:text-left">
          Introducing
          <br />
          <span className="text-black">
            Survd
          </span>
        </span>
      </h1>

      {/* Rotating Service Text - Fixed height */}
      <div className="h-[80px] md:h-[90px] mb-0 flex items-start justify-center md:justify-start overflow-visible">
        <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center md:text-left">
          Book{' '}
          <span className="inline-block min-w-[200px] md:min-w-[280px] text-left">
            <span
              className={`text-black transition-all duration-300 ${
                isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
              }`}
              style={{ display: 'inline-block' }}
            >
              {rotatingServices[currentServiceIndex]}
            </span>
          </span>
        </p>
      </div>

      {/* Content Area */}
      <div>
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Available</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">30+</div>
            <div className="text-sm text-gray-600 font-medium">Services</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">500+</div>
            <div className="text-sm text-gray-600 font-medium">Professionals</div>
          </div>
        </div>

        {/* Compact Services Preview */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1.5 bg-gradient-to-br from-white to-gray-50 rounded-lg p-2 border border-gray-200"
              >
                <IconComponent className={`w-6 h-6 ${service.color}`} strokeWidth={1.5} />
                <span className="text-xs text-gray-700 font-medium text-center leading-tight">{service.name}</span>
              </div>
            );
          })}
        </div>

        {/* Key Benefits */}
        <div className="space-y-2 flex flex-col items-center md:items-start mb-8">
          {[
            'Book instantly, no phone calls',
            'Mobile & in-home services',
            'Verified professionals',
            'Cheap low commission for vendors',
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
