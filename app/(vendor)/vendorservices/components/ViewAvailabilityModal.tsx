'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ServiceAvailabilityStep from './ServiceAvailabilityStep';

interface ServiceAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface VendorService {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  availability: ServiceAvailability[];
  locationType?: 'shop' | 'mobile' | 'studio';
  outOfHours?: boolean;
}

interface ViewAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: VendorService | null;
  onSave?: (availability: ServiceAvailability[]) => void;
}

export default function ViewAvailabilityModal({
  isOpen,
  onClose,
  service,
  onSave,
}: ViewAvailabilityModalProps) {
  const [availabilityMode, setAvailabilityMode] = useState<'weekly' | 'custom'>('weekly');

  const [serviceForm, setServiceFormState] = useState({
    name: service?.name || '',
    duration: service?.duration || 0,
    price: service?.price || 0,
    description: service?.description || '',
    availability: service?.availability || [],
  });

  const setServiceForm = (updatedForm: any) => {
    setServiceFormState(updatedForm);
  };

  useEffect(() => {
    if (service) {
      setServiceFormState({
        name: service.name,
        duration: service.duration,
        price: service.price,
        description: service.description,
        availability: service.availability,
      });
    }
  }, [service]);

  const handleSave = () => {
    if (onSave) {
      onSave(serviceForm.availability);
    }
    onClose();
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
            <p className="text-sm text-gray-600">Availability Schedule</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <ServiceAvailabilityStep
            serviceForm={serviceForm}
            setServiceForm={setServiceForm}
            availabilityMode={availabilityMode}
            setAvailabilityMode={setAvailabilityMode}
            onNext={handleSave}
            onBack={onClose}
          />
        </div>
      </div>
    </div>
  );
}
