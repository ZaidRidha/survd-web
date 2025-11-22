'use client';

import React, { useState } from 'react';
import { ArrowLeft, Check, Calendar, Repeat, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ServiceAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface ServiceForm {
  name: string;
  duration: number;
  price: number | string;
  description: string;
  availability: ServiceAvailability[];
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

  return (
    <div className="p-6 space-y-6">
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
              )}
            </div>
          ))}
        </div>
      )}

      {/* Custom Dates Mode */}
      {availabilityMode === 'custom' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-600 rounded-xl p-4 flex gap-3">
            <Info className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Advanced Scheduling</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select specific dates when this service is available. Tap dates to select or
                deselect them.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600 text-center">
              Custom date selection feature coming soon. For now, use weekly schedule mode.
            </p>
          </div>
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
