'use client';

import { useState } from 'react';
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Calendar,
  ArrowRight,
  Info,
  Building,
  Edit,
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  BarChart3,
  Flag,
  Settings,
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

const mockPayments: PaymentRecord[] = [
  {
    id: '1',
    date: 'Oct 20, 2025',
    description: 'Weekly Payout',
    amount: '$450.00',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: '2',
    date: 'Oct 13, 2025',
    description: 'Weekly Payout',
    amount: '$520.00',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: '3',
    date: 'Oct 6, 2025',
    description: 'Weekly Payout',
    amount: '$380.00',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: '4',
    date: 'Sep 29, 2025',
    description: 'Weekly Payout',
    amount: '$495.00',
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: '5',
    date: 'Sep 22, 2025',
    description: 'Weekly Payout',
    amount: '$410.00',
    status: 'completed',
    method: 'Bank Transfer',
  },
];

// Mock data for the graph
const earningsData = [420, 480, 450, 520, 490, 540];
const earningsLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function VendorEarningsPage() {
  const [selectedTab, setSelectedTab] = useState<'finances' | 'statistics'>('finances');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [dailyTarget, setDailyTarget] = useState(200);
  const [isTargetModalVisible, setIsTargetModalVisible] = useState(false);
  const [targetInput, setTargetInput] = useState('200');

  const currentDayEarnings = 245;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const handleSaveTarget = () => {
    const newTarget = parseFloat(targetInput);
    if (!isNaN(newTarget) && newTarget > 0) {
      setDailyTarget(newTarget);
      setIsTargetModalVisible(false);
    }
  };

  const targetPercentage = (currentDayEarnings / dailyTarget) * 100;
  const isHittingTarget = currentDayEarnings >= dailyTarget;

  const maxValue = Math.max(...earningsData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Tab Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTab('finances')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                selectedTab === 'finances'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>Finances</span>
            </button>
            <button
              onClick={() => setSelectedTab('statistics')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                selectedTab === 'statistics'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Statistics</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Finances Tab */}
        {selectedTab === 'finances' && (
          <>
            {/* Available Funds */}
            <div className="mb-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Available Funds</p>
                    <p className="text-4xl font-bold text-gray-900 mb-3">$1,245.00</p>
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all">
                      <span>Withdraw</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {mockPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            payment.status === 'completed'
                              ? 'bg-green-100'
                              : payment.status === 'pending'
                              ? 'bg-yellow-100'
                              : 'bg-red-100'
                          }`}
                        >
                          {getStatusIcon(payment.status)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{payment.description}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                          <p className="text-xs text-gray-500">{payment.method}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-lg font-bold text-gray-900">{payment.amount}</p>
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all text-xs font-semibold border border-gray-200">
                          <AlertCircle className="w-4 h-4" />
                          <span>Issue</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Payment Schedule</p>
                  <p className="text-sm text-gray-600">
                    Earnings are automatically transferred to your bank account every Monday at
                    9:00 AM EST.
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Account Info */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Payout Account
                      </p>
                      <p className="text-lg font-bold text-gray-900">Chase Bank</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all">
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Account Type</span>
                    <span className="text-sm font-bold text-gray-900">Business Checking</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Account Number</span>
                    <span className="text-sm font-bold text-gray-900 tracking-wider">
                      ••••••5432
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Routing Number</span>
                    <span className="text-sm font-bold text-gray-900 tracking-wider">
                      ••••••1234
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Verified & Secure</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Statistics Tab */}
        {selectedTab === 'statistics' && (
          <>
            {/* Earnings Graph */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Earnings Overview</h2>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setSelectedPeriod('week')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      selectedPeriod === 'week'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      selectedPeriod === 'month'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('year')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      selectedPeriod === 'year'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              {/* Simple Line Chart */}
              <div className="relative h-56">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="#e8e8e8"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <text
                      key={i}
                      x="5"
                      y={200 - i * 50}
                      fontSize="12"
                      fill="#666"
                      dominantBaseline="middle"
                    >
                      ${Math.round((maxValue / 4) * i)}
                    </text>
                  ))}

                  {/* Line path */}
                  <path
                    d={earningsData
                      .map((value, index) => {
                        const x = 80 + (index * 500) / (earningsData.length - 1);
                        const y = 180 - (value / maxValue) * 160;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#007AFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* X-axis labels */}
                  {earningsLabels.map((label, index) => (
                    <text
                      key={index}
                      x={80 + (index * 500) / (earningsData.length - 1)}
                      y="195"
                      fontSize="12"
                      fill="#666"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Daily Target Card */}
            <div
              className={`bg-white rounded-xl p-6 shadow-sm border-2 mb-4 cursor-pointer hover:shadow-md transition-all ${
                isHittingTarget ? 'border-green-500' : 'border-yellow-500'
              }`}
              onClick={() => {
                setTargetInput(dailyTarget.toString());
                setIsTargetModalVisible(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Flag className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-600">Daily Target</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-gray-900">${currentDayEarnings}</span>
                    <span className="text-xl font-semibold text-gray-500">/</span>
                    <span className="text-xl font-semibold text-gray-600">${dailyTarget}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isHittingTarget ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(targetPercentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center ml-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                      isHittingTarget ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  >
                    <TrendingUp
                      className={`w-8 h-8 ${
                        isHittingTarget ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      isHittingTarget ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {targetPercentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 mb-1">$12,450</p>
                <p className="text-sm font-semibold text-gray-500">Total Revenue</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900 mb-1">$2,615</p>
                <p className="text-sm font-semibold text-gray-500">Monthly Revenue</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Target Setting Modal */}
      {isTargetModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsTargetModalVisible(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold text-gray-900">Set Daily Target</h2>
              <button
                onClick={() => setIsTargetModalVisible(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Set your daily revenue goal to track your progress
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Amount
              </label>
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                <span className="text-xl font-semibold text-gray-600 mr-1">$</span>
                <input
                  type="number"
                  className="flex-1 text-xl font-semibold text-gray-900 bg-transparent outline-none"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder="200"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsTargetModalVisible(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTarget}
                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
              >
                Save Target
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
