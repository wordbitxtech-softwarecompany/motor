'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  Check,
  X,
  Gauge,
  Fuel,
  GitFork,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';

export default function CompareView({ allVehicles, initialSlug = '' }: { allVehicles: any[]; initialSlug?: string }) {
  // Preselect two default vehicles (and the one requested from a card Compare button)
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const base = [allVehicles[0]?.id || 1, allVehicles[1]?.id || 2];
    if (initialSlug) {
      const match = allVehicles.find((v) => v.slug === initialSlug);
      if (match) base[0] = match.id;
    }
    return base;
  });

  const selectedCars = selectedIds
    .map((id) => allVehicles.find((v) => v.id === id))
    .filter(Boolean);

  const addVehicleSlot = (id: number) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeVehicleSlot = (id: number) => {
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const changeVehicleSlot = (index: number, newId: number) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const remainingVehicles = allVehicles.filter((v) => !selectedIds.includes(v.id));

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Side-by-Side Comparison
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Compare Vehicles & Specifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate price, engine capacity, fuel economy, transmission, and features across up to 3 vehicles simultaneously.
          </p>
        </div>

        {selectedIds.length < 3 && remainingVehicles.length > 0 && (
          <div className="flex items-center space-x-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addVehicleSlot(Number(e.target.value));
                  e.target.value = '';
                }
              }}
              className="text-xs p-2.5 bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 rounded-xl"
              defaultValue=""
            >
              <option value="" disabled>+ Add Another Car</option>
              {remainingVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">
                  Specification
                </th>
                {selectedCars.map((car, index) => (
                  <th key={car.id} className="p-6 w-1/4 align-top">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <select
                          value={car.id}
                          onChange={(e) => changeVehicleSlot(index, Number(e.target.value))}
                          className="text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg p-1 max-w-[200px]"
                        >
                          {allVehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.year} {v.make} {v.model}
                            </option>
                          ))}
                        </select>
                        {selectedIds.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVehicleSlot(car.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={car.mainImage}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {car.year} {car.make} {car.model}
                        </h3>
                        <p className="text-base font-black text-indigo-600 mt-1">
                          {formatPKR(car.price)}
                        </p>
                      </div>

                      <Link
                        href={`/cars/${car.slug}`}
                        className="block text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Category: General */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td colSpan={selectedCars.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-indigo-600">
                  Overview & Market Value
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Price (PKR)</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 font-bold text-slate-900">
                    {formatPKR(car.price)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Est. Monthly Installment</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-indigo-600 font-semibold">
                    {car.monthlyEstimate ? `${formatPKR(car.monthlyEstimate)} / mo` : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Daily Rental Option</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-700">
                    {car.rentalDailyRate ? `${formatPKR(car.rentalDailyRate)} / day` : 'Sale Only'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Model Year</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800 font-semibold">{car.year}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Odometer Mileage</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{formatNumber(car.mileage)} km</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Condition Status</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-emerald-700 font-semibold">{car.condition}</td>
                ))}
              </tr>

              {/* Category: Performance */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td colSpan={selectedCars.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-indigo-600">
                  Engine & Powertrain
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Engine Details</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800 font-medium">{car.engineCapacity}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Transmission</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.transmission}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Fuel Type</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.fuelType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Drivetrain</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.driveType}</td>
                ))}
              </tr>

              {/* Category: Body & Interior */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td colSpan={selectedCars.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-indigo-600">
                  Dimensions & Interior
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Body Type</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.bodyType}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Passenger Capacity</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.seats} Seats</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Exterior Color</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-800">{car.exteriorColor}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Location</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4 text-slate-600 truncate max-w-[180px]">{car.location}</td>
                ))}
              </tr>

              {/* Category: Key Features */}
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td colSpan={selectedCars.length + 1} className="p-3 text-[11px] uppercase tracking-wider text-indigo-600">
                  Top Equipment Highlights
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-500">Key Features</td>
                {selectedCars.map((car) => (
                  <td key={car.id} className="p-4">
                    <ul className="space-y-1">
                      {car.features && car.features.slice(0, 5).map((f: string, i: number) => (
                        <li key={i} className="flex items-center space-x-1.5 text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
