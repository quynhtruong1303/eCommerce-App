import Filters from '@/components/Filters';
import Sort from '@/components/Sort';
import { Card } from '@/components';
import { MOCK_PRODUCTS, Product, FILTER_OPTIONS } from '@/lib/data/products';
import { getActiveFilters, stringifyQueryParams } from '@/lib/utils/query';
import { X } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

interface SearchParams {
  gender?: string | string[];
  category?: string | string[];
  size?: string | string[];
  color?: string | string[];
  priceRange?: string | string[];
  sort?: string;
  page?: string;
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  // Parse active filters
  const activeFilters = getActiveFilters(params);

  // Filter products based on query params
  const filteredProducts = filterProducts(MOCK_PRODUCTS, activeFilters, params);

  // Sort products
  const sortedProducts = sortProducts(filteredProducts, params.sort || 'featured');

  // Get unique variants for display (one per product, prefer first variant)
  const displayProducts = sortedProducts.map((product) => ({
    product,
    variant: product.variants[0], // Display first variant by default
  }));

  // Count total results
  const totalCount = displayProducts.length;

  return (
    <div className="min-h-screen bg-light-100">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-heading-2 mb-2">
            New ({totalCount})
          </h1>
        </div>

        {/* Mobile: Filter button and Sort bar */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <Filters />
          <Sort />
        </div>

        <div className="flex gap-8">
          {/* Desktop: Filters sidebar */}
          <div className="hidden lg:block">
            <Filters />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Desktop: Sort bar */}
            <div className="mb-6">
              <div className="hidden lg:flex items-center justify-between gap-4 mb-4">
                {/* Results count */}
                <div>
                  <span className="text-caption text-dark-700">
                    {totalCount} result{totalCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Sort */}
                <Sort />
              </div>

              {/* Active filter badges */}
              {Object.keys(activeFilters).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {renderActiveFilterBadges(activeFilters, params)}
                </div>
              )}
            </div>

            {/* Products grid */}
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayProducts.map(({ product, variant }) => (
                  <Card
                    key={`${product.id}-${variant.id}`}
                    title={product.name}
                    price={formatPrice(variant.salePrice || variant.price)}
                    originalPrice={variant.salePrice ? formatPrice(variant.price) : undefined}
                    image={variant.images[0]}
                    imageAlt={product.name}
                    category={product.description}
                    isOnSale={!!variant.salePrice}
                    badge={product.badges?.[0]}
                    variant="default"
                  />
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-16">
                <p className="text-lead text-dark-700 mb-4">No products found</p>
                <p className="text-body text-dark-500 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 bg-dark-900 text-light-100 rounded-full
                    hover:bg-dark-700 transition-colors"
                >
                  Clear All Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: Filter products based on active filters
function filterProducts(
  products: Product[],
  activeFilters: ReturnType<typeof getActiveFilters>,
  params: SearchParams
): Product[] {
  return products.filter((product) => {
    // Gender filter
    if (activeFilters.gender && activeFilters.gender.length > 0) {
      const matchesGender = activeFilters.gender.some(
        (g) => product.gender.toLowerCase() === g.toLowerCase()
      );
      if (!matchesGender) return false;
    }

    // Category filter
    if (activeFilters.category && activeFilters.category.length > 0) {
      const matchesCategory = activeFilters.category.some(
        (c) => product.category.toLowerCase() === c.toLowerCase()
      );
      if (!matchesCategory) return false;
    }

    // Size filter - check if any variant has the size
    if (activeFilters.size && activeFilters.size.length > 0) {
      const matchesSize = product.variants.some((variant) =>
        activeFilters.size!.some((s) => variant.sizeName.toLowerCase() === s.toLowerCase())
      );
      if (!matchesSize) return false;
    }

    // Color filter - check if any variant has the color
    if (activeFilters.color && activeFilters.color.length > 0) {
      const matchesColor = product.variants.some((variant) =>
        activeFilters.color!.some((c) => variant.colorName.toLowerCase().includes(c.toLowerCase()))
      );
      if (!matchesColor) return false;
    }

    // Price range filter - check if any variant falls within range
    if (activeFilters.priceRange && activeFilters.priceRange.length > 0) {
      const matchesPrice = product.variants.some((variant) => {
        const price = variant.salePrice || variant.price;
        return activeFilters.priceRange!.some((range) => {
          const [min, max] = range.split('-').map(Number);
          // Find the matching price range option to check if it's an "over" range
          const rangeOption = FILTER_OPTIONS.priceRanges.find(
            (r) => r.min === min && r.max === max
          );
          // For "Over $X" ranges, use > instead of >=
          const meetsMin = rangeOption?.label.toLowerCase().startsWith('over')
            ? price > min
            : price >= min;
          return meetsMin && price <= max;
        });
      });
      if (!matchesPrice) return false;
    }

    return true;
  });
}

// Helper: Sort products
function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'newest':
      // Mock: reverse order as newest
      return sorted.reverse();

    case 'price_asc':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0].salePrice || a.variants[0].price;
        const priceB = b.variants[0].salePrice || b.variants[0].price;
        return priceA - priceB;
      });

    case 'price_desc':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0].salePrice || a.variants[0].price;
        const priceB = b.variants[0].salePrice || b.variants[0].price;
        return priceB - priceA;
      });

    case 'featured':
    default:
      // Keep original order
      return sorted;
  }
}

// Helper: Format price
function formatPrice(price: number): string {
  return `${price.toFixed(2)}`;
}

// Helper: Render active filter badges
function renderActiveFilterBadges(
  activeFilters: ReturnType<typeof getActiveFilters>,
  params: SearchParams
) {
  const badges: ReactElement[] = [];

  Object.entries(activeFilters).forEach(([filterType, values]) => {
    if (!values || values.length === 0) return;

    values.forEach((value) => {
      let displayValue = value;

      // Format display value
      if (filterType === 'priceRange') {
        const range = FILTER_OPTIONS.priceRanges.find(
          (r) => `${r.min}-${r.max}` === value
        );
        displayValue = range?.label || value;
      } else {
        displayValue = value.charAt(0).toUpperCase() + value.slice(1);
      }

      badges.push(
        <span
          key={`${filterType}-${value}`}
          className="inline-flex items-center gap-2 px-3 py-1 bg-light-200 text-body rounded-full"
        >
          {displayValue}
          <Link
            href={`/products${buildRemoveFilterUrl(params, filterType, value)}`}
            className="hover:text-dark-900"
            aria-label={`Remove ${displayValue} filter`}
          >
            <X className="w-4 h-4" />
          </Link>
        </span>
      );
    });
  });

  return badges;
}

// Helper: Build URL for removing a specific filter
function buildRemoveFilterUrl(
  params: SearchParams,
  filterType: string,
  value: string
): string {
  const currentValue = params[filterType as keyof SearchParams];
  let existingValues: string[] = [];

  // Parse existing values - handle arrays and pipe-separated strings
  if (Array.isArray(currentValue)) {
    existingValues = currentValue.flatMap(v => String(v).split('|')).filter(Boolean);
  } else if (currentValue) {
    const stringValue = String(currentValue);
    existingValues = stringValue.includes('|') ? stringValue.split('|').filter(Boolean) : [stringValue];
  }

  // Remove the specific value
  const newValues = existingValues.filter((v) => v !== value);

  // Build new params
  const newParams = {
    ...params,
    [filterType]: newValues.length > 0 ? newValues : undefined
  };

  // Clean up undefined values
  Object.keys(newParams).forEach((key) => {
    if (newParams[key as keyof SearchParams] === undefined) {
      delete newParams[key as keyof SearchParams];
    }
  });

  const queryStr = stringifyQueryParams(newParams);
  return queryStr ? `?${queryStr}` : '';
}
