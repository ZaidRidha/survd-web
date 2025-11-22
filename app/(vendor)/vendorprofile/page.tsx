'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Plus, X, MapPin, Clock, Phone, Instagram, Trash2, Camera, ChevronDown } from 'lucide-react';

// Dummy vendor data (will be replaced with API call)
const dummyVendor = {
  id: 1,
  name: 'Mike The Barber',
  username: '@mikethebarber',
  image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
  coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
  images: [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800',
  ],
  rating: 4.4,
  reviews: 140,
  pinnedMessage: 'Professional barbering services with over 10 years of experience. Specializing in modern fades, classic cuts, and beard grooming.',
  location: {
    address: '31 Tongdak Drive',
    postcode: 'SW8 3TV',
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  hours: [
    { day: 'Mon', time: '9-5' },
    { day: 'Tue', time: '9-5' },
    { day: 'Wed', time: 'Closed' },
    { day: 'Thu', time: '9-5' },
    { day: 'Fri', time: '9-5' },
    { day: 'Sat', time: '10-4' },
    { day: 'Sun', time: 'Closed' },
  ],
  contact: {
    phone: '07852118089',
    instagram: '@mikethebarber'
  },
  serviceTypes: {
    mobile: true,
    inShop: true,
    homeStudio: true,
  },
  walkIns: false,
  requireConfirmation: true,
  acceptGuestBookings: false,
  hideAddressUntilConfirmed: false,
  healthSafety: {
    verified: true,
    details: [
      'Fully compliant with hygiene standards',
      '5 years experience barbering',
    ],
  },
  cancellationFee: 10.00,
  cancellationPolicy: 'Cancellations must be made 24 hours in advance or a £10 fee will apply.',
  lateFeePercentage: 20,
  latePolicy: 'Customers arriving more than 15 minutes late will be charged 20% of the service fee.',
  noShowFee: 50.00,
  noShowPolicy: 'Failure to show up for an appointment without notice will result in a £50 fee.',
  paymentMethods: {
    cash: true,
    card: true,
  },
  insured: true,
  specialties: ['Afro', 'Fades', 'Caucasian'],
};

type StatusType = 'active' | 'onBreak' | 'walkInsOnly' | 'notActive';
type ModalType = 'noShow' | 'late' | 'cancellation' | 'payment' | 'status' | null;

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
}

function EditModal({ isOpen, onClose, title, children, onSave }: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave();
              onClose();
            }}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VendorProfilePage() {
  const router = useRouter();
  const [vendor, setVendor] = useState(dummyVendor);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'portfolio'>('about');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<StatusType>('active');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [portfolioModalIndex, setPortfolioModalIndex] = useState<number | null>(null);

  // Edit form states
  const [editedPinnedMessage, setEditedPinnedMessage] = useState(vendor.pinnedMessage);
  const [editedContact, setEditedContact] = useState(vendor.contact);
  const [editedLocation, setEditedLocation] = useState({
    address: vendor.location.address,
    postcode: vendor.location.postcode,
  });

  const getStatusConfig = (statusType: StatusType) => {
    switch (statusType) {
      case 'active':
        return { text: 'Active Now', color: 'bg-green-500', dotColor: 'bg-white' };
      case 'onBreak':
        return { text: 'On Break', color: 'bg-orange-500', dotColor: 'bg-white' };
      case 'walkInsOnly':
        return { text: 'Walk-ins Only', color: 'bg-blue-500', dotColor: 'bg-white' };
      case 'notActive':
        return { text: 'Not Active', color: 'bg-gray-500', dotColor: 'bg-white' };
    }
  };

  const statusConfig = getStatusConfig(status);

  const handleImageUpload = (type: 'profile' | 'cover' | 'portfolio') => {
    alert(`Upload ${type} image - Will integrate with file upload API`);
  };

  const handleSavePinnedMessage = () => {
    setVendor({ ...vendor, pinnedMessage: editedPinnedMessage });
    setIsEditing(false);
  };

  const handleSaveContact = () => {
    setVendor({ ...vendor, contact: editedContact });
  };

  const handleSaveLocation = () => {
    setVendor({ ...vendor, location: { ...vendor.location, address: editedLocation.address, postcode: editedLocation.postcode } });
  };

  const renderStatusOptions = () => {
    return (
      <div className="space-y-3">
        {(['active', 'onBreak', 'walkInsOnly', 'notActive'] as StatusType[]).map((statusOption) => {
          const config = getStatusConfig(statusOption);
          return (
            <button
              key={statusOption}
              onClick={() => {
                setStatus(statusOption);
                setActiveModal(null);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                status === statusOption ? 'bg-gray-100 border-2 border-gray-900' : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className="font-semibold text-gray-900">{config.text}</span>
              </div>
              {status === statusOption && (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderPolicyModal = () => {
    let title = '';
    let content = null;

    switch (activeModal) {
      case 'noShow':
        title = 'No-Show Policy';
        content = (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No-Show Fee</label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-lg font-bold text-gray-900">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={vendor.noShowFee}
                  onChange={(e) => setVendor({...vendor, noShowFee: parseFloat(e.target.value) || 0})}
                  className="flex-1 bg-transparent text-lg font-bold text-gray-900 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Description</label>
              <textarea
                value={vendor.noShowPolicy}
                onChange={(e) => setVendor({...vendor, noShowPolicy: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Describe your no-show policy..."
              />
            </div>
          </div>
        );
        break;
      case 'late':
        title = 'Late Arrival Policy';
        content = (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee Percentage</label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  type="number"
                  value={vendor.lateFeePercentage}
                  onChange={(e) => setVendor({...vendor, lateFeePercentage: parseInt(e.target.value) || 0})}
                  className="flex-1 bg-transparent text-lg font-bold text-gray-900 focus:outline-none"
                  placeholder="0"
                />
                <span className="text-lg font-bold text-gray-900">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Description</label>
              <textarea
                value={vendor.latePolicy}
                onChange={(e) => setVendor({...vendor, latePolicy: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Describe your late arrival policy..."
              />
            </div>
          </div>
        );
        break;
      case 'cancellation':
        title = 'Cancellation Policy';
        content = (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Fee</label>
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-lg font-bold text-gray-900">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={vendor.cancellationFee}
                  onChange={(e) => setVendor({...vendor, cancellationFee: parseFloat(e.target.value) || 0})}
                  className="flex-1 bg-transparent text-lg font-bold text-gray-900 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Description</label>
              <textarea
                value={vendor.cancellationPolicy}
                onChange={(e) => setVendor({...vendor, cancellationPolicy: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Describe your cancellation policy..."
              />
            </div>
          </div>
        );
        break;
      case 'payment':
        title = 'Payment Preferences';
        content = (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 mb-3">Accepted Payment Methods</p>
            <button
              onClick={() => setVendor({
                ...vendor,
                paymentMethods: {...vendor.paymentMethods, cash: !vendor.paymentMethods.cash}
              })}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold text-gray-900">Cash</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${vendor.paymentMethods.cash ? 'bg-green-500' : 'bg-gray-300'}`}>
                {vendor.paymentMethods.cash && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
            <button
              onClick={() => setVendor({
                ...vendor,
                paymentMethods: {...vendor.paymentMethods, card: !vendor.paymentMethods.card}
              })}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-semibold text-gray-900">Card</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${vendor.paymentMethods.card ? 'bg-green-500' : 'bg-gray-300'}`}>
                {vendor.paymentMethods.card && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        );
        break;
    }

    if (!activeModal || activeModal === 'status') return null;

    return (
      <EditModal
        isOpen={true}
        onClose={() => setActiveModal(null)}
        title={title}
        onSave={() => setActiveModal(null)}
      >
        {content}
      </EditModal>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Cover Photo */}
      <div className="relative h-72 bg-gray-100">
        <Image src={vendor.coverImage} alt={vendor.name} fill className="object-cover" />

        {/* Edit Cover Photo Button */}
        <button
          onClick={() => handleImageUpload('cover')}
          className="absolute top-6 left-6 bg-white text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Edit Cover
        </button>

        {/* Status Badge - Top Right on Cover */}
        <button
          onClick={() => setActiveModal('status')}
          className={`absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-colors ${statusConfig.color}`}
        >
          <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} ${status === 'active' ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-white font-semibold">{statusConfig.text}</span>
          <ChevronDown className="w-3 h-3 text-white" />
        </button>

        {/* Profile Image - Centered Bottom */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="relative w-40 h-40 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white group">
            <Image src={vendor.image} alt={vendor.name} fill className="object-cover" />
            <button
              onClick={() => handleImageUpload('profile')}
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center"
            >
              <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Info */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{vendor.name}</h1>
          <p className="text-lg text-gray-500 mb-3">{vendor.username}</p>
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100">
            <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-bold text-gray-900">{vendor.rating}</span>
            <span className="text-gray-500">({vendor.reviews} reviews)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 mb-8">
          <div className="flex gap-8 justify-center">
            {[
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Tell customers about your business</p>
              <div className={`rounded-2xl p-4 ${isEditing ? 'bg-white border-2 border-green-500' : 'bg-gray-50 border-2 border-gray-100'}`}>
                <textarea
                  value={isEditing ? editedPinnedMessage : vendor.pinnedMessage}
                  onChange={(e) => setEditedPinnedMessage(e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full bg-transparent text-gray-700 focus:outline-none resize-none"
                  placeholder="Tell customers about your business, experience, and what makes you unique..."
                />
                {isEditing && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{editedPinnedMessage.length}/200</span>
                    <button
                      onClick={handleSavePinnedMessage}
                      className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={vendor.contact.phone}
                    onChange={(e) => setVendor({ ...vendor, contact: { ...vendor.contact, phone: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="text"
                    value={vendor.contact.instagram}
                    onChange={(e) => setVendor({ ...vendor, contact: { ...vendor.contact, instagram: e.target.value } })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Location & Hours */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Location & Hours</h2>
                  {vendor.hideAddressUntilConfirmed && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 border border-gray-200 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-1">{vendor.location.address}</p>
                <p className="text-sm font-medium text-gray-900 mb-3">{vendor.location.postcode}</p>
                {vendor.hideAddressUntilConfirmed && (
                  <p className="text-xs text-orange-600 font-medium mb-3">
                    Address hidden from customers until you confirm their appointment
                  </p>
                )}
                <p className="text-xs text-gray-500 italic">Tap to edit location and business hours</p>
              </div>
            </div>

            {/* Portfolio Photos */}
            <button className="w-full bg-white rounded-3xl p-8 border border-gray-100 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Portfolio Photos</h2>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Showcase your work with photos</p>
            </button>

            {/* Professional Details */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h2>
              <p className="text-sm text-gray-500 mb-4">Your qualifications and expertise</p>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                {vendor.healthSafety.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">{detail}</span>
                  </div>
                ))}

                <button
                  onClick={() => setVendor({...vendor, insured: !vendor.insured})}
                  className="flex items-start gap-3 w-full"
                >
                  <svg className={`w-5 h-5 mt-0.5 ${vendor.insured ? 'text-green-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm font-semibold ${vendor.insured ? 'text-gray-900' : 'text-gray-400'}`}>Fully Insured</span>
                </button>

                <div className="h-px bg-gray-200 my-4" />

                <div>
                  <p className="text-sm font-bold text-gray-900 mb-3">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty, index) => (
                      <span key={index} className="px-4 py-2 bg-green-50 border-2 border-green-500 text-green-600 rounded-full text-sm font-semibold">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Service Types */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Service Types</h2>
              <p className="text-sm text-gray-500 mb-4">Select where you provide your services</p>

              <div className="space-y-4">
                {/* In Shop */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold text-gray-900">In Shop</span>
                  </div>
                  <button
                    onClick={() => setVendor({
                      ...vendor,
                      serviceTypes: {...vendor.serviceTypes, inShop: !vendor.serviceTypes.inShop}
                    })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.serviceTypes.inShop ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.serviceTypes.inShop ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>

                {vendor.serviceTypes.inShop && (
                  <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-900 bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-gray-900">Add Staff Member</p>
                        <p className="text-xs text-gray-600">Manage your team</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                <div className="h-px bg-gray-100" />

                {/* Home/Studio */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold text-gray-900">Home/Studio</span>
                  </div>
                  <button
                    onClick={() => setVendor({
                      ...vendor,
                      serviceTypes: {...vendor.serviceTypes, homeStudio: !vendor.serviceTypes.homeStudio}
                    })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.serviceTypes.homeStudio ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.serviceTypes.homeStudio ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Mobile */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <span className="font-semibold text-gray-900">Mobile</span>
                  </div>
                  <button
                    onClick={() => setVendor({
                      ...vendor,
                      serviceTypes: {...vendor.serviceTypes, mobile: !vendor.serviceTypes.mobile}
                    })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.serviceTypes.mobile ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.serviceTypes.mobile ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Settings */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Booking Settings</h2>
              <p className="text-sm text-gray-500 mb-4">Configure how you want to handle bookings</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Accept walk-in customers</p>
                    <p className="text-sm text-gray-500">{vendor.walkIns ? 'You are accepting walk-ins' : 'Bookings only'}</p>
                  </div>
                  <button
                    onClick={() => setVendor({...vendor, walkIns: !vendor.walkIns})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.walkIns ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.walkIns ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Require appointment confirmation</p>
                    <p className="text-sm text-gray-500">{vendor.requireConfirmation ? 'You must confirm appointments before they are finalized' : 'Appointments are automatically confirmed'}</p>
                  </div>
                  <button
                    onClick={() => setVendor({...vendor, requireConfirmation: !vendor.requireConfirmation})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.requireConfirmation ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.requireConfirmation ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Accept guest bookings</p>
                    <p className="text-sm text-gray-500">{vendor.acceptGuestBookings ? 'Guests can book without registering' : 'Only registered users can book'}</p>
                  </div>
                  <button
                    onClick={() => setVendor({...vendor, acceptGuestBookings: !vendor.acceptGuestBookings})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.acceptGuestBookings ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.acceptGuestBookings ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Hide address until confirmed</p>
                    <p className="text-sm text-gray-500">{vendor.hideAddressUntilConfirmed ? 'Address revealed only after you confirm the appointment' : 'Address visible to all customers who book'}</p>
                  </div>
                  <button
                    onClick={() => setVendor({...vendor, hideAddressUntilConfirmed: !vendor.hideAddressUntilConfirmed})}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      vendor.hideAddressUntilConfirmed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      vendor.hideAddressUntilConfirmed ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Preferences */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Preferences</h2>
              <button
                onClick={() => setActiveModal('payment')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Accepted Payment Methods</p>
                    <p className="text-sm text-gray-500">
                      {vendor.paymentMethods.cash && vendor.paymentMethods.card
                        ? 'Cash & Card'
                        : vendor.paymentMethods.cash
                        ? 'Cash only'
                        : vendor.paymentMethods.card
                        ? 'Card only'
                        : 'Not set'}
                    </p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Policies & Fees */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Policies & Fees</h2>
              <p className="text-sm text-gray-500 mb-4">Set your business policies and associated fees</p>

              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal('cancellation')}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Cancellation Policy</p>
                      <p className="text-sm text-gray-500">Fee: £{vendor.cancellationFee.toFixed(2)}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveModal('late')}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Late Arrival Policy</p>
                      <p className="text-sm text-gray-500">Fee: {vendor.lateFeePercentage}% of service</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveModal('noShow')}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">No-Show Policy</p>
                      <p className="text-sm text-gray-500">Fee: £{vendor.noShowFee.toFixed(2)}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio</h3>
            <p className="text-gray-500">Showcase your work with photos and videos</p>
          </div>
        )}
      </div>

      {/* Status Change Modal */}
      {activeModal === 'status' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Change Status</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderStatusOptions()}
          </div>
        </div>
      )}

      {/* Policy Modals */}
      {renderPolicyModal()}
    </div>
  );
}
