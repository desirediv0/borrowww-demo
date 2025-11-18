'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Sparkles, Star } from 'lucide-react';

import RotatingSVG from './Globe';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 order-2 lg:order-1">
            <div>
              <p className="font-medium text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 text-[var(--primary-blue)]">
                Fast APPROVAL!
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight tracking-tight">
                Dream Big. Build{' '}
                <span className="italic tiemposfine text-[var(--primary-blue-dark)]">
                  Your Home
                </span>
                <br />
                Your Loan Is Our{' '}
                <span className="italic tiemposfine text-[var(--primary-blue-dark)]">
                  Responsibility
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Quick and hassle-free loan approvals for home loans, personal loans, business loans
              and more — with the best interest rates.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Buttons with Links */}
              <Link href="/calculator/home-loan">
                <button className="text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--primary-blue)] transition-all duration-300 shadow-lg hover:shadow-xl bg-[var(--primary-blue-dark)] whitespace-nowrap">
                  Apply for Home Loan
                </button>
              </Link>

              <Link href="/calculator/balance-transfer">
                <button className="text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--primary-blue)] transition-all duration-300 shadow-lg hover:shadow-xl bg-[var(--primary-blue-dark)] whitespace-nowrap">
                  Balance Transfer
                </button>
              </Link>

              <Link href="/calculator/loan-against-property">
                <button className="text-white px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--primary-blue)] transition-all duration-300 shadow-lg hover:shadow-xl bg-[var(--primary-blue-dark)] whitespace-nowrap">
                  Loan Against Property
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <div className="font-semibold text-gray-900">4.9/5.0</div>
                <div className="text-gray-500">
                  from 10,000+ <span className="underline">customers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative order-1 lg:order-2 lg:mt-0">
            <div className="grid grid-cols-2 gap-0 max-w-md mx-auto lg:max-w-none">
              {/* Top Left Image */}
              <div className="relative aspect-square overflow-hidden rounded-tl-2xl">
                <Image
                  src="/home-1.png"
                  alt="Home Loan"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Loan Amount Card */}
              <div className="p-4 sm:p-6 lg:p-8 aspect-square grid grid-cols-2 bg-[#90d2bf] overflow-hidden rounded-l-full">
                <div className="flex flex-col justify-center">
                  <p className="text-[#2D3E50] text-sm sm:text-lg md:text-xl lg:text-2xl font-medium">
                    Loans
                  </p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-[#2D3E50] mb-2">
                    ₹50L Amount+
                  </h3>
                  <div className="flex justify-end w-full">
                    <RotatingSVG />
                  </div>
                </div>
              </div>

              {/* Processing Time */}
              <div className="p-4 sm:p-6 lg:p-8 aspect-square rounded-tr-full flex flex-col justify-between relative bg-[#3A6EA5] overflow-hidden rounded-bl-2xl">
                <div className="flex items-center justify-center flex-1">
                  <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white animate-breathing" />
                </div>
                <div>
                  <p className="text-white text-sm sm:text-base lg:text-xl mb-1 font-medium">
                    Processing Time
                  </p>
                  <div className="text-lg sm:text-2xl lg:text-3xl font-medium text-white">
                    24 Hours
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="p-4 sm:p-6 lg:p-8 aspect-square flex flex-col justify-between bg-[#2D3E50] text-white rounded-br-2xl">
                <div className="flex items-center gap-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium">
                    7.35%*
                  </h3>
                </div>

                <div className="mt-2 sm:mt-4">
                  <svg className="w-full h-10 sm:h-12 lg:h-16" viewBox="0 0 80 35">
                    <polyline
                      points="0,30 10,25 20,28 30,20 40,22 50,15 60,18 70,12 80,3"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="80" cy="3" r="3" fill="white" />
                  </svg>
                </div>

                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl flex justify-end font-medium">
                  Interest Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
