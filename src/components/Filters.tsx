'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { parseQueryParams, toggleQueryArrayParam, stringifyQueryParams, clearFilters } from '@/lib/utils/query';
import { FILTER_OPTIONS } from '@/lib/data/products';
import { SlidersHorizontal } from 'lucide-react';

type GroupKey = 'gender' | 'category' | 'size' | 'color' | 'priceRange';

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = useMemo(() => `?${searchParams.toString()}`, [searchParams]);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<GroupKey, boolean>>({
    gender: true,
    category: true,
    size: true,
    color: true,
    priceRange: true,
  });

  // Get active filter values
  const getActiveValues = (key: string): string[] => {
    const params = parseQueryParams(search);
    const value = params[key];
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.flatMap(v => String(v).split('|')).filter(Boolean);
    }
    const stringValue = String(value);
    return stringValue.includes('|') ? stringValue.split('|').filter(Boolean) : [stringValue];
  };

  const activeCounts = {
    gender: getActiveValues('gender').length,
    category: getActiveValues('category').length,
    size: getActiveValues('size').length,
    color: getActiveValues('color').length,
    priceRange: getActiveValues('priceRange').length,
  };

  // Close mobile drawer when filters change
  useEffect(() => {
    setOpen(false);
  }, [search]);

  const onToggle = (key: GroupKey, value: string) => {
    const currentParams = parseQueryParams(search);
    const updatedParams = toggleQueryArrayParam(currentParams, key, value);
    const queryStr = stringifyQueryParams(updatedParams);
    router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
  };

  const handleClearAll = () => {
    const currentParams = parseQueryParams(search);
    const clearedParams = clearFilters(currentParams);
    const queryStr = stringifyQueryParams(clearedParams);
    router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
  };

  const Group = ({
    title,
    children,
    k,
  }: {
    title: string;
    children: import('react').ReactNode;
    k: GroupKey;
  }) => (
    <div className="border-b border-light-300 py-4">
      <button
        className="flex w-full items-center justify-between text-body-medium text-dark-900"
        onClick={() => setExpanded((s) => ({ ...s, [k]: !s[k] }))}
        aria-expanded={expanded[k]}
        aria-controls={`${k}-section`}
      >
        <span>{title}</span>
        <span className="text-caption text-dark-700">{expanded[k] ? '−' : '+'}</span>
      </button>
      <div id={`${k}-section`} className={`${expanded[k] ? 'mt-3 block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button - shows at top alongside Sort */}
      <button
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-light-300 rounded
          hover:border-dark-700 transition-colors bg-light-100"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-body-medium">Filters</span>
      </button>

      {/* Desktop sidebar - always visible on large screens */}
      <aside className="sticky top-20 hidden h-fit min-w-60 rounded-lg border border-light-300 bg-light-100 p-4 lg:block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-body-medium text-dark-900">Filters</h3>
          <button className="text-caption text-dark-700 underline" onClick={handleClearAll}>
            Clear all
          </button>
        </div>

        {/* Gender filter */}
        <Group title={`Gender ${activeCounts.gender ? `(${activeCounts.gender})` : ''}`} k="gender">
          <ul className="space-y-2">
            {FILTER_OPTIONS.genders.map((gender) => {
              const value = gender.toLowerCase();
              const checked = getActiveValues('gender').includes(value);
              return (
                <li key={gender} className="flex items-center gap-2">
                  <input
                    id={`gender-${value}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle('gender', value)}
                  />
                  <label htmlFor={`gender-${value}`} className="text-body text-dark-900">
                    {gender}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        {/* Category filter */}
        <Group title={`Category ${activeCounts.category ? `(${activeCounts.category})` : ''}`} k="category">
          <ul className="space-y-2">
            {FILTER_OPTIONS.categories.map((category) => {
              const value = category.toLowerCase();
              const checked = getActiveValues('category').includes(value);
              return (
                <li key={category} className="flex items-center gap-2">
                  <input
                    id={`category-${value}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle('category', value)}
                  />
                  <label htmlFor={`category-${value}`} className="text-body text-dark-900">
                    {category}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        {/* Size filter */}
        <Group title={`Size ${activeCounts.size ? `(${activeCounts.size})` : ''}`} k="size">
          <ul className="grid grid-cols-3 gap-2">
            {FILTER_OPTIONS.sizes.map((size) => {
              const value = size.toLowerCase();
              const checked = getActiveValues('size').includes(value);
              return (
                <li key={size}>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-dark-900"
                      checked={checked}
                      onChange={() => onToggle('size', value)}
                    />
                    <span className="text-body">{size}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        {/* Color filter */}
        <Group title={`Color ${activeCounts.color ? `(${activeCounts.color})` : ''}`} k="color">
          <ul className="grid grid-cols-2 gap-2">
            {FILTER_OPTIONS.colors.map((color) => {
              const value = color.name.toLowerCase();
              const checked = getActiveValues('color').includes(value);
              return (
                <li key={color.name} className="flex items-center gap-2">
                  <input
                    id={`color-${value}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle('color', value)}
                  />
                  <label htmlFor={`color-${value}`} className="text-body capitalize">
                    {color.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>

        {/* Price range filter */}
        <Group title={`Price ${activeCounts.priceRange ? `(${activeCounts.priceRange})` : ''}`} k="priceRange">
          <ul className="space-y-2">
            {FILTER_OPTIONS.priceRanges.map((range) => {
              const value = `${range.min}-${range.max}`;
              const checked = getActiveValues('priceRange').includes(value);
              return (
                <li key={value} className="flex items-center gap-2">
                  <input
                    id={`price-${value}`}
                    type="checkbox"
                    className="h-4 w-4 accent-dark-900"
                    checked={checked}
                    onChange={() => onToggle('priceRange', value)}
                  />
                  <label htmlFor={`price-${value}`} className="text-body">
                    {range.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </Group>
      </aside>

      {/* Mobile drawer - conditional render */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 left-0 w-80 max-w-[80%] overflow-auto bg-light-100 p-4 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-body-medium">Filters</h3>
              <button className="text-caption text-dark-700 underline" onClick={handleClearAll}>
                Clear all
              </button>
            </div>

            {/* Gender filter - mobile */}
            <Group title="Gender" k="gender">
              <ul className="space-y-2">
                {FILTER_OPTIONS.genders.map((gender) => {
                  const value = gender.toLowerCase();
                  const checked = getActiveValues('gender').includes(value);
                  return (
                    <li key={gender} className="flex items-center gap-2">
                      <input
                        id={`m-gender-${value}`}
                        type="checkbox"
                        className="h-4 w-4 accent-dark-900"
                        checked={checked}
                        onChange={() => onToggle('gender', value)}
                      />
                      <label htmlFor={`m-gender-${value}`} className="text-body">
                        {gender}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>

            {/* Category filter - mobile */}
            <Group title="Category" k="category">
              <ul className="space-y-2">
                {FILTER_OPTIONS.categories.map((category) => {
                  const value = category.toLowerCase();
                  const checked = getActiveValues('category').includes(value);
                  return (
                    <li key={category} className="flex items-center gap-2">
                      <input
                        id={`m-category-${value}`}
                        type="checkbox"
                        className="h-4 w-4 accent-dark-900"
                        checked={checked}
                        onChange={() => onToggle('category', value)}
                      />
                      <label htmlFor={`m-category-${value}`} className="text-body">
                        {category}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>

            {/* Size filter - mobile */}
            <Group title="Size" k="size">
              <ul className="grid grid-cols-3 gap-2">
                {FILTER_OPTIONS.sizes.map((size) => {
                  const value = size.toLowerCase();
                  const checked = getActiveValues('size').includes(value);
                  return (
                    <li key={size}>
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-dark-900"
                          checked={checked}
                          onChange={() => onToggle('size', value)}
                        />
                        <span className="text-body">{size}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>

            {/* Color filter - mobile */}
            <Group title="Color" k="color">
              <ul className="grid grid-cols-2 gap-2">
                {FILTER_OPTIONS.colors.map((color) => {
                  const value = color.name.toLowerCase();
                  const checked = getActiveValues('color').includes(value);
                  return (
                    <li key={color.name} className="flex items-center gap-2">
                      <input
                        id={`m-color-${value}`}
                        type="checkbox"
                        className="h-4 w-4 accent-dark-900"
                        checked={checked}
                        onChange={() => onToggle('color', value)}
                      />
                      <label htmlFor={`m-color-${value}`} className="text-body capitalize">
                        {color.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>

            {/* Price range filter - mobile */}
            <Group title="Price" k="priceRange">
              <ul className="space-y-2">
                {FILTER_OPTIONS.priceRanges.map((range) => {
                  const value = `${range.min}-${range.max}`;
                  const checked = getActiveValues('priceRange').includes(value);
                  return (
                    <li key={value} className="flex items-center gap-2">
                      <input
                        id={`m-price-${value}`}
                        type="checkbox"
                        className="h-4 w-4 accent-dark-900"
                        checked={checked}
                        onChange={() => onToggle('priceRange', value)}
                      />
                      <label htmlFor={`m-price-${value}`} className="text-body">
                        {range.label}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Group>
          </div>
        </div>
      )}
    </>
  );
}
