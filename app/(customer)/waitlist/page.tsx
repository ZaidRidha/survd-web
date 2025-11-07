import WaitlistForm from '@/components/waitlist/WaitlistForm';
import Image from 'next/image';

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/images/survd-logo.png"
              alt="Survd"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-gray-800">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-6 text-primary border border-primary/20">
                Coming Soon
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                The Future of Local Service Booking
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Join thousands of customers and vendors getting ready for launch
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">For Customers</h3>
                    <p className="text-gray-600">Book appointments with local barbers, hairstylists, and more in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">For Vendors</h3>
                    <p className="text-gray-600">Grow your business with powerful booking management and client tools</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600 text-sm">On Waitlist</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600 text-sm">Cities</div>
                </div>
              </div>
            </div>

            {/* Right Side - Waitlist Form */}
            <div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-gray-50 py-16 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Services Available at Launch
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Barber', icon: '✂️', color: 'category-barber' },
              { name: 'Hairstylist', icon: '💇', color: 'category-hairstylist' },
              { name: 'Nails', icon: '💅', color: 'category-nails' },
              { name: 'Makeup', icon: '💄', color: 'category-makeup' },
              { name: 'Massage', icon: '💆', color: 'category-massage' },
              { name: 'Laundry', icon: '👕', color: 'category-laundry' },
              { name: 'Tattoo', icon: '🖊️', color: 'category-tattoo' },
              { name: 'Piercing', icon: '💎', color: 'category-piercing' },
            ].map((service) => (
              <div
                key={service.name}
                className={`bg-white rounded-xl p-4 text-center hover:shadow-md transition border border-gray-200`}
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <div className="text-gray-800 text-sm font-medium">{service.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
