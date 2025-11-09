'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AppScreenshotCarouselProps {
  screenshots: string[];
  interval?: number;
}

export default function AppScreenshotCarousel({
  screenshots,
  interval = 4000
}: AppScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, screenshots.length, interval]); // Reset interval when slide changes

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }

    if (isRightSwipe) {
      goToPrevious();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      {/* Screenshot Display */}
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative aspect-[9/19]">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={screenshot}
                alt={`App Screenshot ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Desktop: beside image, Mobile: below image */}
      <button
        onClick={goToPrevious}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition"
        aria-label="Previous screenshot"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition"
        aria-label="Next screenshot"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Mobile Navigation Arrows - Below image */}
      <div className="flex md:hidden justify-center gap-12 mt-4">
        <button
          onClick={goToPrevious}
          className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition"
          aria-label="Previous screenshot"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition"
          aria-label="Next screenshot"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex
                ? 'bg-primary w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
