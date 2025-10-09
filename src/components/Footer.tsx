import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = 2024;

  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={60}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <p className="text-body font-jost text-dark-500 max-w-md">
              Just Do It. Discover the latest Nike products with cutting-edge
              technology and timeless style.
            </p>
          </div>

          {/* Featured Column */}
          <div>
            <h4 className="text-body font-jost font-bold text-light-100 mb-4">
              Featured
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/air-force-1"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Air Force 1
                </Link>
              </li>
              <li>
                <Link
                  href="/huarache"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Huarache
                </Link>
              </li>
              <li>
                <Link
                  href="/air-max-90"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Air Max 90
                </Link>
              </li>
              <li>
                <Link
                  href="/air-max-95"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Air Max 95
                </Link>
              </li>
            </ul>
          </div>

          {/* Shoes Column */}
          <div>
            <h4 className="text-body font-jost font-bold text-light-100 mb-4">
              Shoes
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/all-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  All Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Custom Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/jordan-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Jordan Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/running-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Running Shoes
                </Link>
              </li>
            </ul>
          </div>

          {/* Clothing Column */}
          <div>
            <h4 className="text-body font-jost font-bold text-light-100 mb-4">
              Clothing
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/all-clothing"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  All Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/modest-wear"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Modest Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/hoodies-pullovers"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Hoodies & Pullovers
                </Link>
              </li>
              <li>
                <Link
                  href="/shirts-tops"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Shirts & Tops
                </Link>
              </li>
            </ul>
          </div>

          {/* Kids Column */}
          <div>
            <h4 className="text-body font-jost font-bold text-light-100 mb-4">
              Kids'
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/infant-toddler-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Infant & Toddler Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Kids' Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids-jordan-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Kids' Jordan Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/kids-basketball-shoes"
                  className="text-body font-jost text-dark-500 hover:text-light-100 transition-colors duration-200"
                >
                  Kids' Basketball Shoes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a
                href="https://twitter.com/nike"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-light-100 rounded-full flex items-center justify-center hover:bg-light-200 transition-colors duration-200"
                aria-label="Follow Nike on Twitter"
              >
                <Image
                  src="/x.svg"
                  alt="Twitter"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </a>
              <a
                href="https://facebook.com/nike"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-light-100 rounded-full flex items-center justify-center hover:bg-light-200 transition-colors duration-200"
                aria-label="Follow Nike on Facebook"
              >
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </a>
              <a
                href="https://instagram.com/nike"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-light-100 rounded-full flex items-center justify-center hover:bg-light-200 transition-colors duration-200"
                aria-label="Follow Nike on Instagram"
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-caption font-jost text-dark-500">
              © {currentYear} Nike Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
