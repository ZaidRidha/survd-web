// Shared TypeScript types
// These can be copied from your React Native app or kept in sync

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'customer' | 'vendor';
  createdAt: Date;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  category: ServiceCategory;
  address: Address;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  images: string[];
}

export interface Appointment {
  id: string;
  customerId: string;
  vendorId: string;
  serviceId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  notes?: string;
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: ServiceCategory;
}

export type ServiceCategory =
  | 'barber'
  | 'hairstylist'
  | 'nails'
  | 'spa'
  | 'massage'
  | 'makeup'
  | 'skincare'
  | 'other';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  vendorId: string;
  customerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
