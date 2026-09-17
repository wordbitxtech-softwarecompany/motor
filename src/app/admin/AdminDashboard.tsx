'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Car,
  KeyRound,
  Users,
  CalendarCheck,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Search,
  Filter,
  DollarSign,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Layers,
  FileText,
  BadgePercent,
  Zap,
  BatteryCharging
} from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';
import AdminListings from '@/components/AdminListings';

export default function AdminDashboard({
  initialVehicles,
  initialBookings,
  initialTestDrives,
  initialLeads,
  initialOffers,
  initialAds = [],
}: {
  initialVehicles: any[];
  initialBookings: any[];
  initialTestDrives: any[];
  initialLeads: any[];
  initialOffers: any[];
  initialAds?: any[];
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ads' | 'inventory' | 'rentals' | 'crm' | 'test-drives' | 'offers'>('ads');

  // Local state for interactive updates
  const [vehiclesList, setVehiclesList] = useState(initialVehicles);
  const [bookingsList, setBookingsList] = useState(initialBookings);
  const [testDrivesList, setTestDrivesList] = useState(initialTestDrives);
  const [leadsList, setLeadsList] = useState(initialLeads);

  // Search & Filter
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleStatusFilter, setVehicleStatusFilter] = useState('');
  const [vehiclePowertrainFilter, setVehiclePowertrainFilter] = useState('');

  // Add Vehicle Modal
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: 'Toyota',
    model: '',
    year: 2025,
    price: 7850000,
    priceLabel: 'Ex-Factory',
    powertrain: 'Petrol',
    availabilityStatus: 'Available in Pakistan',
    monthlyEstimate: 148000,
    mileage: 5000,
    transmission: 'CVT Automatic',
    fuelType: 'Petrol',
    bodyType: 'Sedan',
    engineCapacity: '1.8L Dual VVT-i',
    driveType: 'FWD',
    condition: 'Certified Pre-Owned',
    exteriorColor: 'Super White',
    interiorColor: 'Black & Beige',
    location: 'Main Boulevard, Gulberg III, Lahore',
    status: 'Available',
    isFeatured: true,
    isRental: true,
    rentalDailyRate: 11000,
    rentalWeeklyRate: 70000,
    rentalDeposit: 35000,
    rentalCategory: 'Sedan',
    batteryCapacity: '',
    electricRange: '',
    combinedRange: '',
    motorPower: '',
    mainImage: 'https://images.pexels.com/photos/34453317/pexels-photo-34453317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=750&w=1200',
    description: 'Certified vehicle inspected by MOTOR Pakistan technical team.',
  });

  // Calculate KPIs
  const totalVehiclesCount = vehiclesList.length;
  const availableVehiclesCount = vehiclesList.filter((v) => v.status === 'Available').length;
  const nevVehiclesCount = vehiclesList.filter((v) => ['EV', 'Hybrid', 'PHEV', 'REEV'].includes(v.powertrain || '')).length;
  const totalRentalsCount = bookingsList.length;
  const pendingLeadsCount = leadsList.filter((l) => l.status === 'New').length;
  const scheduledTestDrivesCount = testDrivesList.filter((t) => t.status === 'Pending' || t.status === 'Approved').length;
  const estimatedPipelineValue = leadsList.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

  // Handle Add Vehicle
  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      });
      const data = await res.json();
      if (data.vehicle) {
        setVehiclesList([data.vehicle, ...vehiclesList]);
        setShowAddVehicleModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Status Update for Vehicle
  const handleUpdateVehicleStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setVehiclesList(vehiclesList.map((v) => (v.id === id ? { ...v, status: newStatus } : v)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Delete Vehicle
  const handleDeleteVehicle = async (id: number) => {
    if (!confirm('Are you sure you want to remove this vehicle from inventory?')) return;
    try {
      const res = await fetch(`/api/admin/vehicles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVehiclesList(vehiclesList.filter((v) => v.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Booking Status Update
  const handleUpdateBookingStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookingsList(bookingsList.map((b) => (b.id === id ? { ...b, status } : b)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Test Drive Status Update
  const handleUpdateTestDriveStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/admin/test-drives', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setTestDrivesList(testDrivesList.map((t) => (t.id === id ? { ...t, status } : t)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Lead Stage Pipeline Movement
  const handleMoveLeadStage = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeadsList(leadsList.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered vehicles
  const filteredVehicles = vehiclesList.filter((v) => {
    if (vehicleStatusFilter && v.status !== vehicleStatusFilter) return false;
    if (vehiclePowertrainFilter && v.powertrain !== vehiclePowertrainFilter) return false;
    if (vehicleSearch) {
      const q = vehicleSearch.toLowerCase();
      return `${v.make} ${v.model} ${v.year} ${v.location} ${v.powertrain}`.toLowerCase().includes(q);
    }
    return true;
  });

  const crmStages = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Booked', 'Won', 'Lost'];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white text-base tracking-tight">MOTOR Pakistan</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">
                Dealer & CRM Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">Lahore, Islamabad & Karachi Hubs • Technology by WordbitX</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition flex items-center space-x-1.5"
          >
            <span>View Public Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
            HF
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'ads'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4" />
              <span>Seller Ads</span>
            </div>
            {initialAds.filter((a: any) => a.status === 'pending').length > 0 && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                {initialAds.filter((a: any) => a.status === 'pending').length} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'inventory'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Car className="w-4 h-4" />
              <span>Vehicle Inventory</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {totalVehiclesCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'rentals'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <KeyRound className="w-4 h-4" />
              <span>Rental Bookings</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {totalRentalsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'crm'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4" />
              <span>CRM & Leads Pipeline</span>
            </div>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
              {pendingLeadsCount} New
            </span>
          </button>

          <button
            onClick={() => setActiveTab('test-drives')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'test-drives'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CalendarCheck className="w-4 h-4" />
              <span>Test Drive Requests</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {testDrivesList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'offers'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BadgePercent className="w-4 h-4" />
            <span>Promotions & Offers</span>
          </button>

          <div className="pt-6 mt-6 border-t border-slate-800 p-3 bg-slate-900/80 rounded-xl text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center space-x-1.5 text-indigo-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A WordbitX Digital Solution</span>
            </div>
            <p className="text-[10px] leading-relaxed">
              Custom automotive architecture engineered by WordbitX.
            </p>
            <a
              href="https://www.wordbitxtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 font-semibold flex items-center"
            >
              <span>wordbitxtech.com</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Dealership & Fleet Overview (Pakistan)</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Live operational telemetry across Pakistani sales showrooms, EV/Hybrid stock, and rental dispatch hubs.
                </p>
              </div>

              {/* 8 Primary KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Vehicles</span>
                    <Car className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{totalVehiclesCount}</div>
                  <div className="text-[11px] text-emerald-400 flex items-center">
                    <span>{availableVehiclesCount} Available for Sale</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>New Energy (EV/HEV)</span>
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-cyan-300">{nevVehiclesCount}</div>
                  <div className="text-[11px] text-cyan-400">
                    EV, PHEV, REEV & Hybrid
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Rental Bookings</span>
                    <KeyRound className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{totalRentalsCount}</div>
                  <div className="text-[11px] text-indigo-400">
                    Daily & weekly reservations
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Pending CRM Leads</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{pendingLeadsCount}</div>
                  <div className="text-[11px] text-amber-400">
                    Awaiting salesperson follow-up
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Test Drive Requests</span>
                    <CalendarCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{scheduledTestDrivesCount}</div>
                  <div className="text-[11px] text-emerald-400">
                    Scheduled at Gulberg & DHA
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Vehicles Sold</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">1,500+</div>
                  <div className="text-[11px] text-slate-400">Historic sales volume</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Pipeline Value</span>
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{formatPKR(estimatedPipelineValue)}</div>
                  <div className="text-[11px] text-slate-400">Total qualified leads</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Monthly Rental Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">PKR 4.8M</div>
                  <div className="text-[11px] text-emerald-400">+18% vs previous month</div>
                </div>
              </div>

              {/* Recent Activity Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="bg-slate-800/60 rounded-2xl border border-slate-700/80 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-indigo-400" />
                      <span>Recent Rental Bookings</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('rentals')}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookingsList.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/70 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white">{b.bookingReference}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                              {b.status}
                            </span>
                          </div>
                          <p className="text-slate-400 mt-1 font-medium">{b.vehicleName}</p>
                          <p className="text-[11px] text-slate-500">{b.customerName} • {b.customerPhone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{formatPKR(b.totalAmount)}</p>
                          <p className="text-[11px] text-slate-400">{b.rentalDays} Days</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hot Leads */}
                <div className="bg-slate-800/60 rounded-2xl border border-slate-700/80 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>Active Customer Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('crm')}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Open CRM Pipeline
                    </button>
                  </div>

                  <div className="space-y-3">
                    {leadsList.slice(0, 3).map((l) => (
                      <div
                        key={l.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/70 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white">{l.customerName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                              {l.status}
                            </span>
                          </div>
                          <p className="text-indigo-400 mt-0.5">{l.vehicleInterested || l.leadType}</p>
                          <p className="text-[11px] text-slate-400">{l.customerPhone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-slate-400 font-medium">Source: {l.source}</p>
                          <p className="text-[11px] text-slate-500">{l.assignedSalesperson}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SELLER ADS */}
          {activeTab === 'ads' && <AdminListings initial={initialAds as any} />}

          {/* TAB 2: VEHICLE INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Vehicle Inventory Management</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    All showroom / rental vehicles are controlled here — add, edit status, feature or remove. Seller marketplace ads are moderated under Seller Ads.
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add, edit, change status, set pricing, or mark vehicles sold or reserved.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddVehicleModal(true)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vehicle</span>
                </button>
              </div>

              {/* Filters row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search make, model, EV, hybrid..."
                    value={vehicleSearch}
                    onChange={(e) => setVehicleSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <select
                    value={vehiclePowertrainFilter}
                    onChange={(e) => setVehiclePowertrainFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="">All Powertrains</option>
                    <option value="EV">Electric (EV)</option>
                    <option value="REEV">Range Extended (REEV)</option>
                    <option value="PHEV">Plug-in Hybrid (PHEV)</option>
                    <option value="Hybrid">Hybrid (HEV)</option>
                    <option value="Petrol">Petrol</option>
                  </select>

                  <select
                    value={vehicleStatusFilter}
                    onChange={(e) => setVehicleStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Vehicles Table */}
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[11px]">
                        <th className="p-4">Vehicle</th>
                        <th className="p-4">Powertrain</th>
                        <th className="p-4">Price (PKR)</th>
                        <th className="p-4">Availability</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {filteredVehicles.map((car) => (
                        <tr key={car.id} className="hover:bg-slate-700/40 transition">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={car.mainImage}
                                alt=""
                                className="w-12 h-8 rounded-lg object-cover shrink-0"
                              />
                              <div>
                                <p className="font-bold text-white">
                                  {car.year} {car.make} {car.model}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {car.bodyType} • {car.location.split(',')[0]}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              car.powertrain === 'EV' ? 'bg-cyan-500/20 text-cyan-300' :
                              car.powertrain === 'REEV' ? 'bg-emerald-500/20 text-emerald-300' :
                              car.powertrain === 'PHEV' ? 'bg-purple-500/20 text-purple-300' :
                              car.powertrain === 'Hybrid' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {car.powertrain || 'Petrol'}
                            </span>
                          </td>

                          <td className="p-4 font-bold text-white">
                            <div>
                              <span className="text-[9px] text-slate-400 block font-normal">{car.priceLabel || 'Ex-Factory'}</span>
                              {car.price > 0 ? formatPKR(car.price) : 'Price Coming Soon'}
                            </div>
                          </td>

                          <td className="p-4 text-slate-300">
                            {car.availabilityStatus || 'Dealer Stock'}
                          </td>

                          <td className="p-4">
                            <select
                              value={car.status}
                              onChange={(e) => handleUpdateVehicleStatus(car.id, e.target.value)}
                              className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white"
                            >
                              <option value="Available">Available</option>
                              <option value="Reserved">Reserved</option>
                              <option value="Sold">Sold</option>
                              <option value="Rented">Rented</option>
                              <option value="Maintenance">Maintenance</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Link
                                href={`/cars/${car.slug}`}
                                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                                title="View live page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteVehicle(car.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/60 rounded-lg"
                                title="Delete vehicle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RENTALS */}
          {activeTab === 'rentals' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Rental Fleet Dispatch & Bookings</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review incoming rental reservations, approve dispatches, or mark returns.
                </p>
              </div>

              <div className="space-y-4">
                {bookingsList.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-sm">{b.bookingReference}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {b.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-indigo-400">{b.vehicleName}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-300 pt-1">
                        <div>Client: <strong>{b.customerName}</strong> ({b.customerPhone})</div>
                        <div>Duration: <strong>{b.rentalDays} Days</strong> ({b.pickupDate} to {b.returnDate})</div>
                        <div>Pick-up Hub: <strong>{b.pickupLocation}</strong></div>
                        <div>Total Payable: <strong className="text-emerald-400">{formatPKR(b.totalAmount)}</strong></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'Approved')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'Active')}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Handed Over (Active)
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'Completed')}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Returned
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CRM PIPELINE */}
          {activeTab === 'crm' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Customer CRM & Sales Pipeline (Pakistan)</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual stage progression from initial website inquiry to final vehicle sale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 overflow-x-auto pb-6">
                {crmStages.map((stage) => {
                  const stageLeads = leadsList.filter((l) => l.status === stage);

                  return (
                    <div
                      key={stage}
                      className="bg-slate-800/70 rounded-2xl border border-slate-700 p-3 flex flex-col min-w-[210px] space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700 text-xs font-bold text-slate-300">
                        <span>{stage}</span>
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-indigo-400">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                        {stageLeads.map((lead) => (
                          <div
                            key={lead.id}
                            className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 space-y-2 text-xs shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white truncate max-w-[120px]">{lead.customerName}</span>
                              <span className="text-[9px] text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded">
                                {lead.source}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 font-medium truncate">
                              {lead.vehicleInterested || lead.leadType}
                            </p>

                            <p className="text-[10px] text-slate-500 truncate">{lead.customerPhone}</p>

                            {lead.estimatedValue > 0 && (
                              <p className="text-[11px] font-bold text-emerald-400">
                                {formatPKR(lead.estimatedValue)}
                              </p>
                            )}

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                              <span className="text-[9px] text-slate-500">Stage:</span>
                              <select
                                value={lead.status}
                                onChange={(e) => handleMoveLeadStage(lead.id, e.target.value)}
                                className="bg-slate-800 text-white text-[10px] rounded p-1 border border-slate-700"
                              >
                                {crmStages.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: TEST DRIVES */}
          {activeTab === 'test-drives' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Test Drive Scheduling & Dispatch</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Customer test-drive appointments across Lahore showrooms and doorstep requests.
                </p>
              </div>

              <div className="space-y-4">
                {testDrivesList.map((td) => (
                  <div
                    key={td.id}
                    className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-sm">{td.reference}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {td.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-indigo-400">{td.vehicleName}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-300 pt-1">
                        <div>Client: <strong>{td.customerName}</strong> ({td.customerPhone})</div>
                        <div>Date & Time: <strong>{td.preferredDate} at {td.preferredTime}</strong></div>
                        <div>Location: <strong>{td.location}</strong></div>
                        <div>Representative: <strong>{td.salesperson}</strong></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdateTestDriveStatus(td.id, 'Approved')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Approve Appointment
                      </button>
                      <button
                        onClick={() => handleUpdateTestDriveStatus(td.id, 'Completed')}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition"
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Promotional Offers Management</h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Active campaigns displayed on the public platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialOffers.map((o) => (
                  <div key={o.id} className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">
                      {o.badge}
                    </span>
                    <h3 className="text-base font-bold text-white">{o.title}</h3>
                    <p className="text-xs text-emerald-400 font-semibold">{o.discountDetails}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{o.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 text-white my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold">Add Vehicle to Pakistan Inventory</h3>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Make / Brand</label>
                  <select
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Deepal">Deepal (REEV/EV)</option>
                    <option value="MG">MG (Hybrid/PHEV)</option>
                    <option value="AVATR">AVATR</option>
                    <option value="Changan">Changan</option>
                    <option value="OMODA">OMODA</option>
                    <option value="Jaecoo">Jaecoo</option>
                    <option value="KIA">KIA</option>
                    <option value="Hyundai">Hyundai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Model & Variant</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S07 REEV / Fortuner"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Powertrain</label>
                  <select
                    value={newVehicle.powertrain}
                    onChange={(e) => setNewVehicle({ ...newVehicle, powertrain: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="EV">Electric (EV)</option>
                    <option value="REEV">Range Extended (REEV)</option>
                    <option value="PHEV">Plug-in Hybrid (PHEV)</option>
                    <option value="Hybrid">Hybrid (HEV)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Sale Price (PKR)</label>
                  <input
                    type="number"
                    value={newVehicle.price}
                    onChange={(e) => setNewVehicle({ ...newVehicle, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Price Label</label>
                  <select
                    value={newVehicle.priceLabel}
                    onChange={(e) => setNewVehicle({ ...newVehicle, priceLabel: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Ex-Factory">Ex-Factory</option>
                    <option value="Starting From">Starting From</option>
                    <option value="Estimated Price">Estimated Price</option>
                    <option value="Estimated On-Road">Estimated On-Road</option>
                    <option value="Price Coming Soon">Price Coming Soon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Availability Label</label>
                  <select
                    value={newVehicle.availabilityStatus}
                    onChange={(e) => setNewVehicle({ ...newVehicle, availabilityStatus: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Available in Pakistan">Available in Pakistan</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Expected">Expected</option>
                    <option value="Pre-Launch">Pre-Launch</option>
                    <option value="Imported">Imported</option>
                    <option value="Dealer Stock">Dealer Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Battery (if EV/Hybrid)</label>
                  <input
                    type="text"
                    placeholder="e.g. 31.7 kWh"
                    value={newVehicle.batteryCapacity}
                    onChange={(e) => setNewVehicle({ ...newVehicle, batteryCapacity: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Electric Range</label>
                  <input
                    type="text"
                    placeholder="e.g. 200 km (CLTC)"
                    value={newVehicle.electricRange}
                    onChange={(e) => setNewVehicle({ ...newVehicle, electricRange: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <select
                    value={newVehicle.location}
                    onChange={(e) => setNewVehicle({ ...newVehicle, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Main Boulevard, Gulberg III, Lahore">Lahore - Gulberg III</option>
                    <option value="DHA Phase 5 Commercial, Lahore">Lahore - DHA Phase 5</option>
                    <option value="Blue Area & Sector F-7, Islamabad">Islamabad & Twin Cities</option>
                    <option value="Block 4, Clifton & DHA, Karachi">Karachi Port & City</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={newVehicle.mainImage}
                  onChange={(e) => setNewVehicle({ ...newVehicle, mainImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-xl"
                >
                  Save Vehicle to Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
