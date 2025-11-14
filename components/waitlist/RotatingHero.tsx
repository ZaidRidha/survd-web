'use client';

import { useState, useEffect } from 'react';
import { Scissors, Car, Home, Shirt } from 'lucide-react';
import { GiNails, GiLotus } from 'react-icons/gi';

const heroSlides = [
  {
    title: (
      <>
        Introducing
        <br />
        <span className="text-black animate-title-emphasis">Survd</span>
      </>
    ),
    description: 'Connect with independent professionals for haircuts, laundry, nail techs, and more - all on your schedule, at your location.',
    benefits: [
      'Book instantly, no phone calls',
      'Mobile & in-home services',
      'Verified professionals',
    ],
    showStats: true,
  },
  {
    title: (
      <>
        All The Services
        <br />
        <span className="text-black animate-title-emphasis">You Need</span>
      </>
    ),
    description: 'From beauty and wellness to home maintenance and vehicle care - everything available on demand.',
    services: [
      { icon: Scissors, name: 'Barbers & Hairstylists', color: 'text-blue-400' },
      { icon: GiNails, name: 'Nail Techs', color: 'text-purple-400' },
      { icon: GiLotus, name: 'Massage Therapy', color: 'text-rose-400' },
      { icon: Car, name: 'Car Detailing', color: 'text-cyan-400' },
      { icon: Home, name: 'Cleaning Services', color: 'text-teal-400' },
      { icon: Shirt, name: 'Mobile Laundry', color: 'text-cyan-400' },
    ],
    showStats: false,
  },
  {
    title: (
      <>
        Book Anytime,
        <br />
        <span className="text-black animate-title-emphasis">Anywhere</span>
      </>
    ),
    description: 'Professional services come to you - at home, at work, or wherever you need them.',
    benefits: [
      'Book after hours and weekends',
      'See who\'s available near you',
      'Mobile & in-home services',
      'Buy now, pay later with Klarna',
      'Real-time availability tracking',
      'Instant booking confirmation',
    ],
    showStats: false,
  },
  {
    title: (
      <>
        Go Independent,
        <br />
        <span className="text-black animate-title-emphasis">Earn More</span>
      </>
    ),
    description: 'Cheaper than Booksy or Fresha. No subscription fees, just small commissions when you earn.',
    benefits: [
      'Very small commission rates',
      'No monthly subscription fees',
      'Easy-to-use management interface',
      'Sign up and start instantly',
      'Full customization & discoverability',
      'Built-in review system',
    ],
    showStats: false,
  },
];

export default function RotatingHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 300);
    }, 10000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [currentSlide]); // Reset interval when slide changes

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });

    // Prevent scrolling if this is a horizontal swipe
    if (touchStart) {
      const xDiff = Math.abs(e.targetTouches[0].clientX - touchStart.x);
      const yDiff = Math.abs(e.targetTouches[0].clientY - touchStart.y);

      // If horizontal movement is greater than vertical, prevent scroll
      if (xDiff > yDiff) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const xDistance = touchStart.x - touchEnd.x;
    const yDistance = touchStart.y - touchEnd.y;
    const xDistanceAbs = Math.abs(xDistance);
    const yDistanceAbs = Math.abs(yDistance);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (xDistanceAbs > yDistanceAbs && xDistanceAbs > 50) {
      const isLeftSwipe = xDistance > 50;
      const isRightSwipe = xDistance < -50;

      if (isLeftSwipe) {
        // Swipe left - go to next slide
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
          setIsTransitioning(false);
        }, 300);
      }

      if (isRightSwipe) {
        // Swipe right - go to previous slide
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
          setIsTransitioning(false);
        }, 300);
      }
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div
      className="text-center md:text-left touch-pan-y"
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-8 md:mb-10 leading-tight text-gray-900 h-[120px] md:h-[140px] flex items-center justify-center md:justify-start">
          <span className="text-center md:text-left">{slide.title}</span>
        </h1>

        {/* Description */}
        <div className="h-[80px] md:h-[72px] mb-8 flex items-start justify-center md:justify-start">
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed text-center md:text-left">
            {slide.description}
          </p>
        </div>

        {/* Content Area - Fixed height for consistency */}
        <div className="h-[320px] md:h-[300px] overflow-hidden">
          {/* Key Stats - Only show on first slide */}
          {slide.showStats && (
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Available</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">30+</div>
                <div className="text-sm text-gray-600 font-medium">Services</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-transparent rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Professionals</div>
              </div>
            </div>
          )}

          {/* Services Grid - Show on services slide */}
          {slide.services && (
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
              {slide.services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="group relative flex items-center gap-3 bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-6 h-6 ${service.color}`} strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-800 font-semibold text-sm">{service.name}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Benefits Preview */}
          {slide.benefits && (
            <div className="space-y-3 flex flex-col items-center md:items-start mb-8">
              {slide.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide Indicators - Static, outside transition */}
      <div className="flex items-center justify-center md:justify-start gap-3 mt-0 md:mt-8">
        {/* Left Arrow */}
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
              setIsTransitioning(false);
            }, 300);
          }}
          className="p-2 rounded-full bg-white border border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 text-gray-600 hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2 px-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-gradient-to-r from-green-600 to-emerald-600 shadow-md'
                  : 'w-2 bg-gray-300 hover:bg-green-400 hover:w-4'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
              setIsTransitioning(false);
            }, 300);
          }}
          className="p-2 rounded-full bg-white border border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 text-gray-600 hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
