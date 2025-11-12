'use client';

import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal steps one by one with delays
            setTimeout(() => setVisibleSteps((prev) => [...prev, 0]), 300);
            setTimeout(() => setVisibleSteps((prev) => [...prev, 1]), 900);
            setTimeout(() => setVisibleSteps((prev) => [...prev, 2]), 1500);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: 'Choose Your Service',
      description: 'Browse from over 30 professional services - from beauty and wellness to home maintenance and vehicle care.',
    },
    {
      number: 2,
      title: 'Book Instantly',
      description: 'Select your preferred time and location. Whether at home, office, or on the go - we come to you.',
    },
    {
      number: 3,
      title: 'Enjoy Your Service',
      description: 'Relax while skilled professionals deliver quality service at your convenience. Rate and review when done.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
          Get professional services in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
