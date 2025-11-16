'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// Dummy appointments data
const dummyAppointments = {
  upcoming: [
    {
      id: 1,
      providerName: 'Mike The Barber',
      providerUsername: '@mikethebarber',
      providerImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
      date: '2025-01-20',
      time: '10:00 AM',
      service: 'Haircut & Beard Trim',
      price: 35,
      duration: '45 min',
      location: '123 High Street, London, UK',
      status: 'upcoming' as const,
    },
    {
      id: 2,
      providerName: 'Sarah Styles',
      providerUsername: '@sarahstyles',
      providerImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
      date: '2025-01-25',
      time: '2:00 PM',
      service: 'Hair Coloring',
      price: 85,
      duration: '2 hrs',
      location: '456 Beauty Lane, London, UK',
      status: 'upcoming' as const,
    },
  ],
  history: [
    {
      id: 3,
      providerName: 'Glamour Nails',
      providerUsername: '@glamournails',
      providerImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      date: '2025-01-10',
      time: '11:00 AM',
      service: 'Gel Manicure',
      price: 30,
      duration: '1 hr',
      location: '789 Nail Street, London, UK',
      status: 'completed' as const,
    },
    {
      id: 4,
      providerName: 'Zen Massage Studio',
      providerUsername: '@zenmassage',
      providerImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      date: '2025-01-05',
      time: '3:00 PM',
      service: 'Deep Tissue Massage',
      price: 65,
      duration: '1 hr',
      location: '321 Wellness Road, London, UK',
      status: 'completed' as const,
    },
  ],
};

interface Appointment {
  id: number;
  providerName: string;
  providerUsername: string;
  providerImage: string;
  date: string;
  time: string;
  service: string;
  price: number;
  duration: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function CustomerAppointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const allAppointments = [...dummyAppointments.upcoming, ...dummyAppointments.history];

  // Find nearest upcoming appointment date
  const getNearestAppointmentDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureAppointments = dummyAppointments.upcoming.filter(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate >= today;
    });

    if (futureAppointments.length === 0) {
      return new Date();
    }

    return new Date(futureAppointments[0].date);
  };

  useEffect(() => {
    const nearestDate = getNearestAppointmentDate();
    setSelectedDate(nearestDate);
    setCurrentMonth(nearestDate);
  }, []);

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allAppointments.filter(apt => apt.date === dateStr);
  };

  const hasAppointmentOnDate = (date: Date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const handleDateClick = (date: Date) => {
    if (selectedDate && isSameDay(date, selectedDate)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const changeMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointmentsInMonth = allAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getMonth() === newMonth.getMonth() &&
             aptDate.getFullYear() === newMonth.getFullYear();
    });

    if (appointmentsInMonth.length > 0) {
      const upcomingInMonth = appointmentsInMonth
        .map(apt => new Date(apt.date))
        .filter(date => date >= today)
        .sort((a, b) => a.getTime() - b.getTime());

      if (upcomingInMonth.length > 0) {
        setSelectedDate(upcomingInMonth[0]);
      } else {
        const sortedDates = appointmentsInMonth
          .map(apt => new Date(apt.date))
          .sort((a, b) => a.getTime() - b.getTime());
        setSelectedDate(sortedDates[0]);
      }
    } else {
      const firstDayOfNewMonth = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
      setSelectedDate(firstDayOfNewMonth);
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const today = new Date();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const hasAppointment = hasAppointmentOnDate(date);
      const isToday = isSameDay(date, today);
      const isSelected = isSameDay(date, selectedDate);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all ${
            isToday ? 'bg-gray-100' : ''
          } ${isSelected ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
        >
          <span className={`text-sm font-medium ${isSelected ? 'text-white font-bold' : isToday ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>
            {day}
          </span>
          {hasAppointment && (
            <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
          )}
        </button>
      );
    }

    const appointmentsToShow = selectedDate
      ? getAppointmentsForDate(selectedDate)
      : allAppointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate.getMonth() === currentMonth.getMonth() &&
                 aptDate.getFullYear() === currentMonth.getFullYear();
        });

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-xs font-semibold text-gray-600">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days}
        </div>

        {/* Appointments for Selected Date */}
        <div>
          <h4 className="text-base font-bold text-gray-900 mb-4">
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }
          </h4>
          {appointmentsToShow.length > 0 ? (
            <div className="space-y-3">
              {appointmentsToShow.map((appointment) => (
                <button
                  key={appointment.id}
                  onClick={() => setSelectedBooking(appointment)}
                  className="w-full bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all text-left"
                >
                  <div className="relative h-24 bg-gray-200">
                    <Image
                      src={appointment.providerImage}
                      alt={appointment.providerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-gray-900">{appointment.providerName}</h5>
                      <span className={`px-2 py-1 rounded text-[9px] font-bold text-white ${
                        appointment.status === 'upcoming' ? 'bg-gray-900' :
                        appointment.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {appointment.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">{appointment.service}</p>
                    <p className="text-xs text-gray-600 mb-2">with {appointment.providerUsername}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              {selectedDate ? 'No appointments on this date' : 'No appointments this month'}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderAppointments = () => {
    const appointmentList = dummyAppointments[activeTab];

    if (appointmentList.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-600">No {activeTab} appointments</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentList.map((appointment) => (
          <button
            key={appointment.id}
            onClick={() => setSelectedBooking(appointment)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all text-left"
          >
            <div className="relative h-32 bg-gray-200">
              <Image
                src={appointment.providerImage}
                alt={appointment.providerName}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">{appointment.providerName}</h3>
                <span className={`px-2 py-1 rounded text-[9px] font-bold text-white ${
                  activeTab === 'history' && appointment.status === 'completed' ? 'bg-green-500' :
                  activeTab === 'history' && appointment.status === 'cancelled' ? 'bg-red-500' :
                  'bg-gray-900'
                }`}>
                  {activeTab === 'history'
                    ? (appointment.status === 'completed' ? 'COMPLETED' : 'CANCELLED')
                    : 'UPCOMING'}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">{appointment.service}</p>
              <p className="text-sm text-gray-600 mb-3">with {appointment.providerUsername}</p>
              <div className="flex items-center gap-3 mb-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{appointment.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{appointment.location}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navigation Header */}
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
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 shadow-sm hover:bg-gray-800 transition-all"
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
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-gray-900 bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Appointments</span>
            </a>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showCalendar ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        {!showCalendar && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                  activeTab === 'upcoming'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                  activeTab === 'history'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                History
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCalendar ? renderCalendar() : renderAppointments()}
      </main>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                  <Image
                    src={selectedBooking.providerImage}
                    alt={selectedBooking.providerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{selectedBooking.providerName}</h3>
                  <p className="text-sm text-gray-600">{selectedBooking.providerUsername}</p>
                  {selectedBooking.providerName.includes('Barber') && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-500 font-medium">Active Now</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Date</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(selectedBooking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(selectedBooking.date).toLocaleDateString('en-GB', { weekday: 'long' })}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Time</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{selectedBooking.time}</p>
                  <p className="text-xs text-gray-500">{selectedBooking.duration}</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{selectedBooking.service}</span>
                  <span className="text-sm text-gray-600">• {selectedBooking.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-semibold text-lg text-gray-900">£{selectedBooking.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2 mb-3">
                  <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-700 flex-1">{selectedBooking.location}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBooking.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-900 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              </div>

              {/* Action Buttons */}
              {selectedBooking.status === 'upcoming' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCancelModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-red-500 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowRescheduleModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reschedule
                  </button>
                </div>
              )}

              {selectedBooking.status === 'completed' && (
                <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Leave a Review
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center">
            <div className="mb-5">
              <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancel Booking?</h3>
            <p className="text-gray-700 mb-2">
              Are you sure you want to cancel your booking with {selectedBooking?.providerName}?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. You may be charged a cancellation fee.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBooking(null);
                }}
                className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center">
            <div className="mb-5">
              <svg className="w-16 h-16 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reschedule Booking</h3>
            <p className="text-gray-700 mb-2">
              Would you like to choose a new date and time for your appointment?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Current: {selectedBooking && new Date(selectedBooking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedBooking?.time}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                }}
                className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
              >
                Choose New Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
