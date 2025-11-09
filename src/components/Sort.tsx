'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { parseQueryParams, stringifyQueryParams, updateQueryParam } from '@/lib/utils/query';
import { ChevronDown } from 'lucide-react';

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Price: Low to High', value: 'price_asc' },
] as const;

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current URL params
  const currentParams = parseQueryParams(searchParams.toString());
  const currentSort = (currentParams.sort as string) || 'featured';

  // Find current sort label
  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === currentSort)?.label || 'Featured';

  // Handle sort change
  const handleSortChange = (value: string) => {
    let updatedParams = updateQueryParam(currentParams, 'sort', value === 'featured' ? null : value);

    // Reset page to 1 when sorting changes
    updatedParams = updateQueryParam(updatedParams, 'page', null);

    const queryStr = stringifyQueryParams(updatedParams);
    router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-body-medium border border-light-300
          rounded hover:border-dark-700 transition-colors bg-light-100"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="hidden sm:inline text-dark-700">Sort By:</span>
        <span>{currentSortLabel}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-light-100 border border-light-300 rounded
            shadow-lg z-50"
          role="listbox"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`
                w-full text-left px-4 py-3 text-body transition-colors
                ${
                  currentSort === option.value
                    ? 'bg-light-200 text-dark-900 font-medium'
                    : 'hover:bg-light-200 text-dark-700'
                }
              `}
              role="option"
              aria-selected={currentSort === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
