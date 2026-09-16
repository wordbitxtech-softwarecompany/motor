import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Car
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About MOTOR Pakistan',
  description: 'Learn about MOTOR Lahore: Our 150-point vehicle inspection standard, verified title guarantees, rental fleet management and technology partnership with WordbitX.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Drive Better. Go Further.</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Redefining Automotive Trust & Luxury in Lahore
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded to eliminate the pervasive ambiguities of the traditional car market in Pakistan,
              MOTOR blends rigorous mechanical engineering verification with modern digital platforms.
            </p>
          </div>
        </div>

        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Our Heritage</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Culture of Transparency & Uncompromising Quality
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For decades, buying or renting a car in Lahore involved navigating questionable middlemen, unverified meter readings, and stressful paperwork.
              MOTOR was built on a singular conviction: every driver deserves absolute clarity on what they are driving.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              From our flagship gallery in Gulberg III to our fast-growing rental depot in DHA Phase 5,
              every automobile in our possession is personally tested, mechanically certified, and legally vetted by our dedicated legal and technical inspection teams.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Guaranteed Clear Titles</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Meter Tampering Policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Digital Service History</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Punctual Rental Dispatch</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src="https://images.pexels.com/photos/5288746/pexels-photo-5288746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1500"
              alt="MOTOR Showroom Lahore"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 150-Point Standard Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Rigorous Diagnostics</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              The MOTOR 150-Point Certified Inspection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Before any vehicle is offered for sale or rental, it undergoes our intensive diagnostic regime:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Engine & Transmission</h3>
              <p className="leading-relaxed">
                Compression testing, diagnostic error code scan (OBD-II), cylinder balance verification, and cold/warm transmission shift fluidity checks.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Chassis & Body Shell</h3>
              <p className="leading-relaxed">
                Magnetic paint-depth gauge analysis across every body panel to detect concealed filler, structural apron inspection, and alignment geometry testing.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Documentation & Legal</h3>
              <p className="leading-relaxed">
                Direct Punjab Excise file verification, biometric transfer clearance, token tax reconciliation, and original manufacturer invoice authentication.
              </p>
            </div>
          </div>
        </div>

        {/* WordbitX Partnership Section */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Technology by WordbitX
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Digital Infrastructure Built by WordbitX
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              This complete digital automotive system was conceptualized, designed, and engineered by <strong>WordbitX</strong>.
              From high-performance SSR vehicle marketplaces and interactive multi-step rental booking engines to internal dealer CRMs, WordbitX builds software that drives modern automotive commerce.
            </p>
          </div>

          <a
            href="https://www.wordbitxtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-xl flex items-center space-x-2 shrink-0"
          >
            <span>Learn About WordbitX</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
