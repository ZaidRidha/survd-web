'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const userName = "Zaid ridha";

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    console.log("Logout pressed");
  };

  const handleMyBusiness = () => {
    router.push("/vendor/onboarding");
  };

  const handlePersonalInfo = () => {
    router.push('/profile/personal-info');
  };

  const handlePayments = () => {
    router.push('/profile/payments');
  };

  const handleSettings = () => {
    router.push('/profile/settings');
  };

  const handleBookNowPayLater = () => {
    console.log('Book now, pay later pressed');
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

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">{userName}</h1>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white rounded-2xl mb-6 shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">Account Settings</h2>

          <button
            onClick={handlePersonalInfo}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <span className="text-gray-700">Personal information</span>
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handlePayments}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <span className="text-gray-700">Payments</span>
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleSettings}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <span className="text-gray-700">Settings</span>
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Book Now, Pay Later Banner */}
        <button
          onClick={handleBookNowPayLater}
          className="w-full bg-gray-900 rounded-2xl p-6 mb-6 shadow-sm flex items-center justify-between overflow-hidden min-h-[160px] hover:bg-gray-800 transition-colors"
        >
          <div className="flex-1 text-left">
            <div className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-md mb-3">
              <span className="text-xs font-bold text-white tracking-wider">NEW</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Book Now, Pay Later</h3>
            <p className="text-sm text-white text-opacity-80 mb-4 leading-relaxed">
              Flexible payment options available on all bookings
            </p>
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold text-white">Learn More</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
          <div className="w-20 h-20 flex items-center justify-center">
            <svg className="w-16 h-16 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </button>

        {/* Business Section */}
        <div className="bg-white rounded-2xl mb-6 shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">Business</h2>

          <button
            onClick={handleMyBusiness}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <span className="text-gray-700">Become A Vendor</span>
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors shadow-sm mb-3"
        >
          Login
        </button>

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-white text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 mb-3"
        >
          Log Out
        </button>

        {/* Dev Skip to Vendor Button */}
        <button
          onClick={() => router.push('/vendorappointments')}
          className="w-full bg-green-50 text-green-600 py-4 rounded-2xl font-bold hover:bg-green-100 transition-colors border-2 border-green-500 flex items-center justify-center gap-2 mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Skip to Vendor (Dev)</span>
        </button>
      </div>
    </div>
  );
}
