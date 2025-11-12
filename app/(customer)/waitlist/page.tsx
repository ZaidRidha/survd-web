import WaitlistForm from '@/components/waitlist/WaitlistForm';
import RotatingHero from '@/components/waitlist/RotatingHero';
import ScrollingServices from '@/components/waitlist/ScrollingServices';
import AppScreenshotCarousel from '@/components/waitlist/AppScreenshotCarousel';
import Image from 'next/image';

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/images/logos/survd-logo.png"
              alt="Survd"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20 md:py-20 lg:pt-20 bg-gradient-to-br from-primary/5 via-white to-gray-50 waitlist-hero-section">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Rotating Content */}
            <div>
              <RotatingHero />
            </div>

            {/* Right Side - Waitlist Form */}
            <div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Get professional services in three simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Service</h3>
              <p className="text-gray-600">
                Browse from over 30 professional services - from beauty and wellness to home maintenance and vehicle care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Instantly</h3>
              <p className="text-gray-600">
                Select your preferred time and location. Whether at home, office, or on the go - we come to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy Your Service</h3>
              <p className="text-gray-600">
                Relax while skilled professionals deliver quality service at your convenience. Rate and review when done.
              </p>
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
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                  For Clients
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-center lg:text-left">
                  Say goodbye to booking hassles and waiting rooms. Get professional services on your schedule.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Book in Seconds</h3>
                      <p className="text-gray-600">No more phone calls or waiting on hold. Browse, book, and confirm instantly through the app.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Mobile & In-Home Services</h3>
                      <p className="text-gray-600">Get services at your home, office, or any location that works for you. We bring the experience to you.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Verified Professionals</h3>
                      <p className="text-gray-600">All service providers are vetted and rated by the community. Book with confidence.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Available 24/7</h3>
                      <p className="text-gray-600">Early morning or late night - book services that fit your schedule, not the other way around.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20">
                <div className="max-w-[320px] mx-auto">
                  <AppScreenshotCarousel
                    screenshots={[
                      '/images/screenshots/customer/CustomerSideAppScreenshot1.jpeg',
                      '/images/screenshots/customer/CustomerSideAppScreenshot2.jpeg'
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
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/20">
                  <div className="max-w-[320px] mx-auto">
                    <AppScreenshotCarousel
                      screenshots={[
                        '/images/screenshots/vendor/VendorSideAppScreenshot1.jpeg',
                        '/images/screenshots/vendor/VendorSideAppScreenshot2.jpeg',
                        '/images/screenshots/vendor/VendorSideAppScreenshot3.jpeg',
                        '/images/screenshots/vendor/VendorSideAppScreenshot4.jpeg',
                        '/images/screenshots/vendor/VendorSideAppScreenshot5.jpeg'
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                  For Service Providers
                </h2>
                <p className="text-xl text-gray-600 mb-8 text-center lg:text-left">
                  Break free from traditional shops. Build your independent business and earn more.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Earn More</h3>
                      <p className="text-gray-600">Keep more of what you earn. No shop commission eating into your profits - go independent and grow your income.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Growing Customer Base</h3>
                      <p className="text-gray-600">Get discovered by thousands of potential clients actively looking for your services.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Manage Your Schedule</h3>
                      <p className="text-gray-600">Set your own hours, accept bookings on your terms, and manage everything from one dashboard.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 mt-1">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Build Your Brand</h3>
                      <p className="text-gray-600">Create your profile, showcase your work, and build a reputation that brings repeat customers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gray-50 py-16 border-t border-gray-300 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Services Available at Launch
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From beauty and wellness to home services and vehicle care - all available at your convenience
          </p>
          <ScrollingServices />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
        </div>
      </footer>
    </main>
  );
}
