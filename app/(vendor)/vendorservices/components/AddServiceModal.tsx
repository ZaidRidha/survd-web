'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ServiceDetailsStep from './ServiceDetailsStep';
import ServiceAvailabilityStep from './ServiceAvailabilityStep';

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

interface SavedService {
  name: string;
  duration: number;
  price: number;
  description: string;
  availability: ServiceAvailability[];
  locationType?: 'shop' | 'mobile' | 'studio';
  outOfHours?: boolean;
  serviceRadius?: number;
  transportFeePerMile?: number;
}

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: SavedService) => void;
  editingService?: ServiceForm | null;
  defaultAvailability: ServiceAvailability[];
}

export default function AddServiceModal({
  isOpen,
  onClose,
  onSave,
  editingService,
  defaultAvailability,
}: AddServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [availabilityMode, setAvailabilityMode] = useState<'weekly' | 'custom'>('weekly');

  const [serviceForm, setServiceForm] = useState<ServiceForm>({
    name: editingService?.name || '',
    duration: editingService?.duration || 30,
    price: editingService?.price || 0,
    description: editingService?.description || '',
    availability: editingService?.availability || defaultAvailability,
    outOfHours: editingService?.outOfHours || false,
  });

  const totalSteps = 2;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAvailabilityMode('weekly');
    setServiceForm({
      name: '',
      duration: 30,
      price: 0,
      description: '',
      availability: defaultAvailability,
      outOfHours: false,
    });
    onClose();
  };

  const handleSave = () => {
    const priceValue = typeof serviceForm.price === 'string' ? parseFloat(serviceForm.price) : serviceForm.price;
    if (!serviceForm.name || priceValue <= 0 || isNaN(priceValue)) {
      return; // Basic validation
    }

    // Convert string values to numbers before saving
    const serviceToSave: SavedService = {
      name: serviceForm.name,
      duration: serviceForm.duration,
      price: priceValue,
      description: serviceForm.description,
      availability: serviceForm.availability,
      locationType: serviceForm.locationType,
      outOfHours: serviceForm.outOfHours,
      serviceRadius: serviceForm.serviceRadius ? (typeof serviceForm.serviceRadius === 'string' ? parseFloat(serviceForm.serviceRadius) : serviceForm.serviceRadius) : undefined,
      transportFeePerMile: serviceForm.transportFeePerMile ? (typeof serviceForm.transportFeePerMile === 'string' ? parseFloat(serviceForm.transportFeePerMile) : serviceForm.transportFeePerMile) : undefined,
    };

    onSave(serviceToSave);
    handleClose();
  };

  const canProceed = () => {
    if (currentStep === 1) {
      const priceValue = typeof serviceForm.price === 'string' ? parseFloat(serviceForm.price) : serviceForm.price;
      return serviceForm.name.trim().length > 0 && priceValue > 0 && !isNaN(priceValue) && serviceForm.locationType;
    }
    return true;
  };

  // Reset form when modal becomes visible
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setAvailabilityMode('weekly');
      if (editingService) {
        setServiceForm(editingService);
      } else {
        setServiceForm({
          name: '',
          duration: 30,
          price: 0,
          description: '',
          availability: defaultAvailability,
          outOfHours: false,
        });
      }
    }
  }, [isOpen, editingService, defaultAvailability]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="w-10" /> {/* Spacer */}
          <h2 className="text-xl font-bold text-gray-900">
            {editingService ? 'Edit Service' : 'Add Service'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <ServiceDetailsStep
              serviceForm={serviceForm}
              setServiceForm={setServiceForm}
              onNext={handleNext}
            />
          )}

          {/* Step 2: Availability */}
          {currentStep === 2 && (
            <ServiceAvailabilityStep
              serviceForm={serviceForm}
              setServiceForm={setServiceForm}
              availabilityMode={availabilityMode}
              setAvailabilityMode={setAvailabilityMode}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
