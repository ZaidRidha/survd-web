'use client';

import React, { useState } from 'react';
import { ArrowLeft, Check, Calendar, Repeat, ChevronDown, ChevronUp, Info, ChevronLeft, ChevronRight, Sparkles, CheckCheck, XCircle } from 'lucide-react';

interface ServiceAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  advancedMode?: boolean;
  selectedSlots?: string[];
  slotInterval?: number; // in minutes (15, 30, 60)
}

interface CustomDateAvailability {
  date: string; // YYYY-MM-DD format
  startTime: string;
  endTime: string;
  advancedMode?: boolean;
  selectedSlots?: string[];
  slotInterval?: number; // in minutes (15, 30, 60)
}

interface ServiceForm {
  name: string;
  duration: number;
  price: number | string;
  description: string;
  availability: ServiceAvailability[];
  customDates?: CustomDateAvailability[];
  locationType?: 'shop' | 'mobile' | 'studio';
  outOfHours?: boolean;
  serviceRadius?: number | string;
  transportFeePerMile?: number | string;
}

interface ServiceAvailabilityStepProps {
  serviceForm: ServiceForm;
  setServiceForm: (form: ServiceForm) => void;
  availabilityMode: 'weekly' | 'custom';
  setAvailabilityMode: (mode: 'weekly' | 'custom') => void;
  onNext?: () => void;
  onBack?: () => void;
}

export default function ServiceAvailabilityStep({
  serviceForm,
  setServiceForm,
  availabilityMode,
  setAvailabilityMode,
  onNext,
  onBack,
}: ServiceAvailabilityStepProps) {
  const updateAvailability = (index: number, field: keyof ServiceAvailability, value: any) => {
    const newAvailability = [...serviceForm.availability];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setServiceForm({ ...serviceForm, availability: newAvailability });
  };

  const getDayFullName = (day: string) => {
    const dayMap: Record<string, string> = {
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
      Sun: 'Sunday',
    };
    return dayMap[day] || day;
  };

  // Generate timeslots based on start time, end time, and interval
  const generateTimeSlots = (startTime: string, endTime: string, interval: number): string[] => {
    const slots: string[] = [];
    const parseTime = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const formatTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);

    for (let time = startMinutes; time < endMinutes; time += interval) {
      slots.push(formatTime(time));
    }

    return slots;
  };

  const toggleAdvancedMode = (index: number) => {
    const newAvailability = [...serviceForm.availability];
    const day = newAvailability[index];
    const isEnabling = !day.advancedMode;

    if (isEnabling) {
      // Initialize with all slots selected
      const interval = day.slotInterval || 60;
      const slots = generateTimeSlots(day.startTime, day.endTime, interval);
      newAvailability[index] = {
        ...day,
        advancedMode: true,
        slotInterval: interval,
        selectedSlots: slots,
      };
    } else {
      newAvailability[index] = {
        ...day,
        advancedMode: false,
        selectedSlots: [],
      };
    }

    setServiceForm({ ...serviceForm, availability: newAvailability });
  };

  const toggleTimeSlot = (dayIndex: number, slot: string) => {
    const newAvailability = [...serviceForm.availability];
    const day = newAvailability[dayIndex];
    const selectedSlots = day.selectedSlots || [];

    if (selectedSlots.includes(slot)) {
      newAvailability[dayIndex] = {
        ...day,
        selectedSlots: selectedSlots.filter(s => s !== slot),
      };
    } else {
      newAvailability[dayIndex] = {
        ...day,
        selectedSlots: [...selectedSlots, slot],
      };
    }

    setServiceForm({ ...serviceForm, availability: newAvailability });
  };

  const updateSlotInterval = (dayIndex: number, interval: number) => {
    const newAvailability = [...serviceForm.availability];
    const day = newAvailability[dayIndex];
    const slots = generateTimeSlots(day.startTime, day.endTime, interval);

    newAvailability[dayIndex] = {
      ...day,
      slotInterval: interval,
      selectedSlots: slots, // Reset to all slots selected
    };

    setServiceForm({ ...serviceForm, availability: newAvailability });
  };

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select');
  const [dragStartDate, setDragStartDate] = useState<Date | null>(null);
  const [dragEndDate, setDragEndDate] = useState<Date | null>(null);

  const customDates = serviceForm.customDates || [];

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if date is selected
  const isDateSelected = (date: Date) => {
    const dateStr = formatDate(date);
    return customDates.some(d => d.date === dateStr);
  };

  // Check if date is in current drag range
  const isInDragRange = (date: Date): boolean => {
    if (!isDragging || !dragStartDate || !dragEndDate) return false;

    const dateTime = date.getTime();
    const startTime = dragStartDate.getTime();
    const endTime = dragEndDate.getTime();
    const [minTime, maxTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime];

    return dateTime >= minTime && dateTime <= maxTime;
  };

  // Toggle date selection
  const toggleDate = (date: Date | string) => {
    const dateStr = typeof date === 'string' ? date : formatDate(date);
    const newCustomDates = [...customDates];
    const existingIndex = newCustomDates.findIndex(d => d.date === dateStr);

    if (existingIndex >= 0) {
      newCustomDates.splice(existingIndex, 1);
    } else {
      newCustomDates.push({
        date: dateStr,
        startTime: '09:00',
        endTime: '17:00',
      });
    }

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Get all dates between two dates (inclusive)
  const getDateRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const startTime = start.getTime();
    const endTime = end.getTime();
    const [minTime, maxTime] = startTime < endTime ? [startTime, endTime] : [endTime, startTime];

    const current = new Date(minTime);
    while (current.getTime() <= maxTime) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // Apply range selection
  const applyRangeSelection = (start: Date, end: Date, mode: 'select' | 'deselect') => {
    const rangeDates = getDateRange(start, end);
    const newCustomDates = [...customDates];

    rangeDates.forEach(date => {
      const dateStr = formatDate(date);
      const existingIndex = newCustomDates.findIndex(d => d.date === dateStr);

      if (mode === 'select' && existingIndex === -1) {
        newCustomDates.push({
          date: dateStr,
          startTime: '09:00',
          endTime: '17:00',
        });
      } else if (mode === 'deselect' && existingIndex >= 0) {
        newCustomDates.splice(existingIndex, 1);
      }
    });

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Handle drag start
  const handleMouseDown = (date: Date) => {
    setIsDragging(true);
    setDragStartDate(date);
    setDragEndDate(date);
    const isCurrentlySelected = isDateSelected(date);
    setDragMode(isCurrentlySelected ? 'deselect' : 'select');
  };

  // Handle drag over dates
  const handleMouseEnter = (date: Date) => {
    if (!isDragging || !dragStartDate) return;
    setDragEndDate(date);
  };

  // Handle drag end
  const handleMouseUp = () => {
    if (isDragging && dragStartDate && dragEndDate) {
      applyRangeSelection(dragStartDate, dragEndDate, dragMode);
    }
    setIsDragging(false);
    setDragStartDate(null);
    setDragEndDate(null);
  };

  // Update time for a specific date
  const updateCustomDateTime = (dateStr: string, field: 'startTime' | 'endTime', value: string) => {
    const newCustomDates = customDates.map(d =>
      d.date === dateStr ? { ...d, [field]: value } : d
    );
    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Toggle advanced mode for custom date
  const toggleAdvancedModeForDate = (dateStr: string) => {
    const newCustomDates = customDates.map(d => {
      if (d.date === dateStr) {
        const isEnabling = !d.advancedMode;

        if (isEnabling) {
          // Initialize with all slots selected
          const interval = d.slotInterval || 60;
          const slots = generateTimeSlots(d.startTime, d.endTime, interval);
          return {
            ...d,
            advancedMode: true,
            slotInterval: interval,
            selectedSlots: slots,
          };
        } else {
          return {
            ...d,
            advancedMode: false,
            selectedSlots: [],
          };
        }
      }
      return d;
    });

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Toggle time slot for custom date
  const toggleTimeSlotForDate = (dateStr: string, slot: string) => {
    const newCustomDates = customDates.map(d => {
      if (d.date === dateStr) {
        const selectedSlots = d.selectedSlots || [];

        if (selectedSlots.includes(slot)) {
          return {
            ...d,
            selectedSlots: selectedSlots.filter(s => s !== slot),
          };
        } else {
          return {
            ...d,
            selectedSlots: [...selectedSlots, slot],
          };
        }
      }
      return d;
    });

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Update slot interval for custom date
  const updateSlotIntervalForDate = (dateStr: string, interval: number) => {
    const newCustomDates = customDates.map(d => {
      if (d.date === dateStr) {
        const slots = generateTimeSlots(d.startTime, d.endTime, interval);
        return {
          ...d,
          slotInterval: interval,
          selectedSlots: slots, // Reset to all slots selected
        };
      }
      return d;
    });

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Select all dates in current month
  const selectAllDatesInMonth = () => {
    const days = generateCalendarDays(currentDate);
    const newCustomDates = [...customDates];

    days.forEach(day => {
      if (day) {
        const dateStr = formatDate(day);
        if (!isDateSelected(day)) {
          newCustomDates.push({
            date: dateStr,
            startTime: '09:00',
            endTime: '17:00',
          });
        }
      }
    });

    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Clear all dates in current month
  const clearAllDatesInMonth = () => {
    const days = generateCalendarDays(currentDate);
    const datesToRemove = new Set<string>();

    days.forEach(day => {
      if (day) {
        datesToRemove.add(formatDate(day));
      }
    });

    const newCustomDates = customDates.filter(d => !datesToRemove.has(d.date));
    setServiceForm({ ...serviceForm, customDates: newCustomDates });
  };

  // Calendar helper functions
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  // Add global mouse up listener
  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <div className="p-6 space-y-6" style={{ userSelect: isDragging ? 'none' : 'auto' }}>
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-blue-50 mb-4">
          <Calendar className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Service Availability</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Choose how you want to set availability for this service
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setAvailabilityMode('weekly')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all ${
            availabilityMode === 'weekly'
              ? 'bg-green-600 border-green-600 text-white'
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Repeat className="w-5 h-5" />
          Weekly Schedule
        </button>
        <button
          onClick={() => setAvailabilityMode('custom')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all ${
            availabilityMode === 'custom'
              ? 'bg-green-600 border-green-600 text-white'
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Custom Dates
        </button>
      </div>

      {/* Weekly Schedule Mode */}
      {availabilityMode === 'weekly' && (
        <div className="space-y-2">
          {serviceForm.availability.map((dayAvailability, index) => (
            <div
              key={dayAvailability.day}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3"
            >
              <button
                onClick={() => updateAvailability(index, 'enabled', !dayAvailability.enabled)}
                className="w-full flex items-center gap-2.5 mb-2.5"
              >
                <div
                  className={`flex items-center justify-center w-5.5 h-5.5 rounded-md border-2 ${
                    dayAvailability.enabled
                      ? 'bg-green-600 border-green-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {dayAvailability.enabled && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    dayAvailability.enabled ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {getDayFullName(dayAvailability.day)}
                </span>
              </button>

              {dayAvailability.enabled && (
                <>
                  <div className="flex items-center gap-2.5 pl-8">
                    <input
                      type="time"
                      value={dayAvailability.startTime}
                      onChange={(e) => updateAvailability(index, 'startTime', e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm font-bold text-gray-600">-</span>
                    <input
                      type="time"
                      value={dayAvailability.endTime}
                      onChange={(e) => updateAvailability(index, 'endTime', e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Advanced Timeslot Selection */}
                  <button
                    onClick={() => toggleAdvancedMode(index)}
                    className="flex items-center gap-1.5 pl-8 mt-2 text-xs font-semibold text-green-600 hover:text-green-700"
                  >
                    {dayAvailability.advancedMode ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    {dayAvailability.advancedMode ? 'Hide Advanced' : 'Advanced Scheduling'}
                  </button>

                  {dayAvailability.advancedMode && (
                    <div className="mt-3 pl-8 pr-3 pt-3 pb-2 bg-green-50 rounded-lg border border-green-200">
                      {/* Interval Selection */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-900 mb-2">Slot Interval:</p>
                        <div className="flex gap-2">
                          {[15, 30, 60].map((interval) => (
                            <button
                              key={interval}
                              onClick={() => updateSlotInterval(index, interval)}
                              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                                (dayAvailability.slotInterval || 60) === interval
                                  ? 'bg-green-600 border-green-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {interval} min
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Timeslot Chips */}
                      <div className="flex gap-2 overflow-x-auto pb-1 mb-2">
                        {generateTimeSlots(
                          dayAvailability.startTime,
                          dayAvailability.endTime,
                          dayAvailability.slotInterval || 60
                        ).map((slot) => {
                          const isSelected = (dayAvailability.selectedSlots || []).includes(slot);
                          return (
                            <button
                              key={slot}
                              onClick={() => toggleTimeSlot(index, slot)}
                              className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold border-2 whitespace-nowrap transition-all ${
                                isSelected
                                  ? 'bg-green-600 border-green-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-xs text-gray-600 italic">
                        Tap timeslots to enable/disable specific hours
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Dates Mode */}
      {availabilityMode === 'custom' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-600 rounded-xl p-4 flex gap-3">
            <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Advanced Scheduling</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select specific dates when this service is available. Click dates to select or
                deselect them.
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="max-w-md mx-auto">
              {/* Calendar Header with Month/Year */}
              <div className="text-center mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
              </div>

              {/* Calendar Navigation */}
              <div className="flex justify-between items-center mb-4 px-2">
                <button
                  onClick={() => changeMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>

                <button
                  onClick={() => changeMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>
              </div>

              {/* Bulk Actions */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={selectAllDatesInMonth}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <CheckCheck className="w-4 h-4 text-green-600" />
                  Select All
                </button>

                <button
                  onClick={clearAllDatesInMonth}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  Clear All
                </button>
              </div>

              {/* Calendar Day Labels */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center">
                    <span className="text-[10px] font-medium text-gray-500">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays(currentDate).map((day, index) => {
                  if (!day) return <div key={index} className="aspect-square" />;

                  const selected = isDateSelected(day);
                  const inDragRange = isInDragRange(day);
                  const isToday = isSameDay(day, new Date());

                  // Determine background color based on state
                  let bgClass = 'hover:bg-gray-50';
                  if (selected) {
                    bgClass = 'bg-green-600 text-white';
                  } else if (inDragRange) {
                    bgClass = dragMode === 'select' ? 'bg-green-200' : 'bg-red-200';
                  } else if (isToday) {
                    bgClass = 'bg-gray-100';
                  }

                  return (
                    <div key={index} className="aspect-square p-2 flex items-center justify-center">
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleMouseDown(day);
                        }}
                        onMouseEnter={() => handleMouseEnter(day)}
                        onMouseUp={handleMouseUp}
                        className={`w-full h-full flex items-center justify-center rounded-full relative transition-all cursor-pointer ${bgClass}`}
                      >
                        <span className={`text-[11px] ${
                          selected ? 'text-white font-bold' :
                          isToday ? 'text-gray-900 font-bold' : 'text-gray-700'
                        }`}>
                          {day.getDate()}
                        </span>
                        {selected && (
                          <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Dates List */}
          {customDates.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-base font-bold text-gray-900">
                Selected Dates ({customDates.length})
              </h4>
              <div className="space-y-3">
                {customDates.sort((a, b) => a.date.localeCompare(b.date)).map((customDate) => {
                  const date = new Date(customDate.date + 'T00:00:00');
                  const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <div key={customDate.date} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-900">{formattedDate}</span>
                        <button
                          onClick={() => toggleDate(customDate.date)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <input
                          type="time"
                          value={customDate.startTime}
                          onChange={(e) => updateCustomDateTime(customDate.date, 'startTime', e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span className="text-sm font-bold text-gray-600">-</span>
                        <input
                          type="time"
                          value={customDate.endTime}
                          onChange={(e) => updateCustomDateTime(customDate.date, 'endTime', e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      {/* Advanced Timeslot Selection */}
                      <button
                        onClick={() => toggleAdvancedModeForDate(customDate.date)}
                        className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-green-600 hover:text-green-700"
                      >
                        {customDate.advancedMode ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        {customDate.advancedMode ? 'Hide Advanced' : 'Advanced Scheduling'}
                      </button>

                      {customDate.advancedMode && (
                        <div className="mt-3 pt-3 pb-2 bg-green-50 rounded-lg border border-green-200 px-3">
                          {/* Interval Selection */}
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-900 mb-2">Slot Interval:</p>
                            <div className="flex gap-2">
                              {[15, 30, 60].map((interval) => (
                                <button
                                  key={interval}
                                  onClick={() => updateSlotIntervalForDate(customDate.date, interval)}
                                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                                    (customDate.slotInterval || 60) === interval
                                      ? 'bg-green-600 border-green-600 text-white'
                                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {interval} min
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Timeslot Chips */}
                          <div className="flex gap-2 overflow-x-auto pb-1 mb-2">
                            {generateTimeSlots(
                              customDate.startTime,
                              customDate.endTime,
                              customDate.slotInterval || 60
                            ).map((slot) => {
                              const isSelected = (customDate.selectedSlots || []).includes(slot);
                              return (
                                <button
                                  key={slot}
                                  onClick={() => toggleTimeSlotForDate(customDate.date, slot)}
                                  className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold border-2 whitespace-nowrap transition-all ${
                                    isSelected
                                      ? 'bg-green-600 border-green-600 text-white'
                                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>

                          <p className="text-xs text-gray-600 italic">
                            Click timeslots to enable/disable specific hours
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {customDates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 px-5 bg-gray-50 rounded-xl border border-gray-200">
              <Calendar className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-600 text-center">
                No dates selected. Click on dates in the calendar above to get started.
              </p>
            </div>
          )}
        </div>
      )}

      {availabilityMode === 'weekly' && (
        <div className="flex items-start gap-2.5 bg-blue-50 rounded-xl p-3.5">
          <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Set your weekly schedule. This will repeat every week for this service.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-200 rounded-xl font-semibold text-base text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={onNext}
          className="flex-[2] flex items-center justify-center gap-2 py-4 bg-green-600 rounded-xl font-semibold text-base text-white hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all"
        >
          Save Service
          <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
