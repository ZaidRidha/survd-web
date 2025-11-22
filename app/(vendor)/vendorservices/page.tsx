'use client';

import React, { useState } from 'react';
import {
  Plus,
  Clock,
  DollarSign,
  Edit2,
  Trash2,
  Calendar,
  Car,
  Home,
  Store,
  Moon,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import AddServiceModal from './components/AddServiceModal';
import ViewAvailabilityModal from './components/ViewAvailabilityModal';

interface ServiceAvailability {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface VendorService {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
  availability: ServiceAvailability[];
  locationType?: 'shop' | 'mobile' | 'studio';
  outOfHours?: boolean;
  serviceRadius?: number; // in miles (for mobile services)
  transportFeePerMile?: number; // cost per mile (for mobile services)
}

export default function VendorServicesPage() {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<VendorService | null>(null);
  const [viewingService, setViewingService] = useState<VendorService | null>(null);

  const defaultAvailability: ServiceAvailability[] = [
    { day: 'Mon', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tue', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wed', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thu', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Fri', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Sat', enabled: false, startTime: '10:00', endTime: '16:00' },
    { day: 'Sun', enabled: false, startTime: '10:00', endTime: '16:00' },
  ];

  const [services, setServices] = useState<VendorService[]>([
    {
      id: '1',
      name: 'Haircut',
      duration: 30,
      price: 25.0,
      description: 'Standard haircut and styling',
      locationType: 'shop',
      outOfHours: false,
      availability: [
        { day: 'Mon', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Tue', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Wed', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Thu', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Fri', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Sat', enabled: true, startTime: '10:00', endTime: '16:00' },
        { day: 'Sun', enabled: false, startTime: '10:00', endTime: '16:00' },
      ],
    },
    {
      id: '2',
      name: 'Mobile Beard Trim',
      duration: 15,
      price: 15.0,
      description: 'Professional beard trimming and shaping at your location',
      locationType: 'mobile',
      outOfHours: true,
      serviceRadius: 15,
      transportFeePerMile: 0.5,
      availability: [
        { day: 'Mon', enabled: true, startTime: '18:00', endTime: '22:00' },
        { day: 'Tue', enabled: true, startTime: '18:00', endTime: '22:00' },
        { day: 'Wed', enabled: true, startTime: '18:00', endTime: '22:00' },
        { day: 'Thu', enabled: true, startTime: '18:00', endTime: '22:00' },
        { day: 'Fri', enabled: true, startTime: '18:00', endTime: '22:00' },
        { day: 'Sat', enabled: true, startTime: '10:00', endTime: '20:00' },
        { day: 'Sun', enabled: true, startTime: '10:00', endTime: '18:00' },
      ],
    },
    {
      id: '3',
      name: 'Hair Coloring',
      duration: 90,
      price: 65.0,
      description: 'Full hair coloring service with premium products',
      locationType: 'studio',
      outOfHours: false,
      availability: [
        { day: 'Mon', enabled: true, startTime: '10:00', endTime: '18:00' },
        { day: 'Tue', enabled: true, startTime: '10:00', endTime: '18:00' },
        { day: 'Wed', enabled: true, startTime: '10:00', endTime: '18:00' },
        { day: 'Thu', enabled: true, startTime: '10:00', endTime: '18:00' },
        { day: 'Fri', enabled: true, startTime: '10:00', endTime: '18:00' },
        { day: 'Sat', enabled: true, startTime: '09:00', endTime: '17:00' },
        { day: 'Sun', enabled: false, startTime: '10:00', endTime: '16:00' },
      ],
    },
  ]);

  const openAddServiceModal = () => {
    setEditingService(null);
    setShowServiceModal(true);
  };

  const openEditServiceModal = (service: VendorService) => {
    setEditingService(service);
    setShowServiceModal(true);
  };

  const handleSaveService = (serviceForm: Omit<VendorService, 'id'>) => {
    if (editingService) {
      // Update existing service
      setServices(
        services.map((s) =>
          s.id === editingService.id ? { ...editingService, ...serviceForm } : s
        )
      );
    } else {
      // Add new service
      const newService: VendorService = {
        id: Date.now().toString(),
        ...serviceForm,
      };
      setServices([...services, newService]);
    }

    setShowServiceModal(false);
    setEditingService(null);
  };

  const deleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter((s) => s.id !== serviceId));
    }
  };

  const openAvailabilityModal = (service: VendorService) => {
    setViewingService(service);
  };

  const handleSaveAvailability = (availability: ServiceAvailability[]) => {
    if (viewingService) {
      setServices(
        services.map((s) =>
          s.id === viewingService.id ? { ...s, availability } : s
        )
      );
    }
  };

  const getLocationIcon = (locationType?: string) => {
    switch (locationType) {
      case 'mobile':
        return <Car className="w-3.5 h-3.5" />;
      case 'studio':
        return <Home className="w-3.5 h-3.5" />;
      case 'shop':
        return <Store className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getLocationLabel = (locationType?: string) => {
    switch (locationType) {
      case 'mobile':
        return 'Mobile Service';
      case 'studio':
        return 'Home/Studio';
      case 'shop':
        return 'Shop';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <button
            onClick={openAddServiceModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Plus className="w-8 h-8 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Add and edit your services that appear on your profile
        </p>

        {/* Services List */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200">
            <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-semibold mb-2">No services added yet</p>
            <p className="text-gray-400 text-sm">
              Tap the + button above to add your first service
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Service Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditServiceModal(service)}
                      className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {service.description && (
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {service.description}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.locationType && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-500 rounded-lg text-xs font-semibold text-gray-900">
                      {getLocationIcon(service.locationType)}
                      {getLocationLabel(service.locationType)}
                    </span>
                  )}
                  {service.outOfHours && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-500 rounded-lg text-xs font-semibold text-gray-900">
                      <Moon className="w-3.5 h-3.5" />
                      After Hours
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {service.duration} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4.5 h-4.5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      £{service.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* View Availability Button */}
                <button
                  onClick={() => openAvailabilityModal(service)}
                  className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      View Availability
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Service Modal */}
      <AddServiceModal
        isOpen={showServiceModal}
        onClose={() => {
          setShowServiceModal(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
        editingService={editingService}
        defaultAvailability={defaultAvailability}
      />

      {/* View Availability Modal */}
      <ViewAvailabilityModal
        isOpen={viewingService !== null}
        onClose={() => setViewingService(null)}
        service={viewingService}
        onSave={handleSaveAvailability}
      />
    </div>
  );
}
