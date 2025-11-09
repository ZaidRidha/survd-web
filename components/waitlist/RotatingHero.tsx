'use client';

import { useState, useEffect } from 'react';

const heroSlides = [
  {
    badge: 'Coming Soon',
    title: (
      <>
        Introducing
        <br />
        <span className="text-gray-900">Survd</span>
      </>
    ),
    description: 'Connect with independent professionals for haircuts, laundry, nail techs, and more - all on your schedule, at your location.',
    benefits: [
      'Book instantly, no phone calls',
      'Mobile & in-home services',
      'Verified professionals',
    ],
  },
  {
    badge: 'For Clients',
    title: (
      <>
        Save Time,
        <br />
        <span className="text-primary">Live Better</span>
      </>
    ),
    description: 'No more waiting rooms or rushing to appointments. Professional services come to you - at home, at work, or wherever you need them.',
    benefits: [
      'Available 24/7 to fit your schedule',
      'Skip the commute and waiting',
      'Pay securely through the app',
    ],
  },
  {
    badge: 'For Vendors',
    title: (
      <>
        Go Independent,
        <br />
        <span className="text-primary">Earn More</span>
      </>
    ),
    description: 'Break free from shop commissions. Set your own rates, manage your schedule, and keep more of what you earn.',
    benefits: [
      'Higher earnings, no shop fees',
      'Access to growing customer base',
      'Full control of your business',
    ],
  },
  {
    badge: 'Over 30 Services',
    title: (
      <>
        Everything You Need,
        <br />
        <span className="text-primary">One Platform</span>
      </>
    ),
    description: 'From beauty and wellness to home maintenance and vehicle care - find all the services you need in one convenient app.',
    benefits: [
      'Barbers, hairstylists, massage therapists',
      'Car detailing, cleaning, handyman',
      'Personal chefs, photographers & more',
    ],
  },
];

export default function RotatingHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const slide = heroSlides[currentSlide];

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
        {slide.title}
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">
        {slide.description}
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">30+</div>
          <div className="text-sm text-gray-600">Services</div>
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
          <div className="text-sm text-gray-600">Professionals</div>
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="space-y-3">
        {slide.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-700">{benefit}</p>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center gap-3 mt-8">
        {/* Left Arrow */}
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
              setIsTransitioning(false);
            }, 300);
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
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
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
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
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
