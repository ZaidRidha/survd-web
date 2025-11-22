'use client';

import React from 'react';
import { ArrowRight, Store, Car, Home, Check } from 'lucide-react';

interface ServiceForm {
  name: string;
  duration: number;
  price: number | string;
  description: string;
  availability: any[];
  locationType?: 'shop' | 'mobile' | 'studio';
  outOfHours?: boolean;
  serviceRadius?: number | string;
  transportFeePerMile?: number | string;
}

interface ServiceDetailsStepProps {
  serviceForm: ServiceForm;
  setServiceForm: (form: ServiceForm) => void;
  onNext?: () => void;
}

export default function ServiceDetailsStep({
  serviceForm,
  setServiceForm,
  onNext,
}: ServiceDetailsStepProps) {
  const isNextDisabled = !serviceForm.name.trim() || !serviceForm.price || !serviceForm.locationType;

  return (
    <div className="p-6 space-y-6">
      {/* Service Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2.5">
          Service Name *
        </label>
        <input
          type="text"
          value={serviceForm.name}
          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
          placeholder="e.g., Haircut, Manicure, Massage"
          className="w-full px-4 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Duration and Price Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2.5">
            Duration (min) *
          </label>
          <div className="relative">
            <input
              type="number"
              value={serviceForm.duration.toString()}
              onChange={(e) => setServiceForm({ ...serviceForm, duration: parseInt(e.target.value) || 0 })}
              placeholder="30"
              className="w-full px-4 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              min
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2.5">
            Price *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-gray-600">
              £
            </span>
            <input
              type="number"
              step="0.01"
              value={String(serviceForm.price || '')}
              onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Location Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2.5">
          Where will this service be offered? *
        </label>
        <div className="space-y-2">
          {/* Shop/Salon Option */}
          <button
            type="button"
            onClick={() => setServiceForm({ ...serviceForm, locationType: 'shop' })}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-1.5 transition-all ${
              serviceForm.locationType === 'shop'
                ? 'bg-blue-50 border-blue-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
              serviceForm.locationType === 'shop' ? 'bg-blue-100' : 'bg-gray-200'
            }`}>
              <Store className={`w-4.5 h-4.5 ${serviceForm.locationType === 'shop' ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 text-left">
              <div className={`text-sm font-semibold ${
                serviceForm.locationType === 'shop' ? 'text-blue-600' : 'text-gray-900'
              }`}>
                Shop/Salon
              </div>
              <div className="text-xs text-gray-600">At your business location</div>
            </div>
          </button>

          {/* Mobile Option */}
          <button
            type="button"
            onClick={() => setServiceForm({ ...serviceForm, locationType: 'mobile' })}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-1.5 transition-all ${
              serviceForm.locationType === 'mobile'
                ? 'bg-blue-50 border-blue-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
              serviceForm.locationType === 'mobile' ? 'bg-blue-100' : 'bg-gray-200'
            }`}>
              <Car className={`w-4.5 h-4.5 ${serviceForm.locationType === 'mobile' ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 text-left">
              <div className={`text-sm font-semibold ${
                serviceForm.locationType === 'mobile' ? 'text-blue-600' : 'text-gray-900'
              }`}>
                Mobile
              </div>
              <div className="text-xs text-gray-600">Travel to customer</div>
            </div>
          </button>

          {/* Studio/Home Option */}
          <button
            type="button"
            onClick={() => setServiceForm({ ...serviceForm, locationType: 'studio' })}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-1.5 transition-all ${
              serviceForm.locationType === 'studio'
                ? 'bg-blue-50 border-blue-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-full ${
              serviceForm.locationType === 'studio' ? 'bg-blue-100' : 'bg-gray-200'
            }`}>
              <Home className={`w-4.5 h-4.5 ${serviceForm.locationType === 'studio' ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 text-left">
              <div className={`text-sm font-semibold ${
                serviceForm.locationType === 'studio' ? 'text-blue-600' : 'text-gray-900'
              }`}>
                Studio/Home
              </div>
              <div className="text-xs text-gray-600">At your home/studio</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Service Details */}
      {serviceForm.locationType === 'mobile' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2.5">
              Service Radius (miles)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={String(serviceForm.serviceRadius || '')}
                onChange={(e) => setServiceForm({ ...serviceForm, serviceRadius: e.target.value || undefined })}
                placeholder="e.g., 10"
                className="w-full px-4 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                miles
              </span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600">
              Optional: How far from your location are you willing to travel?
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2.5">
              Transport Fee (per mile)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-gray-600">
                £
              </span>
              <input
                type="number"
                step="0.01"
                value={String(serviceForm.transportFeePerMile || '')}
                onChange={(e) => setServiceForm({ ...serviceForm, transportFeePerMile: e.target.value || undefined })}
                placeholder="0.00"
                className="w-full pl-8 pr-16 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                /mile
              </span>
            </div>
            <p className="mt-1.5 text-xs text-gray-600">
              Optional fee charged per mile traveled (leave blank if not applicable)
            </p>
          </div>
        </>
      )}

      {/* After Hours Checkbox */}
      <div>
        <button
          type="button"
          onClick={() => setServiceForm({ ...serviceForm, outOfHours: !serviceForm.outOfHours })}
          className="w-full flex items-start gap-3 p-3 bg-gray-50 rounded-xl border-1.5 border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className={`flex items-center justify-center w-5.5 h-5.5 rounded-md border-2 mt-0.5 ${
            serviceForm.outOfHours ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
          }`}>
            {serviceForm.outOfHours && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-gray-900">After Hours Service</div>
            <div className="text-xs text-gray-600">
              This service is available outside regular business hours
            </div>
          </div>
        </button>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2.5">
          Description
        </label>
        <textarea
          value={serviceForm.description}
          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
          placeholder="Describe what's included in this service..."
          rows={5}
          className="w-full px-4 py-3.5 bg-gray-50 border-1.5 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all ${
          isNextDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
        }`}
      >
        Next
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
