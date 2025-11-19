'use client';

import React, { useEffect, useState } from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaCheckCircle, FaFileContract, FaSearch } from 'react-icons/fa';
import { FaIndianRupeeSign } from 'react-icons/fa6';

export default function PropertyCheckSection() {
  const phoneNumber = '9560069525';
  const whatsappNumber = '919560069525';

  const questions = [
    {
      text: "What if the builder isn't reliable? Is this a",
      highlight: 'safe investment?',
    },
    {
      text: "How do I know I'm not",
      highlight: 'overpaying',
      suffix: ' for the property?',
    },
    {
      text: 'Are all documents in place and',
      highlight: 'legally correct?',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    }, 3000); // Change question every 3 seconds

    return () => clearInterval(timer);
  }, [questions.length]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hello! I would like to get a free property check for my property investment.'
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const features = [
    {
      icon: FaFileContract,
      title: 'Verify legal papers & title chain',
      description: 'Complete document verification',
    },
    {
      icon: FaSearch,
      title: 'Check for missing documents',
      description: 'Ensure all paperwork is complete',
    },
    {
      icon: FaIndianRupeeSign,
      title: 'Evaluate fair market price',
      description: 'Get accurate property valuation',
    },
    {
      icon: FaCheckCircle,
      title: 'Check if project is bank-approved',
      description: 'Verify lender approval status',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="text-center mb-8 ">
          {/* Main Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight  mb-4 ">
            Get a Full Property Check For Free
          </h2>

          {/* Subheading 1 */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-3">
            Unsure about things like
          </p>

          {/* Key Question - Rotating */}
          <div className="min-h-[80px]  flex items-center justify-center mb-2">
            <div className="relative w-full">
              <p
                key={currentQuestionIndex}
                className="text-lg sm:text-xl md:text-2xl  text-gray-800  text-center px-4 animate-fade-in"
              >
                {questions[currentQuestionIndex].text}{' '}
                <span className=" font-medium ">{questions[currentQuestionIndex].highlight}</span>
                {questions[currentQuestionIndex].suffix && (
                  <span> {questions[currentQuestionIndex].suffix}</span>
                )}
              </p>
            </div>
          </div>

          {/* Subheading 2 */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8  font-medium">
            Avoid regret later. We help you with
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-10 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200"
            >
              <div className="flex flex-col items-center text-center">
                {/* <div className="w-14 h-14 sm:w-16 sm:h-16  bg-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8  text-white" />
                </div> */}
                <h3 className="text-base  font-medium text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-5 lg:gap-6 max-w-2xl mx-auto">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="group w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] hover:from-[var(--primary-blue)] hover:to-[var(--primary-blue-dark)] text-white px-4 md:px-6 py-3 md:py-4  rounded-2xl md:font-medium text-xs md:text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="w-8 h-8  bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-colors duration-300">
              <FaWhatsapp className="w-5 h-5 text-white" />
            </div>
            <span>Chat on WhatsApp</span>
          </button>

          {/* Schedule a Call Button */}
          <button
            onClick={handleCall}
            className="group w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary-blue-dark)] to-[var(--primary-blue)] hover:from-[var(--primary-blue)] hover:to-[var(--primary-blue-dark)] text-white px-4 md:px-6 py-3 md:py-4  rounded-2xl md:font-medium text-xs md:text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <div className="w-8 h-8  bg-white group-hover:bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg transition-colors duration-300">
              <FaPhone className="w-5 h-5  text-[var(--primary-blue-dark)]" />
            </div>
            <span>Book a Free Call</span>
          </button>
        </div>
      </div>
    </section>
  );
}
