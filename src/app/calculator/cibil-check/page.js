'use client';

import { useRef, useState } from 'react';
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaLock,
  FaShieldAlt,
  FaUser,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CIBILCheck() {
  const [FormData, setFormData] = useState({
    firstName: '',
    mobileNumber: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionUrl, setSessionUrl] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const resultsRef = useRef(null);

  // Simple Validation: Only required fields
  const validateBureauForm = () => {
    const newErrors = {};
    if (!FormData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!FormData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    if (!FormData.consent) newErrors.consent = 'You must agree to the terms';
    if (FormData.mobileNumber && !/^\d{10}$/.test(FormData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // --- ON SUBMIT: SECURE CIBIL CHECK ---
  const handleBureauSubmit = async (e) => {
    e.preventDefault();
    console.log('on Submit', FormData);
    if (!validateBureauForm()) return;
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return { category: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 650) return { category: 'Good', color: 'text-[#2D3E50]', bg: 'bg-blue-100' };
    if (score >= 550) return { category: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { category: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getScoreDescription = (score) => {
    if (score >= 750)
      return 'Excellent credit score! You are likely to get the best loan terms and lowest interest rates.';
    if (score >= 650)
      return 'Good credit score. You should be able to get loans with competitive rates.';
    if (score >= 550) return 'Fair credit score. You may get loans but with higher interest rates.';
    return 'Poor credit score. You may face difficulties in getting loans. Consider improving your credit score.';
  };

  const factors = [
    {
      factor: 'Payment History',
      impact: '35%',
      description: 'Timely payment of EMIs and credit card bills',
      icon: FaCheckCircle,
    },
    {
      factor: 'Credit Utilization',
      impact: '30%',
      description: 'How much of your available credit you use',
      icon: FaChartLine,
    },
    {
      factor: 'Credit History Length',
      impact: '15%',
      description: 'How long you have been using credit',
      icon: FaCalendarAlt,
    },
    {
      factor: 'Credit Mix',
      impact: '10%',
      description: 'Types of credit accounts you have',
      icon: FaShieldAlt,
    },
    {
      factor: 'New Credit',
      impact: '10%',
      description: 'Recent credit inquiries and new accounts',
      icon: FaUser,
    },
  ];

  const tips = [
    'Pay all your bills on time, every time',
    'Keep your credit utilization below 30%',
    "Don't close old credit accounts",
    'Limit new credit applications',
    'Monitor your credit report regularly',
    'Dispute any errors in your credit report',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Free CIBIL Check
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Check Your{' '}
              <span className="text-[var(--primary-blue)] italic tiemposfine">CIBIL Score</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get your free CIBIL score instantly. No hidden charges, no credit card required. Check
              your credit health and improve your loan eligibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid  gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaLock className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Secure CIBIL Check</h2>
                  <p className="text-gray-600 text-sm">
                    Your data is protected with bank-level security
                  </p>
                </div>
              </div>

              <form onSubmit={handleBureauSubmit} className="space-y-6">
                {/* Simplified Form - Only Essential Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter Your Full Name"
                      value={FormData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`rounded-md border border-gray-600 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm font-medium">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter Your 10-digit Mobile Number"
                      value={FormData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className={`rounded-md border border-gray-600 transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 ${errors.mobileNumber ? 'border-red-500' : ''}`}
                      type="tel"
                      maxLength="10"
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-xs">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="consent"
                      checked={FormData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked)}
                      className={`rounded-md border border-gray-600  transition-all duration-200 bg-gray-50 focus:bg-white text-black placeholder:text-gray-500 ${errors.consent ? 'border-red-500' : ''}`}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        I agree, all information mentioned above is true and I authorize Borrowww to
                        fetch my data.
                      </Label>
                      {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 py-3 bg-[var(--primary-blue)]  hover:bg-[var(--primary-blue)]  text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl"
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                  <h3 className="text-2xl font-bold mb-4">Processing Your CIBIL Report</h3>
                  <p className="text-white/90 mb-4">
                    Please complete the verification process in the new tab that opened. Your report
                    will appear here automatically once verified.
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm">
                      <FaLock className="inline mr-2" />
                      Your data is secured with bank-level encryption
                    </p>
                  </div>
                  {sessionUrl && (
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => window.open(sessionUrl, '_blank')}
                        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Reopen Verification Tab
                      </button>
                      {/* {sessionUrl.includes('mock-session') && (
                        <p className="text-xs text-yellow-300">
                          ⚠️ Development Mode: Mock session for testing purposes
                        </p>
                      )} */}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {showResults && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* CIBIL Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold">Your CIBIL Score</h3>
                    {fromCache && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        <FaShieldAlt className="inline mr-1" />
                        Cached Result (28-day validity)
                      </div>
                    )}
                  </div>
                  <div className="text-6xl font-bold mb-4">{cibilScore}</div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${getScoreCategory(cibilScore).bg} ${getScoreCategory(cibilScore).color}`}
                  >
                    {getScoreCategory(cibilScore).category}
                  </div>
                  <p className="text-white/90 mb-6">{getScoreDescription(cibilScore)}</p>

                  <div className="flex flex-wrap gap-3">
                    {pdfUrl && (
                      <button
                        onClick={() => window.open(pdfUrl, '_blank')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download PDF Report
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setFromCache(false);
                        setCibilScore(null);
                        setPdfUrl(null);
                        setFormData({ firstName: '', mobileNumber: '', consent: false });
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold transition-colors backdrop-blur-sm"
                    >
                      Check Fresh CIBIL
                    </button>
                    {fromCache && (
                      <span className="text-white/70 text-sm py-2 px-3">
                        💡 Fresh check will use API credits
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Info Section - only show if no results yet */}
            {!showResults && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* CIBIL Score Display */}
                {/* Features */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Why Check CIBIL Score?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Free & Instant</h4>
                        <p className="text-gray-600 text-sm">
                          Get your score instantly without any charges
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                        <p className="text-gray-600 text-sm">
                          Bank-level encryption protects your data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Improve Score</h4>
                        <p className="text-gray-600 text-sm">
                          Get tips to improve your credit score
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Affects Your CIBIL Score?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the factors that influence your credit score helps you make better
              financial decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[var(--primary-blue)]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                      <factor.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                      <span className="text-[var(--primary-blue)] font-bold text-lg">
                        {factor.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tips to Improve Your CIBIL Score
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to boost your credit score and improve your loan eligibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-3xl border border-[var(--primary-blue)]/10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{tip}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Improve Your Credit Score?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized advice and loan offers based on your credit score. Our experts will
              help you find the best deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
              >
                View Loan Offers
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
