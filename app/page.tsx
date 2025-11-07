export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find & Book Local Services
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover barbers, hairstylists, nail technicians, and more in your area
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Get Started
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                For Businesses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Barber', icon: '✂️', color: 'bg-blue-100 text-blue-700' },
              { name: 'Hairstylist', icon: '💇', color: 'bg-purple-100 text-purple-700' },
              { name: 'Nails', icon: '💅', color: 'bg-pink-100 text-pink-700' },
              { name: 'Spa', icon: '🧖', color: 'bg-green-100 text-green-700' },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer"
              >
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-semibold text-xl mb-2">Find Nearby</h3>
              <p className="text-gray-600">Discover services in your local area</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-semibold text-xl mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book appointments in seconds</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold text-xl mb-2">Trusted Reviews</h3>
              <p className="text-gray-600">Read reviews from real customers</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
