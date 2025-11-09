import queryString from 'query-string';

/**
 * Parse URL query parameters into a structured object
 * Handles arrays for multi-select filters (gender, size, color)
 */
export function parseQueryParams(search: string) {
  return queryString.parse(search, {
    arrayFormat: 'separator',
    arrayFormatSeparator: '|',
    parseBooleans: true,
  });
}

/**
 * Stringify query parameters into URL format
 * Ensures arrays are properly formatted
 */
export function stringifyQueryParams(params: Record<string, any>) {
  return queryString.stringify(params, {
    arrayFormat: 'separator',
    arrayFormatSeparator: '|',
    skipNull: true,
    skipEmptyString: true,
  });
}

/**
 * Update a specific query parameter
 * Handles both single values and arrays (for multi-select)
 */
export function updateQueryParam(
  currentParams: Record<string, any>,
  key: string,
  value: string | string[] | null
): Record<string, any> {
  const updated = { ...currentParams };

  if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    delete updated[key];
  } else {
    updated[key] = value;
  }

  return updated;
}

/**
 * Toggle a value in an array-based query parameter
 * Used for multi-select filters (checkboxes)
 */
export function toggleQueryArrayParam(
  currentParams: Record<string, any>,
  key: string,
  value: string
): Record<string, any> {
  const currentValue = currentParams[key];
  let existingValues: string[] = [];

  // Parse existing values - handle arrays and pipe-separated strings
  if (!currentValue) {
    existingValues = [];
  } else if (Array.isArray(currentValue)) {
    // Flatten any pipe-separated values in the array
    existingValues = currentValue.flatMap(v => String(v).split('|')).filter(Boolean);
  } else {
    // Split pipe-separated string values
    const stringValue = String(currentValue);
    existingValues = stringValue.includes('|') ? stringValue.split('|').filter(Boolean) : [stringValue];
  }

  // Toggle the value
  let newValue: string[];
  if (existingValues.includes(value)) {
    // Remove the value
    newValue = existingValues.filter((v) => v !== value);
  } else {
    // Add the value (ensure no duplicates)
    newValue = [...new Set([...existingValues, value])];
  }

  return updateQueryParam(currentParams, key, newValue.length > 0 ? newValue : null);
}

/**
 * Remove a specific query parameter
 */
export function removeQueryParam(
  currentParams: Record<string, any>,
  key: string
): Record<string, any> {
  const updated = { ...currentParams };
  delete updated[key];
  return updated;
}

/**
 * Clear all filters except specified keys (like sort, page)
 */
export function clearFilters(
  currentParams: Record<string, any>,
  keepKeys: string[] = ['sort']
): Record<string, any> {
  const updated: Record<string, any> = {};

  keepKeys.forEach((key) => {
    if (currentParams[key]) {
      updated[key] = currentParams[key];
    }
  });

  return updated;
}

/**
 * Build a URL with query parameters
 */
export function buildUrlWithParams(
  pathname: string,
  params: Record<string, any>
): string {
  const queryStr = stringifyQueryParams(params);
  return queryStr ? `${pathname}?${queryStr}` : pathname;
}

/**
 * Get active filters from query params
 * Returns a map of filter categories and their selected values
 */
export function getActiveFilters(params: Record<string, any>): {
  gender?: string[];
  size?: string[];
  color?: string[];
  priceRange?: string[];
  category?: string[];
} {
  const filters: any = {};

  // Helper to ensure array format and handle pipe-separated values
  const ensureArray = (value: any): string[] | undefined => {
    if (!value) return undefined;

    if (Array.isArray(value)) {
      // Flatten any pipe-separated values in the array
      return value.flatMap(v => String(v).split('|')).filter(Boolean);
    }

    // Split pipe-separated string values
    const stringValue = String(value);
    return stringValue.includes('|') ? stringValue.split('|').filter(Boolean) : [stringValue];
  };

  if (params.gender) filters.gender = ensureArray(params.gender);
  if (params.size) filters.size = ensureArray(params.size);
  if (params.color) filters.color = ensureArray(params.color);
  if (params.priceRange) filters.priceRange = ensureArray(params.priceRange);
  if (params.category) filters.category = ensureArray(params.category);

  return filters;
}

/**
 * Count total active filters (excluding sort and page)
 */
export function countActiveFilters(params: Record<string, any>): number {
  const filters = getActiveFilters(params);
  return Object.values(filters).reduce((count, arr) => count + (arr?.length || 0), 0);
}
