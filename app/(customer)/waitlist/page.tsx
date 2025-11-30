import WaitlistForm from "@/components/waitlist/WaitlistForm";
import ComprehensiveHero from "@/components/waitlist/ComprehensiveHero";
import ScrollingServices from "@/components/waitlist/ScrollingServices";
import AppScreenshotCarousel from "@/components/waitlist/AppScreenshotCarousel";
import LaunchAnnouncement from "@/components/waitlist/LaunchAnnouncement";
import Image from "next/image";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-300 animate-slide-down">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/images/logos/survd-logo.png"
              alt="Survd"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/survdofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@survdofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 lg:px-4 pt-32 pb-20 md:py-20 lg:pt-20 bg-gradient-to-br from-primary/5 via-white to-gray-50 waitlist-hero-section">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Comprehensive Hero */}
            <div className="animate-fade-in-up animation-delay-200">
              <ComprehensiveHero />
            </div>

            {/* Right Side - Waitlist Form */}
            <div className="animate-fade-in-up animation-delay-400">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left animate-fade-in-up">
                  For Clients
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-center lg:text-left animate-fade-in-up animation-delay-100">
                  Say goodbye to booking hassles and waiting rooms. Get
                  professional services on your schedule.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-200">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Book in Seconds
                      </h3>
                      <p className="text-gray-600">
                        No more phone calls or waiting on hold. Browse, book,
                        and confirm instantly through the app.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-300">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Mobile & In-Home Services
                      </h3>
                      <p className="text-gray-600">
                        Get services at your home, office, or any location that
                        works for you. We bring the experience to you.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-400">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Verified Professionals
                      </h3>
                      <p className="text-gray-600">
                        All service providers are vetted and rated by the
                        community. Book with confidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-500">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Available 24/7
                      </h3>
                      <p className="text-gray-600">
                        Early morning or late night - book services that fit
                        your schedule, not the other way around.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20 animate-scale-in animation-delay-300">
                <div className="max-w-[320px] mx-auto">
                  <AppScreenshotCarousel
                    screenshots={[
                      "/images/screenshots/customer/CustomerScreenShot1.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot2.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot3.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot4.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot6.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot7.jpeg",
                      "/images/screenshots/customer/CustomerScreenShot8.jpeg",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Vendors */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20 animate-scale-in animation-delay-300">
                  <div className="max-w-[320px] mx-auto">
                    <AppScreenshotCarousel
                      screenshots={[
                        "/images/screenshots/vendor/VendorScreenShot1.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot2.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot3.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot4.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot5.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot6.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot7.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot8.jpeg",
                        "/images/screenshots/vendor/VendorScreenShot9.jpeg",
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left animate-fade-in-up">
                  For Service Providers
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-center lg:text-left animate-fade-in-up animation-delay-100">
                  Break free from traditional shops. Build your independent
                  business and earn more.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-200">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Earn More
                      </h3>
                      <p className="text-gray-600">
                        Keep more of what you earn. No shop commission eating
                        into your profits - go independent and grow your income.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-300">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Growing Customer Base
                      </h3>
                      <p className="text-gray-600">
                        Get discovered by thousands of potential clients
                        actively looking for your services.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-400">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Manage Your Schedule
                      </h3>
                      <p className="text-gray-600">
                        Set your own hours, accept bookings on your terms, and
                        manage everything from one dashboard.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-fade-in-up animation-delay-500">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Build Your Brand
                      </h3>
                      <p className="text-gray-600">
                        Create your profile, showcase your work, and build a
                        reputation that brings repeat customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Announcement */}
      <LaunchAnnouncement />

      {/* Services Preview */}
      <section className="bg-gray-50 py-16 border-t border-gray-300 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
            Services Available at Launch
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            From beauty and wellness to home services and vehicle care - all
            available at your convenience
          </p>
          <div className="animate-fade-in animation-delay-300">
            <ScrollingServices />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logos/survd-logo.png"
                alt="Survd"
                width={100}
                height={33}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Survd. All rights reserved.
            </div>
          </div>
          <div className="text-center mt-4">
            <a
              href="/home"
              className="text-xs text-transparent hover:text-gray-400 transition-colors duration-300 select-none"
            >
              test web app ;)
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
