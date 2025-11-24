'use client';

import { useEffect, useRef, useState } from 'react';

export default function LaunchAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10 border-t border-gray-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2
            className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            We Go Live December 2025
          </h2>

          {/* Description */}
          <p
            className={`text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            We're putting the final touches on something special. Join the waitlist to be among the first to experience the future of on-demand services.
          </p>

          {/* Partnership CTA Box */}
          <div
            className={`bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Want to Be Part of Our Launch?
              </h3>
              <p className="text-lg text-gray-600">
                We're looking for vendors to feature and partners to collaborate with
              </p>
            </div>

            {/* Contact Button */}
            <div className="text-center">
              <a
                href="mailto:contact@survd.co.uk"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch - contact@survd.co.uk
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Limited featured spots available for our launch period
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
