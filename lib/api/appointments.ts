// Appointments API
// This file can be shared between web and mobile apps

import { apiClient } from './client';
import type { Appointment } from '../types';

export const appointmentsAPI = {
  // Get all appointments for a user
  getMyAppointments: async (): Promise<Appointment[]> => {
    return apiClient.get<Appointment[]>('/appointments/my');
  },

  // Get appointment by ID
  getAppointment: async (id: string): Promise<Appointment> => {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  },

  // Create new appointment
  createAppointment: async (data: {
    vendorId: string;
    serviceId: string;
    date: Date;
    startTime: string;
    notes?: string;
  }): Promise<Appointment> => {
    return apiClient.post<Appointment>('/appointments', data);
  },

  // Update appointment
  updateAppointment: async (
    id: string,
    data: Partial<Appointment>
  ): Promise<Appointment> => {
    return apiClient.put<Appointment>(`/appointments/${id}`, data);
  },

  // Cancel appointment
  cancelAppointment: async (id: string): Promise<Appointment> => {
    return apiClient.put<Appointment>(`/appointments/${id}/cancel`, {});
  },

  // Get vendor's appointments
  getVendorAppointments: async (vendorId: string): Promise<Appointment[]> => {
    return apiClient.get<Appointment[]>(`/vendors/${vendorId}/appointments`);
  },
};
