import WaitlistForm from '@/components/waitlist/WaitlistForm';

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Survd</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                Coming Soon
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                The Future of Local Service Booking
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Join thousands of customers and vendors getting ready for launch
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">For Customers</h3>
                    <p className="text-blue-100">Book appointments with local barbers, hairstylists, and more in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">For Vendors</h3>
                    <p className="text-blue-100">Grow your business with powerful booking management and client tools</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-blue-100 text-sm">On Waitlist</div>
                </div>
                <div className="h-12 w-px bg-white/20"></div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-100 text-sm">Cities</div>
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
      <section className="bg-white/10 backdrop-blur-md py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Services Available at Launch
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Barber', icon: '✂️' },
              { name: 'Hair', icon: '💇' },
              { name: 'Nails', icon: '💅' },
              { name: 'Spa', icon: '🧖' },
              { name: 'Massage', icon: '💆' },
              { name: 'Makeup', icon: '💄' },
              { name: 'Skincare', icon: '✨' },
              { name: 'More', icon: '🎯' },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition"
              >
                <div className="text-4xl mb-2">{service.icon}</div>
                <div className="text-white text-sm font-medium">{service.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
