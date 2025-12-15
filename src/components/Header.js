'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { gif } from '@/assets';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatorItems = [
    { name: 'Home Loan', href: '/calculator/home-loan' },
    { name: 'Loan Against Property', href: '/calculator/loan-against-property' },
    { name: 'EMI Calculator', href: '/calculator/emi' },
    { name: 'Balance Transfer', href: '/calculator/balance-transfer' },
    { name: 'Loan Comparison', href: '/calculator/comparison' },
  ];

  const navItems = [
    { name: 'Home Loan', href: '/calculator/home-loan' },
    { name: 'Loan Against Property', href: '/calculator/loan-against-property' },
    { name: 'EMI Calculator', href: '/calculator/emi' },
    { name: 'Balance Transfer', href: '/calculator/balance-transfer' },
  ];

  return (
    <>
      {/* Top Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[var(--primary-blue-dark)] text-white py-3 px-4 text-center text-sm relative"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-pink-300">⚡</span>
          <span>Free Credit Score Check • Instant Loan Approval</span>
          <span className="text-pink-300">›</span>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
          }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image src={'/newlogo.png'} alt="Borrowww" width={150} height={80} />
              </motion.div>
            </Link>

            <Link href="/calculator/credit-check" className="md:hidden flex">
              <Image src={gif} alt="Borrowww" width={100} height={100} />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Other Navigation Items */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium block"
                  >
                    <motion.span whileHover={{ y: -2 }} className="block">
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth/Profile Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/calculator/credit-check">
                <Image src={gif} alt="Borrowww" width={120} height={100} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Calculator Section */}
                <div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Calculators
                  </div>
                  <div className="space-y-2">
                    {calculatorItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Navigation Items */}
                <div className="border-t pt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 hover:text-gray-900 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
