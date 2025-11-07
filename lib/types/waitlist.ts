// Waitlist types

export type UserType = 'customer' | 'vendor';

export interface WaitlistEntry {
  id?: string;
  name: string;
  email: string;
  userType: UserType;
  createdAt?: Date;
}

export interface WaitlistFormData {
  name: string;
  email: string;
  userType: UserType | '';
}
