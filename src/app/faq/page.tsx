import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { HelpCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { enquiryLink } from '@/lib/contact';

export const metadata: Metadata = {
  alternates: { canonical: '/faq' },
  title: 'Frequently Asked Questions | Car Sales & Rental Lahore | MOTOR',
  description: 'Common questions about buying, selling, renting, inspecting, and financing vehicles at MOTOR in Lahore, Pakistan.',
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Buying Certified Pre-Owned Cars',
      items: [
        {
          q: 'What does the MOTOR 150-Point Certified Inspection entail?',
          a: 'Our inspection examines engine compression, electronic transmission shift parameters, suspension components, computerized fault codes (OBD-II), electronic paint thickness across all body panels to identify non-original paint, and complete verification of chassis straightness.'
        },
        {
          q: 'How does the biometric ownership transfer work?',
          a: 'MOTOR coordinates the seller and buyer biometrics directly with the Punjab Excise & Taxation system. We guarantee 100% legal clearance and updated smart card registration under your name without third-party agent delays.'
        },
        {
          q: 'Can I bring an independent inspection team (e.g. PakWheels) to inspect the car?',
          a: 'Yes, absolutely. We actively encourage buyers to conduct their own independent mechanical inspections on our ramp bay in Gulberg III or DHA Phase 5.'
        }
      ]
    },
    {
      category: 'Car Rental & Fleet Policies',
      items: [
        {
          q: 'What is required to rent a vehicle from MOTOR in Lahore?',
          a: 'Pakistani citizens need an original valid CNIC and an original valid Pakistani Driving License. Overseas Pakistanis and international visitors require their Passport with a valid visa and an International Driving Permit or home-country license. A refundable security deposit is also required.'
        },
        {
          q: 'What is your fuel policy?',
          a: 'Vehicles are dispatched with a 100% full fuel tank and must be returned with a full fuel tank. If returned below full, fuel is billed at standard pump rates with zero surcharge.'
        },
        {
          q: 'Are rental cars permitted to travel outside Lahore on the motorway?',
          a: 'Yes! All vehicles are equipped with active M-Tag toll transponders and are approved for inter-city travel across Punjab, Islamabad/Rawalpindi, Khyber Pakhtunkhwa, and northern routes.'
        }
      ]
    },
    {
      category: 'Selling Your Car & Trade-Ins',
      items: [
        {
          q: 'How quickly can MOTOR purchase my car for cash?',
          a: 'Once our evaluator inspects your vehicle at our showroom or your residence in Lahore, and legal title documents are verified, payment is transferred immediately via secure banking wire transfer on the same day.'
        },
        {
          q: 'Can I trade in an older vehicle against a newer certified SUV?',
          a: 'Yes. Our trade-in exchange program evaluates your current vehicle and credits the agreed valuation directly towards the purchase price of your next certified car.'
        }
      ]
    },
    {
      category: 'Bank Financing & Islamic Car Ijarah',
      items: [
        {
          q: 'Which banks does MOTOR partner with?',
          a: 'We work closely with leading Islamic institutions (Meezan Bank Car Ijarah, BankIslami, Standard Chartered Saadiq) as well as commercial banks (Bank Alfalah, HBL, MCB). We assist with file processing and fast-track underwriting.'
        },
        {
          q: 'What is the minimum down payment required?',
          a: 'Under State Bank of Pakistan consumer financing regulations, the minimum down payment typically ranges from 15% to 30%, depending on whether the vehicle is assembled locally or imported.'
        }
      ]
    }
  ];

  const flatFaqs = faqCategories.flatMap((c) => c.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": flatFaqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <SchemaJsonLd schema={faqSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Knowledge Base & Clarifications</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Find transparent answers regarding our 150-point diagnostic tests, rental contracts, legal biometric title transfers, and banking partnerships.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {faqCategories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>{cat.category}</span>
              </h2>

              <div className="space-y-5">
                {cat.items.map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.q}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 bg-slate-900 text-white rounded-3xl text-center space-y-4">
          <h3 className="text-xl font-bold">Have a question not listed here?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our automotive advisors in Gulberg and DHA are available 7 days a week to answer your specific queries.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
            >
              Contact Support
            </Link>
            <a
              href={enquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
