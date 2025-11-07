// ServiceCard component
// Similar to the mobile app's ServiceCard but optimized for web

import React from 'react';
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  onBook?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{service.category}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{formatPrice(service.price)}</p>
          <p className="text-sm text-gray-500">{formatDuration(service.duration)}</p>
        </div>
      </div>

      {service.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
      )}

      {onBook && (
        <button
          onClick={onBook}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Book Now
        </button>
      )}
    </div>
  );
};
