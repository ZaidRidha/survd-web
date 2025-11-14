'use client';

import Image from 'next/image';
import { useState } from 'react';

// Service categories from mobile app
const serviceCategories = [
  { id: 'barber', name: 'Barber', icon: 'cut', color: '#6B9BD1' },
  { id: 'hairstylist', name: 'Hair Stylist', icon: 'color-wand', color: '#FF7B7B' },
  { id: 'makeup', name: 'Makeup', icon: 'brush', color: '#D190E3' },
  { id: 'nails', name: 'Nails', icon: 'hand-left', color: '#FF77A1' },
  { id: 'massage', name: 'Massage', icon: 'fitness', color: '#5EC4F5' },
  { id: 'spa', name: 'Spa', icon: 'water', color: '#81C784' },
  { id: 'cleaning', name: 'House Cleaning', icon: 'home', color: '#4DD0E1' },
  { id: 'car-wash', name: 'Car Wash', icon: 'car-sport', color: '#29B6F6' },
  { id: 'photography', name: 'Photography', icon: 'camera', color: '#8D6E63' },
  { id: 'personal-training', name: 'Personal Training', icon: 'barbell', color: '#FF6F00' },
];

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
    price: '££',
    distance: '2.3 km',
    services: ['shop', 'mobile'],
    specialty: 'Premium Car Care',
    category: 'car-wash',
  },
];

// Trending services
const trendingServices = [
  {
    id: 'gardening',
    name: 'Garden Care',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    category: 'gardening',
    description: 'Spring & summer special',
  },
  {
    id: 'car-wash',
    name: 'Car Detailing',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400',
    category: 'car-detailing',
    description: 'Spring clean your car',
  },
  {
    id: 'basketball',
    name: 'Basketball Courts',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    category: 'basketball',
    description: 'Summer sports',
  },
  {
    id: 'photography',
    name: 'Event Photography',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
    category: 'photography',
    description: 'Capture memories',
  },
  {
    id: 'dog-walking',
    name: 'Dog Walking',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
    category: 'dog-walking',
    description: 'Outdoor exercise',
  },
];

// Customer favorites
const customerFavorites = [
  {
    id: 'cleaning',
    name: 'House Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    category: 'cleaning',
    description: 'Most popular',
  },
  {
    id: 'car-wash-regular',
    name: 'Car Wash',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'car-wash',
    description: 'Weekly favorite',
  },
  {
    id: 'dog-grooming',
    name: 'Dog Grooming',
    image: 'https://images.unsplash.com/photo-1556229010-aa1b6b6c8cce?w=400',
    category: 'dog-grooming',
    description: 'Pet care essential',
  },
  {
    id: 'personal-training',
    name: 'Personal Training',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    category: 'personal-training',
    description: 'Fitness staple',
  },
  {
    id: 'tutoring',
    name: 'Tutoring',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    category: 'tutoring',
    description: 'Learning support',
  },
];

type TabType = 'booked' | 'saved';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<TabType>('booked');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get vendor data with ratings
  const vendorsWithRatings = dummyBusinesses.map((business) => {
    const { averageRating, reviewCount } = getBusinessRating(business.id);
    return {
      ...business,
      rating: averageRating,
      reviews: reviewCount,
    };
  });

  // Top Booked - sorted by review count
  const topBooked = [...vendorsWithRatings]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 10);

  // Top Saved - sorted by rating
  const topSaved = [...vendorsWithRatings]
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews - a.reviews;
    })
    .slice(0, 10);

  const currentList = activeTab === 'booked' ? topBooked : topSaved;

  // Filter categories based on search query
  const filteredCategories = searchQuery.trim()
    ? serviceCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  // Filter businesses based on search query
  const filteredBusinesses = searchQuery.trim()
    ? vendorsWithRatings.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.username.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

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
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 shadow-sm hover:bg-gray-800 transition-all"
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
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-gray-900 bg-gray-100"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isSearchActive ? (
          <>
            {/* Hero Section */}
            <div className="pt-8 pb-6">
              <p className="text-gray-600 text-lg mb-2">Hey there!</p>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Book Your Next
                <br />
                Service
              </h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <button
                onClick={() => setIsSearchActive(true)}
                className="w-full flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-4 text-left hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-500">Search for services...</span>
              </button>
            </div>

            {/* Trending Now Section */}
            <div className="mb-8 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
                  <p className="text-sm text-gray-600">Popular services this season</p>
                </div>
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {trendingServices.map((service) => (
                  <div
                    key={service.id}
                    className="relative flex-shrink-0 w-32 h-36 rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-bold mb-0.5">{service.name}</p>
                      <p className="text-white/90 text-xs">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Favorites Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Customer Favorites</h2>
                  <p className="text-sm text-gray-600">Most loved services year-round</p>
                </div>
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {customerFavorites.map((service) => (
                  <div
                    key={service.id}
                    className="relative flex-shrink-0 w-32 h-36 rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-bold mb-0.5">{service.name}</p>
                      <p className="text-white/90 text-xs">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Picks Section */}
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">Top Picks</h2>
                <p className="text-sm text-gray-600">Highest rated this week</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('booked')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === 'booked' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Top booked
                  {activeTab === 'booked' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === 'saved' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Top saved
                  {activeTab === 'saved' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                  )}
                </button>
              </div>

              {/* Vendor List */}
              <div className="space-y-2">
                {currentList.map((vendor, index) => (
                  <div key={vendor.id} className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                    </div>

                    {/* Compact Card */}
                    <div className="flex-1 bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        {/* Image */}
                        <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                          <img
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-full h-full object-cover"
                          />
                          {vendor.isActive && (
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{vendor.name}</h3>
                          <p className="text-xs text-gray-400 mb-1">{vendor.username}</p>
                          {vendor.specialty && (
                            <p className="text-xs text-gray-600 truncate mb-1">{vendor.specialty}</p>
                          )}
                          <div className="flex items-center gap-2 text-xs">
                            {vendor.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span className="font-semibold text-gray-900">
                                  {vendor.rating} ({vendor.reviews})
                                </span>
                              </div>
                            )}
                            {vendor.price && vendor.distance && (
                              <span className="text-gray-600">
                                {vendor.price} · {vendor.distance}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search Active State */
          <div className="py-4">
            {/* Active Search Bar */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchQuery('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Results */}
            {searchQuery.trim() ? (
              <div>
                {/* Category Suggestions */}
                {filteredCategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-1">
                      {filteredCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            <span style={{ color: category.color }}>✂️</span>
                          </div>
                          <span className="flex-1 font-medium text-gray-900">{category.name}</span>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Business Suggestions */}
                {filteredBusinesses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Businesses</h3>
                    <div className="space-y-1">
                      {filteredBusinesses.map((business) => (
                        <div
                          key={business.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{business.name}</p>
                            <p className="text-sm text-gray-600">{business.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">{business.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {filteredCategories.length === 0 && filteredBusinesses.length === 0 && (
                  <div className="text-center py-16">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-600 mb-1">No results found</h3>
                    <p className="text-sm text-gray-500">Try searching for something else</p>
                  </div>
                )}
              </div>
            ) : (
              /* Search Suggestions when no query */
              <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6">
                {/* Trending Now Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
                      <p className="text-sm text-gray-600">Popular services this season</p>
                    </div>
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {trendingServices.map((service) => (
                      <div
                        key={service.id}
                        className="relative flex-shrink-0 w-32 h-36 rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-bold mb-0.5">{service.name}</p>
                          <p className="text-white/90 text-xs">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Favorites */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Customer Favorites</h2>
                      <p className="text-sm text-gray-600">Most loved services year-round</p>
                    </div>
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {customerFavorites.map((service) => (
                      <div
                        key={service.id}
                        className="relative flex-shrink-0 w-32 h-36 rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-bold mb-0.5">{service.name}</p>
                          <p className="text-white/90 text-xs">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
