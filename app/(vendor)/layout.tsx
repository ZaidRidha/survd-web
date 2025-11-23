'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Calendar, DollarSign, User, MessageSquare, Bell } from 'lucide-react';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Appointments', href: '/vendorappointments', icon: Calendar },
    { name: 'Services', href: '/vendorservices', icon: Briefcase },
    { name: 'Earnings', href: '/vendorearnings', icon: DollarSign },
    { name: 'Profile', href: '/vendorprofile', icon: User },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation Links */}
            <div className="flex items-center gap-4 sm:gap-8">
              <Link href="/vendorappointments" className="flex items-center flex-shrink-0 gap-2">
                <Image
                  src="/images/logos/survd-logo.png"
                  alt="Survd"
                  width={100}
                  height={33}
                  className="h-7 sm:h-8 w-auto"
                />
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">
                  Vendor
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden sm:flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isActive(item.href)
                          ? 'bg-gray-900 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 relative hover:bg-gray-100 rounded-lg transition-all">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>
              <button className="p-2 relative hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden border-t border-gray-200">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs transition-all ${
                    isActive(item.href)
                      ? 'font-semibold text-gray-900 bg-gray-100'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
