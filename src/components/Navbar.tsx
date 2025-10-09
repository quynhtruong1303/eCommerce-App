import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/men"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Men
              </Link>
              <Link
                href="/women"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Women
              </Link>
              <Link
                href="/kids"
                className="text-dark-900 hover:text-dark-700 px-3 py-2 text-body font-jost font-medium transition-colors duration-200"
              >
                Kids
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
              className="text-dark-900 hover:text-dark-700 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
