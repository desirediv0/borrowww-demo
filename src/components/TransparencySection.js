'use client';

import React, { useEffect, useState } from 'react';
import { FaBell, FaCheckCircle, FaEnvelope, FaFileAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function TransparencySection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Connect with us, anytime',
      description:
        'Call, chat, or raise a concern - your advisor is always just a tap away. We respond in real time.',
      phoneContent: {
        header: 'Contact Details',
        advisor: {
          name: 'Kamlesh Yadav',
          role: 'Senior Loan Advisor',
          phone: '8578493929',
          email: 'kamlesh.yadav@premierpenny.com',
        },
        chat: [
          {
            sender: 'advisor',
            message:
              'Welcome to Premier Penny! I am your Senior Loan Advisor. How can I help you today?',
          },
          { sender: 'user', message: 'When will my online discussion with the banker happen' },
          {
            sender: 'advisor',
            message: 'Your online discussion has been scheduled for 26th July at 1:00 PM.',
          },
        ],
        icons: [
          { icon: FaFileAlt, color: 'bg-orange-100', iconColor: 'text-orange-600' },
          { icon: FaWhatsapp, color: 'bg-green-100', iconColor: 'text-green-600' },
          { icon: FaPhone, color: 'bg-blue-100', iconColor: 'text-blue-600' },
          { icon: FaEnvelope, color: 'bg-purple-100', iconColor: 'text-purple-600' },
        ],
      },
    },
    {
      id: 2,
      title: 'Get free post-loan support',
      description:
        "Get EMI reminders, track every tranche & unlock savings when rates drop - we won't disappear.",
      phoneContent: {
        header: 'Premier Penny Help Center',
        chat: [
          {
            sender: 'advisor',
            message:
              "Hi Gautam,\n\nHope you are doing well.\n\nYour next EMI due date is 26th Dec, 2025.\n\nVisit the bank's website to make an online payment or reach out to us if you got any questions!\n\nWe'll always keep you updated on all your loan details!\n\nPremier Penny's team is always here to support you!",
          },
        ],
        buttons: [
          { text: 'Visit Website', style: 'border-orange-500 text-orange-600 bg-white' },
          { text: 'Check Loan Details', style: 'bg-[var(--primary-blue-dark)] text-white' },
        ],
      },
    },
    {
      id: 3,
      title: 'Stay instantly notified',
      description:
        'Get real-time WhatsApp & SMS alerts for every update. No spam - just to the point information.',
      phoneContent: {
        notifications: [
          {
            icon: FaWhatsapp,
            iconBg: 'bg-green-500',
            title: 'Reminder! Share your docs',
            message: 'Upload your remaining documents to complete your application',
            time: 'Now',
          },
          {
            icon: FaCheckCircle,
            iconBg: 'bg-purple-500',
            title: 'Just 2 days away from your dream home!',
            message: 'Your loan approval is almost complete',
            time: 'Now',
          },
        ],
      },
    },
    {
      id: 4,
      title: 'Track your loan in real-time',
      description:
        'No constant chasing. See exactly where your application stands - anytime, from your phone.',
      phoneContent: {
        header: 'Premier Penny',
        status: 'Your Loan Application is getting Prepared!',
        loanCard: {
          number: '7094 - Home Loan',
          bank: 'HDFC Bank',
          status: 'Logged In',
          requestedOn: '30 June, 1:20 PM',
          amount: '₹90 Lacs',
        },
        progress: {
          title: 'Basic Loan Details Gathering Completed',
          date: '16 June, 2:30 PM',
          status: 'In initial review by Premier Penny',
        },
        offer: 'Premier Penny Special Offer: Login Fee Waived-Off',
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
            100% transparency with <span className="text-orange-500">24x7 availability</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            We keep you updated - so your dream home never feels out of reach
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-full overflow-hidden">
          {/* Carousel Slides */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2 lg:order-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                          {slide.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {slide.description}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--primary-blue-dark)] text-[var(--primary-blue-dark)] px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg">
                          <FaPhone className="w-4 h-4 text-pink-500" />
                          <span>Contact advisor</span>
                        </button>
                        <button className="bg-[var(--primary-blue-dark)] text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-[var(--primary-blue)] transition-all duration-300 shadow-md hover:shadow-lg">
                          <span>Track application</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className="flex items-center justify-center order-1 lg:order-2">
                      <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[300px] mx-auto">
                        {/* Phone Frame */}
                        <div className="bg-black rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl">
                          {/* Phone Screen */}
                          <div className="bg-white rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden">
                            {/* Status Bar */}
                            <div className="bg-gray-800 text-white text-xs px-3 py-1.5 flex justify-between items-center">
                              <span>9:41</span>
                              <div className="flex gap-1">
                                <div className="w-3 h-1.5 border border-white rounded-sm"></div>
                                <div className="w-5 h-2.5 border-2 border-white rounded-sm"></div>
                              </div>
                            </div>

                            {/* Phone Content */}
                            <div className="h-[400px] sm:h-[450px] lg:h-[500px] overflow-y-auto bg-gray-50">
                              {slide.id === 1 && slide.phoneContent && (
                                <div className="p-4 space-y-4 bg-white">
                                  {/* Header */}
                                  <div className="flex items-center gap-3 mb-4">
                                    <FaArrowLeft className="w-5 h-5 text-gray-700" />
                                    <h4 className="font-semibold text-base text-gray-900">
                                      Contact Details
                                    </h4>
                                  </div>

                                  {/* Advisor Card */}
                                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4 mb-4">
                                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-blue-600">KY</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h5 className="font-bold text-base text-gray-900 mb-1">
                                          {slide.phoneContent.advisor.name}
                                        </h5>
                                        <p className="text-sm text-gray-600 mb-1">
                                          {slide.phoneContent.advisor.role}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {slide.phoneContent.advisor.phone} |{' '}
                                          {slide.phoneContent.advisor.email}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Contact Icons */}
                                    <div className="flex gap-3">
                                      {slide.phoneContent.icons.map((item, idx) => (
                                        <div
                                          key={idx}
                                          className={`${item.color} p-3 rounded-full cursor-pointer hover:scale-110 transition-transform`}
                                        >
                                          <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Chat Messages */}
                                  <div className="space-y-3">
                                    {slide.phoneContent.chat.map((msg, idx) => (
                                      <div
                                        key={idx}
                                        className={`p-3 rounded-2xl ${
                                          msg.sender === 'advisor'
                                            ? 'bg-white border border-gray-200'
                                            : 'bg-[var(--primary-blue-dark)] text-white ml-auto max-w-[85%]'
                                        }`}
                                      >
                                        <p className="text-sm leading-relaxed">{msg.message}</p>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Input Field */}
                                  <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center justify-between mt-4">
                                    <span className="text-sm text-gray-500">Type Something</span>
                                    <div className="w-7 h-7 bg-[var(--primary-blue-dark)] rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">→</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {slide.id === 2 && slide.phoneContent && (
                                <div className="p-4 h-full flex flex-col bg-white">
                                  {/* Header */}
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-blue-600 text-sm font-bold">PP</span>
                                    </div>
                                    <h4 className="font-semibold text-base text-gray-900">
                                      Premier Penny Help Center
                                    </h4>
                                  </div>

                                  {/* Message Card */}
                                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4 flex-1 flex flex-col justify-center">
                                    <div className="space-y-2">
                                      <p className="text-base text-gray-800 font-medium">
                                        Hi Gautam,
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        Hope you are doing well.
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        Your next{' '}
                                        <span className="font-semibold text-orange-600">
                                          EMI due date is 26th Dec, 2025
                                        </span>
                                        .
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        Visit the bank's website to make an online payment or reach
                                        out to us if you got any questions!
                                      </p>
                                      <p className="text-sm text-gray-700 font-medium">
                                        We'll always keep you updated on all your loan details!
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-blue-600">
                                          Premier Penny's
                                        </span>{' '}
                                        team is always here to support you!
                                      </p>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex gap-2">
                                    {slide.phoneContent.buttons.map((btn, idx) => (
                                      <button
                                        key={idx}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${btn.style}`}
                                      >
                                        {btn.text}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {slide.id === 3 && slide.phoneContent && (
                                <div className="bg-gradient-to-b from-indigo-700 via-purple-600 to-pink-500 min-h-full flex flex-col items-center justify-center relative overflow-hidden">
                                  {/* Lock Icon at Top */}
                                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                      <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Time Display */}
                                  <div className="text-white text-center mt-20 mb-6">
                                    <div className="text-6xl font-bold mb-2 drop-shadow-lg">
                                      10:00
                                    </div>
                                    <div className="text-sm opacity-90">Friday 18 June</div>
                                  </div>

                                  {/* Notifications */}
                                  <div className="space-y-3 w-full px-4 pb-6">
                                    {slide.phoneContent.notifications.map((notif, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-white rounded-xl p-3 shadow-xl flex items-start gap-3"
                                      >
                                        <div
                                          className={`${notif.iconBg} p-2.5 rounded-full flex-shrink-0`}
                                        >
                                          <notif.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-bold text-sm text-gray-900 mb-1">
                                            {notif.title}
                                          </h5>
                                          <p className="text-xs text-gray-600 leading-relaxed">
                                            {notif.message}
                                          </p>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-400 flex-shrink-0 mt-1">
                                          {notif.time}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {slide.id === 4 && slide.phoneContent && (
                                <div className="p-4 space-y-4 h-full overflow-y-auto bg-gray-50">
                                  {/* Header */}
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 flex flex-col justify-center gap-1">
                                        <div className="w-4 h-0.5 bg-gray-600"></div>
                                        <div className="w-4 h-0.5 bg-gray-600"></div>
                                        <div className="w-4 h-0.5 bg-gray-600"></div>
                                      </div>
                                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">PP</span>
                                      </div>
                                      <span className="text-base font-bold text-gray-900">
                                        Premier Penny
                                      </span>
                                    </div>
                                    <button className="text-sm text-white font-semibold flex items-center gap-1 bg-green-500 px-3 py-1.5 rounded-lg">
                                      <FaPhone className="w-4 h-4" />
                                      <span>Help</span>
                                    </button>
                                  </div>

                                  {/* Status Heading */}
                                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                                    {slide.phoneContent.status}
                                  </h4>

                                  {/* Loan Card */}
                                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h5 className="font-bold text-base text-gray-900 mb-1">
                                          {slide.phoneContent.loanCard.number}
                                        </h5>
                                        <div className="flex items-center gap-2">
                                          <p className="text-sm text-gray-600">
                                            {slide.phoneContent.loanCard.bank}
                                          </p>
                                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        </div>
                                      </div>
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                        {slide.phoneContent.loanCard.status}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">
                                      Requested On: {slide.phoneContent.loanCard.requestedOn}
                                    </p>
                                    <p className="text-xl font-bold text-gray-900">
                                      {slide.phoneContent.loanCard.amount}
                                    </p>
                                  </div>

                                  {/* Progress Card */}
                                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                                    <div className="flex items-start gap-2 mb-2">
                                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                      <div className="flex-1">
                                        <h5 className="font-bold text-sm text-gray-900 mb-1">
                                          {slide.phoneContent.progress.title}
                                        </h5>
                                        <div className="flex items-center gap-2 mb-1">
                                          <p className="text-xs text-gray-600">
                                            {slide.phoneContent.progress.date}
                                          </p>
                                          <svg
                                            className="w-3 h-3 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <p className="text-sm text-gray-700">
                                          {slide.phoneContent.progress.status}
                                        </p>
                                      </div>
                                    </div>
                                    <button className="mt-2 text-sm text-blue-600 font-semibold border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                                      View Details
                                    </button>
                                  </div>

                                  {/* Offer Banner */}
                                  <div className="bg-orange-500 text-white rounded-xl p-3 text-center">
                                    <p className="text-sm font-semibold">
                                      {slide.phoneContent.offer}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 z-10 hidden sm:flex items-center justify-center"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-300 z-10 hidden sm:flex items-center justify-center"
            aria-label="Next slide"
          >
            <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-[var(--primary-blue-dark)] w-6 sm:w-8'
                  : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
