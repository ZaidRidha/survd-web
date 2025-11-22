'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  date: string;
  duration: string;
  status: 'upcoming' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: string;
  location: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface VendorService {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  locationType?: "shop" | "mobile" | "studio";
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Haircut & Styling',
    time: '10:00 AM',
    date: 'Today, Oct 29',
    duration: '1.5 hours',
    status: 'confirmed',
    price: '$45',
    location: 'Mobile Service',
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    service: 'Beard Trim',
    time: '2:30 PM',
    date: 'Today, Oct 29',
    duration: '45 min',
    status: 'confirmed',
    price: '$25',
    location: 'Home Studio',
  },
  {
    id: '3',
    clientName: 'Emma Davis',
    service: 'Hair Coloring',
    time: '9:00 AM',
    date: 'Tomorrow, Oct 30',
    duration: '2 hours',
    status: 'confirmed',
    price: '$85',
    location: 'Home Studio',
  },
  {
    id: '4',
    clientName: 'James Wilson',
    service: 'Hair Treatment',
    time: '11:00 AM',
    date: 'Tomorrow, Oct 30',
    duration: '1 hour',
    status: 'pending',
    price: '$55',
    location: 'Mobile Service',
  },
];

const mockClients: Client[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 123-4567' },
  { id: '2', name: 'Michael Chen', email: 'mchen@email.com', phone: '(555) 234-5678' },
  { id: '3', name: 'Emma Davis', email: 'emma.davis@email.com', phone: '(555) 345-6789' },
  { id: '4', name: 'James Wilson', email: 'jwilson@email.com', phone: '(555) 456-7890' },
];

const mockServices: VendorService[] = [
  { id: '1', name: 'Haircut', duration: 30, price: 25.0, description: 'Standard haircut and styling', locationType: 'shop' },
  { id: '2', name: 'Beard Trim', duration: 15, price: 15.0, description: 'Professional beard trimming', locationType: 'mobile' },
  { id: '3', name: 'Hair Coloring', duration: 90, price: 65.0, description: 'Full hair coloring service', locationType: 'shop' },
];

type FilterType = 'all' | 'pending' | 'confirmed';

export default function VendorAppointmentsPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isNewClient, setIsNewClient] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState<VendorService | null>(null);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMonth, setDatePickerMonth] = useState(new Date());
  const [newClientName, setNewClientName] = useState({ firstName: '', lastName: '' });
  const [newAppointment, setNewAppointment] = useState({
    time: '',
    date: formatDateToDDMMYY(new Date()),
    period: 'AM' as 'AM' | 'PM',
  });

  const unreadMessages = 3;
  const unreadNotifications = 5;

  // Helper functions
  function formatDateToDDMMYY(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  const parseAppointmentDate = (dateStr: string): Date | null => {
    const today = new Date();
    if (dateStr.startsWith('Today')) return today;
    if (dateStr.startsWith('Tomorrow')) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow;
    }
    try {
      return new Date(dateStr);
    } catch {
      return null;
    }
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const hasAppointmentOnDate = (date: Date): boolean => {
    return mockAppointments.some(apt => {
      const aptDate = parseAppointmentDate(apt.date);
      return aptDate && isSameDay(aptDate, date);
    });
  };

  const generateHorizontalDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = -7; i < 23; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentDate(newDate);
  };

  const filterAppointments = (appointments: Appointment[]) => {
    let filtered = appointments;
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === selectedFilter);
    }
    if (selectedDate) {
      filtered = filtered.filter(apt => {
        const aptDate = parseAppointmentDate(apt.date);
        return aptDate && isSameDay(aptDate, selectedDate);
      });
    }
    return filtered;
  };

  const getFilterCount = (filter: FilterType) => {
    if (filter === 'all') return mockAppointments.length;
    return mockAppointments.filter(apt => apt.status === filter).length;
  };

  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 = hours + 12;
    else if (period === 'AM' && hours === 12) hour24 = 0;
    return hour24 + minutes / 60;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 6; i <= 22; i++) {
      const hour = i > 12 ? i - 12 : i === 0 ? 12 : i;
      const period = i >= 12 ? 'PM' : 'AM';
      slots.push({ hour24: i, label: `${hour} ${period}` });
    }
    return slots;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'upcoming':
        return '#10B981';
      case 'pending':
      case 'cancelled':
        return '#f5bc42';
      default:
        return '#666';
    }
  };

  const filteredAppointments = filterAppointments(mockAppointments);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 relative hover:bg-gray-100 rounded-lg transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {unreadMessages > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {unreadMessages > 9 ? '9+' : unreadMessages}
                </span>
              )}
            </button>
            <button className="p-2 relative hover:bg-gray-100 rounded-lg transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Calendar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCalendarExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
          </div>

          {!isCalendarExpanded ? (
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-3">
                {generateHorizontalDates().map((date, index) => {
                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  const isToday = isSameDay(date, new Date());
                  const hasAppointment = hasAppointmentOnDate(date);
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className="flex flex-col items-center gap-2 min-w-[56px] relative"
                    >
                      <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : isToday
                          ? 'bg-white border-2 border-gray-200 text-gray-900'
                          : 'bg-gray-50 text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                      {hasAppointment && (
                        <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => changeMonth('prev')} className="p-1 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    className="text-sm font-semibold text-gray-900 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                  >
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showMonthPicker && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-64">
                      <div className="p-3 max-h-64 overflow-y-auto">
                        {Array.from({ length: 24 }, (_, i) => {
                          const date = new Date();
                          date.setMonth(date.getMonth() - 12 + i);
                          return date;
                        }).map((date, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentDate(date);
                              setShowMonthPicker(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                              date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'text-gray-900'
                            }`}
                          >
                            {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={() => changeMonth('next')} className="p-1 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center">
                    <span className="text-[10px] font-medium text-gray-500">{day}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays(currentDate).map((day, index) => (
                  day ? (
                    <div key={index} className="aspect-square p-1 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedDate(day)}
                        className={`w-full h-full flex items-center justify-center rounded-full relative transition-all ${
                          day && isSameDay(day, new Date()) ? 'bg-gray-100' : ''
                        } ${day && selectedDate && isSameDay(day, selectedDate) ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
                      >
                      <span className={`text-[11px] ${
                        day && selectedDate && isSameDay(day, selectedDate) ? 'text-white font-bold' :
                        day && isSameDay(day, new Date()) ? 'text-gray-900 font-bold' : 'text-gray-700'
                      }`}>
                        {day.getDate()}
                      </span>
                      {hasAppointmentOnDate(day) && (
                        <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                          day && selectedDate && isSameDay(day, selectedDate) ? 'bg-white' : 'bg-blue-500'
                        }`} />
                      )}
                      </button>
                    </div>
                  ) : (
                    <div key={index} className="aspect-square" />
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>All</span>
            {getFilterCount('all') > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedFilter === 'all' ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-700'
              }`}>
                {getFilterCount('all')}
              </span>
            )}
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>Requests</span>
            {getFilterCount('pending') > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedFilter === 'pending' ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-700'
              }`}>
                {getFilterCount('pending')}
              </span>
            )}
          </button>
          <button
            onClick={() => setSelectedFilter('confirmed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedFilter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>Confirmed</span>
            {getFilterCount('confirmed') > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedFilter === 'confirmed' ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-700'
              }`}>
                {getFilterCount('confirmed')}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-semibold text-gray-500">No appointments found</p>
            <p className="text-gray-400 mt-2">
              {selectedFilter === 'all' ? "You don't have any appointments yet" : `No ${selectedFilter} appointments`}
            </p>
          </div>
        ) : (
          <div>
            {selectedDate && (
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
            )}
            <div className="space-y-4">
              {generateTimeSlots()
                .filter(slot => filteredAppointments.some(apt => Math.floor(parseTime(apt.time)) === slot.hour24))
                .map((slot, index) => {
                  const appointmentsAtTime = filteredAppointments.filter(apt => Math.floor(parseTime(apt.time)) === slot.hour24);
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 pt-1">
                        <span className="text-xs font-bold text-gray-500">{slot.label}</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-3 pl-4">
                          {appointmentsAtTime.map((appointment) => (
                            <div
                              key={appointment.id}
                              onClick={() => setSelectedAppointment(appointment)}
                              className="w-full bg-white rounded-xl p-4 border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              style={{ borderLeftColor: getStatusColor(appointment.status) }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900">{appointment.service}</h4>
                                <span
                                  className="px-3 py-1 rounded-lg text-xs font-bold"
                                  style={{
                                    backgroundColor: getStatusColor(appointment.status) + '20',
                                    color: getStatusColor(appointment.status),
                                  }}
                                >
                                  {appointment.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{appointment.clientName}</p>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{appointment.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  <span>{appointment.location}</span>
                                </div>
                              </div>
                              {appointment.status === 'pending' && (
                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-bold text-sm"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Reject</span>
                                  </button>
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors font-bold text-sm"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Accept</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Appointment</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl mb-6">
                <button
                  onClick={() => setIsNewClient(false)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    !isNewClient ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Existing Client
                </button>
                <button
                  onClick={() => setIsNewClient(true)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    isNewClient ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  New Client
                </button>
              </div>

              {!isNewClient ? (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Client *</label>
                  <button
                    onClick={() => setShowClientDropdown(!showClientDropdown)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-all"
                  >
                    <span className={selectedClient ? 'text-gray-900 font-semibold' : 'text-gray-400'}>
                      {selectedClient ? selectedClient.name : 'Select a client'}
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showClientDropdown && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {mockClients.map(client => (
                        <button
                          key={client.id}
                          onClick={() => {
                            setSelectedClient(client);
                            setShowClientDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">
                              {client.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">{client.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={newClientName.firstName}
                      onChange={(e) => setNewClientName({ ...newClientName, firstName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={newClientName.lastName}
                      onChange={(e) => setNewClientName({ ...newClientName, lastName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
                <button
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-all"
                >
                  <span className={selectedService ? 'text-gray-900 font-semibold' : 'text-gray-400'}>
                    {selectedService ? selectedService.name : 'Select a service'}
                  </span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showServiceDropdown && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {mockServices.map(service => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service);
                          setShowServiceDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-500">{service.duration} min • £{service.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    value={newAppointment.date}
                    readOnly
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="10:00"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                      maxLength={5}
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => setNewAppointment({ ...newAppointment, period: 'AM' })}
                        className={`px-3 py-3 rounded-xl font-semibold transition-all ${
                          newAppointment.period === 'AM' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        AM
                      </button>
                      <button
                        onClick={() => setNewAppointment({ ...newAppointment, period: 'PM' })}
                        className={`px-3 py-3 rounded-xl font-semibold transition-all ${
                          newAppointment.period === 'PM' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Save Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Appointment Details</h2>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {selectedAppointment.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{selectedAppointment.clientName}</h3>
                  <p className="text-sm text-gray-600">Client</p>
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
                  <p className="text-lg font-semibold text-gray-900">{selectedAppointment.date}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-600 font-medium">Time</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{selectedAppointment.time}</p>
                  <p className="text-xs text-gray-500">{selectedAppointment.duration}</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{selectedAppointment.service}</span>
                  <span className="text-sm text-gray-600">• {selectedAppointment.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-semibold text-lg text-gray-900">{selectedAppointment.price}</span>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-700 flex-1">{selectedAppointment.location}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                  style={{
                    backgroundColor: getStatusColor(selectedAppointment.status) + '20',
                    color: getStatusColor(selectedAppointment.status),
                  }}
                >
                  {selectedAppointment.status.toUpperCase()}
                </span>
              </div>

              {/* Action Buttons */}
              {selectedAppointment.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Handle reject
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      // Handle accept
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept
                  </button>
                </div>
              )}

              {selectedAppointment.status === 'confirmed' && (
                <button
                  onClick={() => {
                    // Handle mark as complete
                    setSelectedAppointment(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
