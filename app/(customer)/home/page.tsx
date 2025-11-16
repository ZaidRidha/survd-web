'use client';

import Image from 'next/image';
import { useState, type ReactElement } from 'react'; // 👈 add ReactElement type

// Service categories from mobile app with SVG icons
const serviceCategories = [
  { id: 'barber', name: 'Barber', color: '#6B9BD1' },
  { id: 'hairstylist', name: 'Hair Stylist', color: '#FF7B7B' },
  { id: 'makeup', name: 'Makeup', color: '#D190E3' },
  { id: 'nails', name: 'Nails', color: '#FF77A1' },
  { id: 'massage', name: 'Massage', color: '#5EC4F5' },
  { id: 'spa', name: 'Spa', color: '#4CAF50' },
  { id: 'cleaning', name: 'House Cleaning', color: '#4DD0E1' },
  { id: 'car-wash', name: 'Car Wash', color: '#29B6F6' },
  { id: 'photography', name: 'Photography', color: '#8D6E63' },
  { id: 'personal-training', name: 'Personal Training', color: '#FF6F00' },
];

// Icon component for categories
const CategoryIcon = ({ categoryId, className = "w-5 h-5" }: { categoryId: string; className?: string }) => {
  const icons: { [key: string]: ReactElement  } = {
    'barber': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    'hairstylist': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    'makeup': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    'nails': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
    'massage': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    'spa': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    'cleaning': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'car-wash': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'photography': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    'personal-training': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
  return icons[categoryId] || icons['cleaning'];
};

// Icon component for service types
const ServiceTypeIcon = ({ typeId, className = "w-4 h-4" }: { typeId: string; className?: string }) => {
  const icons: { [key: string]: ReactElement } = {
    'shop': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'mobile': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    'home': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  };
  return icons[typeId] || icons['shop'];
};

// Dummy reviews for rating calculation
const dummyReviews = [
  { businessId: 1, rating: 5 },
  { businessId: 1, rating: 5 },
  { businessId: 1, rating: 4 },
  { businessId: 2, rating: 5 },
  { businessId: 2, rating: 4 },
  { businessId: 3, rating: 5 },
  { businessId: 3, rating: 5 },
  { businessId: 3, rating: 5 },
  { businessId: 4, rating: 4 },
  { businessId: 4, rating: 5 },
  { businessId: 5, rating: 5 },
  { businessId: 6, rating: 4 },
  { businessId: 6, rating: 5 },
  { businessId: 7, rating: 4 },
  { businessId: 8, rating: 5 },
];

// Function to get rating for a business
const getBusinessRating = (businessId: number) => {
  const businessReviews = dummyReviews.filter(r => r.businessId === businessId);
  if (businessReviews.length === 0) return { averageRating: 0, reviewCount: 0 };

  const sum = businessReviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = parseFloat((sum / businessReviews.length).toFixed(1));

  return { averageRating, reviewCount: businessReviews.length };
};

// Real dummy data from mobile app
const dummyBusinesses = [
  {
    id: 1,
    name: 'Mike The Barber',
    username: '@mikethebarber',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
    images: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
    ],
    price: '££',
    distance: '0.8 km',
    services: ['shop'],
    specialty: 'Fades',
    category: 'barber',
  },
  {
    id: 2,
    name: 'John Snow',
    username: '@johnsnow',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    images: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
    ],
    price: '£££',
    distance: '1.2 km',
    services: ['shop', 'mobile'],
    specialty: 'Classic Barber',
    category: 'barber',
  },
  {
    id: 3,
    name: 'Sarah Styles',
    username: '@sarahstyles',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    images: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    ],
    price: '££££',
    distance: '2.1 km',
    services: ['shop', 'home'],
    specialty: 'Color & Styling',
    category: 'hairstylist',
  },
  {
    id: 4,
    name: 'Glamour Nails',
    username: '@glamournails',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
    ],
    price: '££',
    distance: '0.5 km',
    services: ['shop'],
    specialty: 'Nail Art & Extensions',
    category: 'nails',
  },
  {
    id: 5,
    name: 'Zen Massage Studio',
    username: '@zenmassage',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400',
    ],
    price: '£££',
    distance: '1.8 km',
    services: ['shop', 'mobile', 'home'],
    specialty: 'Deep Tissue & Relaxation',
    category: 'massage',
  },
  {
    id: 6,
    name: 'Beauty By Emma',
    username: '@beautybyemma',
    isActive: false,
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400',
    images: [
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    ],
    price: '££',
    distance: '1.4 km',
    services: ['mobile', 'home'],
    specialty: 'Bridal & Event Makeup',
    category: 'makeup',
  },
  {
    id: 7,
    name: 'Sparkle Clean Co',
    username: '@sparkleclean',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    ],
    price: '££',
    distance: '0.9 km',
    services: ['mobile', 'home'],
    specialty: 'Residential & Commercial',
    category: 'cleaning',
  },
  {
    id: 8,
    name: 'AutoShine Detailing',
    username: '@autoshine',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400',
    images: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400',
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400',
    ],
    price: '££',
    distance: '2.3 km',
    services: ['shop', 'mobile'],
    specialty: 'Premium Car Care',
    category: 'car-wash',
  },
];

export default function CustomerHome() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(['shop', 'mobile', 'home']);

  // Filter providers based on selected category and search
  const filteredProviders = dummyBusinesses.filter((provider) => {
    const matchesCategory = !selectedCategory || provider.category === selectedCategory;
    const matchesSearch = !searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesServiceType = selectedServiceTypes.some(type => provider.services.includes(type));
    return matchesCategory && matchesSearch && matchesServiceType;
  });

  const toggleServiceType = (type: string) => {
    if (selectedServiceTypes.includes(type)) {
      setSelectedServiceTypes(selectedServiceTypes.filter(t => t !== type));
    } else {
      setSelectedServiceTypes([...selectedServiceTypes, type]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 shadow-sm hover:bg-gray-800 transition-all"
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
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-gray-900 bg-gray-100"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                />
              </div>
              <button className="px-6 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-sm">
                Search
              </button>
            </div>

            {/* Service Type Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">Service Type:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'shop', label: 'In-Shop' },
                  { id: 'mobile', label: 'Mobile' },
                  { id: 'home', label: 'At Home' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => toggleServiceType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedServiceTypes.includes(type.id)
                        ? 'bg-gray-700 text-white shadow-md border border-gray-700'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <ServiceTypeIcon typeId={type.id} className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all ${
                !selectedCategory
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>All Services</span>
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : undefined,
                }}
              >
                <CategoryIcon categoryId={category.id} className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory
              ? `${serviceCategories.find(c => c.id === selectedCategory)?.name} Services`
              : 'All Services'}
          </h2>
          <p className="text-gray-600">
            {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'} found
          </p>
        </div>

        {/* Service Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const { averageRating, reviewCount } = getBusinessRating(provider.id);

              return (
                <a
                  key={provider.id}
                  href={`/provider/${provider.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer group block"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                      <img
                        src={provider.images[0]}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Status Badge */}
                      <div
                        className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-xl shadow-md ${
                          provider.isActive ? 'animate-pulse-glow' : ''
                        }`}
                        style={{
                          backgroundColor: provider.isActive
                            ? 'rgba(76, 175, 80, 0.95)'
                            : 'rgba(251, 191, 36, 0.95)'
                        }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-semibold">
                          {provider.isActive ? 'Active now' : 'On break'}
                        </span>
                      </div>

                      {/* Service Type Tag */}
                      {provider.services.length > 0 && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-white text-[10px] font-semibold uppercase">
                            {provider.services[0]}
                          </span>
                        </div>
                      )}

                      {/* Image Indicators */}
                      {provider.images.length > 1 && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                          {provider.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full ${
                                index === 0 ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Profile Picture Overlay */}
                    <div className="absolute -bottom-6 left-4 z-10">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-12 h-12 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 pt-8">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-primary transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">{provider.username}</p>
                      </div>

                      {reviewCount > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg ml-2">
                          <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="text-xs font-bold text-gray-900">{averageRating}</span>
                        </div>
                      )}
                    </div>

                    {/* Compact Info Row */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
                      {provider.specialty && (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{provider.specialty}</span>
                          <span className="text-gray-400">•</span>
                        </>
                      )}

                      {provider.price && (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="font-medium">{provider.price}</span>
                          <span className="text-gray-400">•</span>
                        </>
                      )}

                      {provider.distance && (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium">{provider.distance}</span>
                        </>
                      )}

                      {reviewCount > 0 && (
                        <>
                          <span className="text-gray-400">•</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">{reviewCount} reviews</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                setSelectedServiceTypes(['shop', 'mobile', 'home']);
              }}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
