'use client';

import React from 'react';
import { Bell, Calendar, Clock, Star, XCircle, Info, BellOff } from 'lucide-react';

interface Notification {
  id: number;
  type: 'booking' | 'reminder' | 'review' | 'alert' | 'cancellation';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function VendorNotificationsPage() {
  // Sample notifications data for vendors
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'booking',
      title: 'New Appointment Request',
      message: 'Sarah Johnson requested a haircut appointment for tomorrow at 14:00',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Michael Chen in 30 minutes',
      time: '30 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'review',
      title: 'New Review',
      message: 'Emma Davis left you a 5-star review!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 4,
      type: 'cancellation',
      title: 'Appointment Cancelled',
      message: 'James Wilson cancelled their appointment for Oct 28',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'alert',
      title: 'Payment Received',
      message: 'You received $45 payment from Olivia Martinez',
      time: '2 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'reminder':
        return Clock;
      case 'review':
        return Star;
      case 'cancellation':
        return XCircle;
      case 'alert':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return '#4CAF50';
      case 'reminder':
        return '#FF9800';
      case 'review':
        return '#FFD700';
      case 'cancellation':
        return '#F44336';
      case 'alert':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>
      </header>

      {/* Notifications List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const color = getNotificationColor(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
                    !notification.read ? 'border-l-4' : ''
                  }`}
                  style={!notification.read ? { borderLeftColor: color } : {}}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <BellOff className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-lg text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
