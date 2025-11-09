'use client';

import { useState } from 'react';
import Image from 'next/image';

type UserType = 'customer' | 'vendor' | '';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '' as UserType,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.userType) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', userType: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            You&apos;re on the list!
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;ll notify you when Survd launches. Get ready for a better way to book services!
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Add another person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Join the Waitlist
        </h2>
        <p className="text-gray-600">
          Be the first to know when we launch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-900 bg-gray-50"
            placeholder="John Doe"
            disabled={isSubmitting}
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-900 bg-gray-50"
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
        </div>

        {/* User Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'customer' })}
              disabled={isSubmitting}
              className={`p-4 rounded-lg border-2 transition ${
                formData.userType === 'customer'
                  ? 'border-primary bg-primary-light text-gray-900'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700 bg-white'
              }`}
            >
              <div className="mb-2 flex justify-center">
                <Image
                  src="/images/logos/CustomerWaitListLogo.png"
                  alt="Customer"
                  width={40}
                  height={40}
                />
              </div>
              <div className="font-semibold text-sm">Customer</div>
              <div className="text-xs opacity-75">Book services</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'vendor' })}
              disabled={isSubmitting}
              className={`p-4 rounded-lg border-2 transition ${
                formData.userType === 'vendor'
                  ? 'border-primary bg-primary-light text-gray-900'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700 bg-white'
              }`}
            >
              <div className="mb-2 flex justify-center">
                <Image
                  src="/images/logos/VendorWaitListLogo.png"
                  alt="Vendor"
                  width={40}
                  height={40}
                />
              </div>
              <div className="font-semibold text-sm">Vendor</div>
              <div className="text-xs opacity-75">Offer services</div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 text-danger text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We&apos;ll never share your information. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
