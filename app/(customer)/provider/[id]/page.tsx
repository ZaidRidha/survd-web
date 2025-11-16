'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Dummy data
const dummyProviders = [
  {
    id: 1,
    name: 'Mike The Barber',
    username: '@mikethebarber',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800',
    ],
    isActive: true,
    specialty: 'Barber',
    serviceDescription: 'Professional barbering services with over 10 years of experience. Specializing in modern fades, classic cuts, and beard grooming.',
    location: {
      address: '123 High Street, London, UK',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    contact: {
      phone: '+44 20 1234 5678',
      instagram: '@mikethebarber'
    },
    serviceTypes: [
      { label: 'In-Shop', icon: 'storefront-outline' },
      { label: 'Walk-ins Welcome', icon: 'walk-outline' }
    ],
    staff: [
      {
        id: 1,
        name: 'Mike Johnson',
        role: 'Master Barber',
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
        specialties: ['Fades', 'Beard Trims']
      }
    ],
    additionalInfo: {
      additionalInfo1: 'Cash and card accepted',
      additionalInfo2: 'Free parking available',
      additionalInfo3: 'Wheelchair accessible',
    }
  },
  {
    id: 2,
    name: 'Sarah Styles',
    username: '@sarahstyles',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    ],
    isActive: false,
    specialty: 'Hairstylist',
    serviceDescription: 'Award-winning hairstylist specializing in color, balayage, and creative styling. Making you look and feel amazing is my passion!',
    location: {
      address: '456 Beauty Lane, London, UK',
      coordinates: { lat: 51.5155, lng: -0.1415 }
    },
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    contact: {
      phone: '+44 20 9876 5432',
      instagram: '@sarahstyles'
    },
    serviceTypes: [
      { label: 'In-Shop', icon: 'storefront-outline' },
      { label: 'Mobile Service', icon: 'car-outline' }
    ],
    staff: [
      {
        id: 1,
        name: 'Sarah Williams',
        role: 'Lead Stylist',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
        specialties: ['Color', 'Balayage', 'Styling']
      }
    ],
    additionalInfo: {
      additionalInfo1: 'Patch test required 48 hours before color services',
      additionalInfo2: 'Premium product brands used',
      additionalInfo3: 'Consultation included',
    }
  }
];

const dummyServices = {
  1: {
    popular: [
      { id: 1, name: 'Haircut', price: 25, duration: '30 Minutes', description: 'Classic haircut with wash and style', extras: [
        { id: 1, name: 'Beard Trim', price: 10, duration: '15 Minutes', description: 'Professional beard shaping and trim' },
        { id: 2, name: 'Hot Towel Shave', price: 15, duration: '20 Minutes', description: 'Traditional hot towel shave' }
      ]},
      { id: 2, name: 'Haircut & Beard Trim', price: 35, duration: '45 Minutes', description: 'Complete grooming package', extras: [] },
    ],
    grooming: [
      { id: 3, name: 'Skin Fade', price: 30, duration: '40 Minutes', description: 'Precision skin fade with styling', extras: [] },
      { id: 4, name: 'Beard Sculpting', price: 20, duration: '30 Minutes', description: 'Detailed beard shaping and design', extras: [] },
    ]
  },
  2: {
    popular: [
      { id: 5, name: 'Cut & Blow Dry', price: 45, duration: '60 Minutes', description: 'Haircut with professional blow dry and style', extras: [
        { id: 3, name: 'Treatment', price: 15, duration: '15 Minutes', description: 'Deep conditioning treatment' }
      ]},
      { id: 6, name: 'Balayage', price: 120, duration: '180 Minutes', description: 'Natural-looking highlights', extras: [] },
    ],
    treatments: [
      { id: 7, name: 'Hair Color', price: 85, duration: '120 Minutes', description: 'Full head color application', extras: [] },
      { id: 8, name: 'Keratin Treatment', price: 150, duration: '180 Minutes', description: 'Smoothing keratin treatment', extras: [] },
    ]
  }
};

const dummyReviews = {
  1: [
    { id: 1, userName: 'John Smith', rating: 5, reviewText: 'Best barber in London! Mike is a true professional and always delivers exactly what I want.', timestamp: '2 weeks ago', verifiedPurchase: true },
    { id: 2, userName: 'David Jones', rating: 5, reviewText: 'Fantastic service, great atmosphere, and excellent results every time.', timestamp: '1 month ago', verifiedPurchase: true },
    { id: 3, userName: 'Tom Brown', rating: 4, reviewText: 'Really good haircut, just had to wait a bit longer than expected.', timestamp: '2 months ago', verifiedPurchase: false },
  ],
  2: [
    { id: 4, userName: 'Emma Wilson', rating: 5, reviewText: 'Sarah is amazing! My hair has never looked better. The balayage is perfect!', timestamp: '1 week ago', verifiedPurchase: true },
    { id: 5, userName: 'Sophie Taylor', rating: 5, reviewText: 'Incredible talent and such a lovely person. Highly recommend!', timestamp: '3 weeks ago', verifiedPurchase: true },
  ]
};

interface Extra {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
}

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
  duration: string;
  extras?: Extra[];
}

interface SelectedService {
  service: Service;
  selectedExtras: number[];
}

export default function ProviderPage() {
  const params = useParams();
  const router = useRouter();
  const providerId = Number(params.id);

  const provider = dummyProviders.find(p => p.id === providerId) || dummyProviders[0];
  const services = dummyServices[providerId as keyof typeof dummyServices] || dummyServices[1];
  const reviews = dummyReviews[providerId as keyof typeof dummyReviews] || [];

  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews' | 'about'>('services');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
  const [cart, setCart] = useState<SelectedService[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [portfolioModalIndex, setPortfolioModalIndex] = useState<number | null>(null);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const reviewCount = reviews.length;

  const toggleExtra = (extraId: number) => {
    setSelectedExtras(prev =>
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  const calculateServicePrice = (service: Service, extras: number[]) => {
    let total = service.price;
    service.extras?.forEach(extra => {
      if (extras.includes(extra.id)) total += extra.price;
    });
    return total;
  };

  const calculateEstimatedDuration = () => {
    if (!selectedService) return '0 min';
    let totalMinutes = parseInt(selectedService.duration.replace(/\D/g, ''));
    selectedService.extras?.forEach(extra => {
      if (selectedExtras.includes(extra.id)) {
        totalMinutes += parseInt(extra.duration.replace(/\D/g, ''));
      }
    });
    return `${totalMinutes} min`;
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + calculateServicePrice(item.service, item.selectedExtras), 0);
  };

  const handleAddService = () => {
    if (!selectedService) return;
    setCart([...cart, { service: selectedService, selectedExtras: [...selectedExtras] }]);
    setSelectedService(null);
    setSelectedExtras([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 sm:gap-8">
              <a href="/home" className="flex items-center flex-shrink-0">
                <Image
                  src="/images/logos/survd-logo.png"
                  alt="Survd"
                  width={100}
                  height={33}
                  className="h-7 sm:h-8 w-auto"
                />
              </a>
              <nav className="hidden sm:flex items-center gap-2">
                <a
                  href="/home"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Home
                </a>
                <a
                  href="/explore"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Explore
                </a>
                <a
                  href="/appointments"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  Appointments
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
              <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all hover:text-gray-900 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <a href="/profile" className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden border-t border-gray-200">
          <div className="flex items-center justify-around px-2 py-2">
            <a
              href="/home"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </a>
            <a
              href="/explore"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Explore</span>
            </a>
            <a
              href="/appointments"
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Appointments</span>
            </a>
          </div>
        </div>
      </header>

      {/* Service Detail View */}
      {selectedService ? (
        <div className="max-w-3xl mx-auto px-6 py-8">
          <button
            onClick={() => {setSelectedService(null); setSelectedExtras([]);}}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Services</span>
          </button>

          {/* Service Card */}
          <div className="bg-white rounded-3xl p-8 mb-4 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedService.name}</h2>
              <p className="text-3xl font-bold text-gray-900">£{selectedService.price}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{selectedService.duration}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{selectedService.description}</p>
          </div>

          {/* Extras */}
          {selectedService.extras && selectedService.extras.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Extras</h3>
              <div className="space-y-3">
                {selectedService.extras.map(extra => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${
                      selectedExtras.includes(extra.id)
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{extra.name}</h4>
                        <p className="font-semibold text-gray-900">+£{extra.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{extra.description}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{extra.duration}</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedExtras.includes(extra.id)
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-300'
                      }`}>
                        {selectedExtras.includes(extra.id) && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duration */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-900">Total Duration: {calculateEstimatedDuration()}</span>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddService}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Add to Cart · £{calculateServicePrice(selectedService, selectedExtras)}
          </button>
        </div>
      ) : (
        <>
          {/* Cover Photo */}
          <div className="relative h-72 bg-gray-100">
            <Image src={provider.images[1] || provider.images[0]} alt={provider.name} fill className="object-cover" />
            {provider.isActive && (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-500 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs text-white font-semibold">Active Now</span>
              </div>
            )}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="relative w-40 h-40 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
                <Image src={provider.image} alt={provider.name} fill className="object-cover" />
              </div>
            </div>
            <button className="absolute bottom-6 right-6 bg-gray-900 text-white p-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>

          {/* Provider Info */}
          <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{provider.name}</h1>
              <p className="text-lg text-gray-500 mb-4">{provider.username}</p>
              {reviewCount > 0 && (
                <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100">
                  <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="font-bold text-gray-900">{averageRating}</span>
                  <span className="text-gray-500">({reviewCount})</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-100 mb-8">
              <div className="flex gap-8 justify-center">
                {[
                  { id: 'services', label: 'Services' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'about', label: 'About' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 font-semibold transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                {services.popular && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Services</h2>
                    <div className="space-y-3">
                      {services.popular.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {setSelectedService(service); setSelectedExtras([]);}}
                          className="w-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-gray-900">{service.name}</h3>
                            <p className="font-bold text-gray-900">£{service.price}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{service.description}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{service.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {services.grooming && services.grooming.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Grooming</h2>
                    <div className="space-y-3">
                      {services.grooming.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {setSelectedService(service); setSelectedExtras([]);}}
                          className="w-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="font-bold text-gray-900">£{service.price}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{service.description}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{service.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {services.treatments && services.treatments.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Treatments</h2>
                    <div className="space-y-3">
                      {services.treatments.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {setSelectedService(service); setSelectedExtras([]);}}
                          className="w-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="font-bold text-gray-900">£{service.price}</p>
                          </div>
                          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{service.description}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{service.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {provider.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setPortfolioModalIndex(index)}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:opacity-95 transition-opacity group"
                  >
                    <Image src={image} alt={`Portfolio ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                {reviews.length > 0 ? (
                  <>
                    <div className="bg-gray-50 rounded-3xl p-8 mb-6 flex items-center gap-8 border border-gray-100">
                      <div className="text-6xl font-bold text-gray-900">{averageRating}</div>
                      <div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600">{reviewCount} reviews</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {(showAllReviews ? reviews : reviews.slice(0, 3)).map(review => (
                        <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                              {review.verifiedPurchase && (
                                <span className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs text-green-600 font-medium">
                                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current text-yellow-500' : 'fill-current text-gray-200'}`} viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-2">{review.reviewText}</p>
                          <p className="text-sm text-gray-400">{review.timestamp}</p>
                        </div>
                      ))}
                    </div>

                    {reviews.length > 3 && (
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-100 text-gray-700 py-3 rounded-2xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        {showAllReviews ? 'Show Less' : `View ${reviews.length - 3} More Reviews`}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{provider.serviceDescription}</p>
                </div>

                {provider.staff && provider.staff.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Our Team</h2>
                    {provider.staff.map(member => (
                      <div key={member.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                          <Image src={member.image} alt={member.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                          <div className="flex gap-2">
                            {member.specialties.map((specialty, idx) => (
                              <span key={idx} className="text-xs bg-gray-50 px-3 py-1 rounded-full text-gray-600 border border-gray-100">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-white rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Options</h2>
                  <div className="flex flex-wrap gap-3">
                    {provider.serviceTypes.map((type, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${provider.location.coordinates.lat},${provider.location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{provider.location.address}</span>
                  </a>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100">
                    <iframe
                      src={`https://www.google.com/maps?q=${provider.location.coordinates.lat},${provider.location.coordinates.lng}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h2>
                  <div className="space-y-3">
                    {Object.entries(provider.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2 text-sm">
                        <span className="font-medium text-gray-900 capitalize">{day}</span>
                        <span className="text-gray-500">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
                  <div className="space-y-3">
                    <a href={`https://instagram.com/${provider.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="text-sm font-medium">{provider.contact.instagram}</span>
                    </a>
                    <a href={`tel:${provider.contact.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm font-medium">{provider.contact.phone}</span>
                    </a>
                  </div>
                </div>

                {(provider.additionalInfo.additionalInfo1 || provider.additionalInfo.additionalInfo2 || provider.additionalInfo.additionalInfo3) && (
                  <div className="bg-white rounded-3xl p-8 border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Good to Know</h2>
                    <ul className="space-y-2">
                      {provider.additionalInfo.additionalInfo1 && <li className="flex items-start gap-3"><span className="text-gray-300 mt-1">•</span><span className="text-gray-600 text-sm leading-relaxed">{provider.additionalInfo.additionalInfo1}</span></li>}
                      {provider.additionalInfo.additionalInfo2 && <li className="flex items-start gap-3"><span className="text-gray-300 mt-1">•</span><span className="text-gray-600 text-sm leading-relaxed">{provider.additionalInfo.additionalInfo2}</span></li>}
                      {provider.additionalInfo.additionalInfo3 && <li className="flex items-start gap-3"><span className="text-gray-300 mt-1">•</span><span className="text-gray-600 text-sm leading-relaxed">{provider.additionalInfo.additionalInfo3}</span></li>}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Cart Footer */}
      {!selectedService && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl z-50">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-0.5">{cart.length} service{cart.length > 1 ? 's' : ''} selected</p>
                <p className="text-2xl font-bold text-gray-900">£{calculateCartTotal()}</p>
              </div>
              <button
                onClick={() => router.push(`/booking/${providerId}`)}
                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {portfolioModalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4">
          <button
            onClick={() => setPortfolioModalIndex(null)}
            className="absolute top-6 right-6 text-white p-3 hover:bg-white hover:bg-opacity-10 rounded-2xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl w-full aspect-square">
            <Image src={provider.images[portfolioModalIndex]} alt="Portfolio" fill className="object-contain" />
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {provider.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPortfolioModalIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === portfolioModalIndex ? 'bg-white w-8' : 'bg-white bg-opacity-40 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
