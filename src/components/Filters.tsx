'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  parseQueryParams,
  stringifyQueryParams,
  toggleQueryArrayParam,
  clearFilters,
  getActiveFilters,
  countActiveFilters,
} from '@/lib/utils/query';
import { FILTER_OPTIONS } from '@/lib/data/products';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Filters({ isOpen = false, onClose = () => {} }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current URL params
  const currentParams = parseQueryParams(searchParams.toString());
  const activeFilters = getActiveFilters(currentParams);
  const filterCount = countActiveFilters(currentParams);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    gender: true,
    category: true,
    size: true,
    color: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle filter toggle
  const handleFilterToggle = (filterType: string, value: string) => {
    const updatedParams = toggleQueryArrayParam(currentParams, filterType, value);
    const queryStr = stringifyQueryParams(updatedParams);
    router.push(`${pathname}?${queryStr}`, { scroll: false });
  };

  // Check if a filter is active
  const isFilterActive = (filterType: string, value: string): boolean => {
    const filterValues = activeFilters[filterType as keyof typeof activeFilters];
    return filterValues ? filterValues.includes(value) : false;
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedParams = clearFilters(currentParams);
    const queryStr = stringifyQueryParams(clearedParams);
    router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-900/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Filters sidebar/drawer */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 lg:w-64
          bg-light-100
          z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
          border-r border-light-300
        `}
      >
        <div className="p-6 lg:p-4">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-heading-3">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-200 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-heading-3">Filters</h2>
            {filterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-caption text-dark-700 hover:text-dark-900 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Active filters count */}
          {filterCount > 0 && (
            <div className="mb-4 pb-4 border-b border-light-300">
              <p className="text-caption text-dark-700">
                {filterCount} filter{filterCount !== 1 ? 's' : ''} applied
              </p>
            </div>
          )}

          {/* Filter sections */}
          <div className="space-y-6">
            {/* Gender filter */}
            <FilterSection
              title="Gender"
              isExpanded={expandedSections.gender}
              onToggle={() => toggleSection('gender')}
            >
              <div className="space-y-3">
                {FILTER_OPTIONS.genders.map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isFilterActive('gender', gender.toLowerCase())}
                      onChange={() => handleFilterToggle('gender', gender.toLowerCase())}
                      className="w-5 h-5 rounded border-2 border-dark-700 text-dark-900
                        focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-body group-hover:text-dark-900 transition-colors">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Category filter */}
            <FilterSection
              title="Category"
              isExpanded={expandedSections.category}
              onToggle={() => toggleSection('category')}
            >
              <div className="space-y-3">
                {FILTER_OPTIONS.categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isFilterActive('category', category.toLowerCase())}
                      onChange={() => handleFilterToggle('category', category.toLowerCase())}
                      className="w-5 h-5 rounded border-2 border-dark-700 text-dark-900
                        focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-body group-hover:text-dark-900 transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Size filter */}
            <FilterSection
              title="Size"
              isExpanded={expandedSections.size}
              onToggle={() => toggleSection('size')}
            >
              <div className="grid grid-cols-3 gap-2">
                {FILTER_OPTIONS.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFilterToggle('size', size.toLowerCase())}
                    className={`
                      py-2 px-3 text-body border-2 rounded transition-all
                      ${
                        isFilterActive('size', size.toLowerCase())
                          ? 'border-dark-900 bg-dark-900 text-light-100'
                          : 'border-light-300 hover:border-dark-700'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Color filter */}
            <FilterSection
              title="Color"
              isExpanded={expandedSections.color}
              onToggle={() => toggleSection('color')}
            >
              <div className="grid grid-cols-5 gap-3">
                {FILTER_OPTIONS.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleFilterToggle('color', color.name.toLowerCase())}
                    className={`
                      w-10 h-10 rounded-full border-2 transition-all
                      ${
                        isFilterActive('color', color.name.toLowerCase())
                          ? 'border-dark-900 ring-2 ring-dark-900 ring-offset-2'
                          : 'border-light-300 hover:border-dark-700'
                      }
                    `}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Price range filter */}
            <FilterSection
              title="Shop By Price"
              isExpanded={expandedSections.price}
              onToggle={() => toggleSection('price')}
            >
              <div className="space-y-3">
                {FILTER_OPTIONS.priceRanges.map((range) => {
                  const rangeKey = `${range.min}-${range.max}`;
                  return (
                    <label
                      key={rangeKey}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterActive('priceRange', rangeKey)}
                        onChange={() => handleFilterToggle('priceRange', rangeKey)}
                        className="w-5 h-5 rounded border-2 border-dark-700 text-dark-900
                          focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 cursor-pointer"
                      />
                      <span className="ml-3 text-body group-hover:text-dark-900 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </FilterSection>
          </div>

          {/* Mobile clear filters button */}
          {filterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="w-full mt-8 py-3 bg-dark-900 text-light-100 rounded-full
                hover:bg-dark-700 transition-colors lg:hidden"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

// Filter section component
interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isExpanded, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-light-300 pb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-4 text-body-medium hover:text-dark-900 transition-colors"
        aria-expanded={isExpanded}
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}
