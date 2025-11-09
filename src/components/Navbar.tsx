'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-light-100 shadow-sm border-b border-light-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={60}
                height={24}
                className="h-6 w-auto filter brightness-0"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/products?gender=men"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Men
              </Link>
              <Link
                href="/products?gender=women"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Women
              </Link>
              <Link
                href="/products?gender=unisex"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Kids
              </Link>
              <Link
                href="/products"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                All Products
              </Link>
              <Link
                href="/collections"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Collections
              </Link>
              <Link
                href="/contact"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side utilities */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-dark-900 hover:text-dark-700 text-body font-jost font-medium transition-colors duration-200">
              Search
            </button>
            <button className="text-dark-900 hover:text-dark-700 text-body font-jost font-medium transition-colors duration-200">
              My Cart
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-900 hover:text-dark-700 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-dark-900/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-light-100 z-50 md:hidden overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link
                href="/products?gender=men"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                href="/products?gender=women"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                href="/products?gender=unisex"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kids
              </Link>
              <Link
                href="/products"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                href="/collections"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-light-300 my-4" />

              <button className="block w-full text-left px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors">
                Search
              </button>
              <button className="block w-full text-left px-3 py-3 text-body font-jost font-medium text-dark-900 hover:bg-light-200 rounded transition-colors">
                My Cart
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
