export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice?: number;
  colorName: string;
  colorHex: string;
  sizeName: string;
  inStock: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  brand: string;
  variants: ProductVariant[];
  badges?: string[];
  isPrimary?: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nike Air Force 1 Mid \'07',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '1-1',
        sku: 'AF1-MID-WHT-8',
        price: 98.30,
        colorName: 'White/Black',
        colorHex: '#FFFFFF',
        sizeName: 'US 8',
        inStock: 15,
        images: ['/shoes/shoe-1.jpg']
      },
      {
        id: '1-2',
        sku: 'AF1-MID-WHT-9',
        price: 98.30,
        colorName: 'White/Black',
        colorHex: '#FFFFFF',
        sizeName: 'US 9',
        inStock: 12,
        images: ['/shoes/shoe-1.jpg']
      },
      {
        id: '1-3',
        sku: 'AF1-MID-BLK-8',
        price: 98.30,
        colorName: 'Black',
        colorHex: '#000000',
        sizeName: 'US 8',
        inStock: 8,
        images: ['/shoes/shoe-1.jpg']
      }
    ]
  },
  {
    id: '2',
    name: 'Nike Court Vision Low Next Nature',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Extra 20% off'],
    variants: [
      {
        id: '2-1',
        sku: 'CV-LOW-BLK-9',
        price: 98.30,
        salePrice: 78.64,
        colorName: 'Black/Blue',
        colorHex: '#000000',
        sizeName: 'US 9',
        inStock: 20,
        images: ['/shoes/shoe-2.webp']
      },
      {
        id: '2-2',
        sku: 'CV-LOW-BLK-10',
        price: 98.30,
        salePrice: 78.64,
        colorName: 'Black/Blue',
        colorHex: '#000000',
        sizeName: 'US 10',
        inStock: 18,
        images: ['/shoes/shoe-2.webp']
      }
    ]
  },
  {
    id: '3',
    name: 'Nike Air Force 1 PLT.FORM',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Sustainable Materials'],
    variants: [
      {
        id: '3-1',
        sku: 'AF1-PLT-GRY-8',
        price: 98.30,
        colorName: 'Grey/Mint',
        colorHex: '#CCCCCC',
        sizeName: 'US 8',
        inStock: 10,
        images: ['/shoes/shoe-3.webp']
      }
    ]
  },
  {
    id: '4',
    name: 'Nike Dunk Low Retro',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '4-1',
        sku: 'DUNK-LOW-GRN-9',
        price: 98.30,
        colorName: 'Yellow/Green',
        colorHex: '#FFD700',
        sizeName: 'US 9',
        inStock: 25,
        images: ['/shoes/shoe-4.webp']
      },
      {
        id: '4-2',
        sku: 'DUNK-LOW-GRN-10',
        price: 98.30,
        colorName: 'Yellow/Green',
        colorHex: '#FFD700',
        sizeName: 'US 10',
        inStock: 22,
        images: ['/shoes/shoe-4.webp']
      }
    ]
  },
  {
    id: '5',
    name: 'Nike Air Max SYSTM',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Extra 20% off'],
    variants: [
      {
        id: '5-1',
        sku: 'AM-SYSTM-RED-9',
        price: 98.30,
        salePrice: 78.64,
        colorName: 'White/Red',
        colorHex: '#FFFFFF',
        sizeName: 'US 9',
        inStock: 14,
        images: ['/shoes/shoe-5.avif']
      }
    ]
  },
  {
    id: '6',
    name: 'Nike Air Force 1 PLT.AFORM',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '6-1',
        sku: 'AF1-PLTA-WHT-8',
        price: 98.30,
        colorName: 'White/Pink',
        colorHex: '#FFFFFF',
        sizeName: 'US 8',
        inStock: 16,
        images: ['/shoes/shoe-6.avif']
      }
    ]
  },
  {
    id: '7',
    name: 'Nike Dunk Low Retro SE',
    description: 'Men\'s Shoes',
    category: 'Skateboarding',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Extra 20% off'],
    variants: [
      {
        id: '7-1',
        sku: 'DUNK-SE-TAN-9',
        price: 98.30,
        salePrice: 78.64,
        colorName: 'Tan/Brown',
        colorHex: '#D2B48C',
        sizeName: 'US 9',
        inStock: 11,
        images: ['/shoes/shoe-7.avif']
      }
    ]
  },
  {
    id: '8',
    name: 'Nike Air Max 90 SE',
    description: 'Men\'s Shoes',
    category: 'Lifestyle',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '8-1',
        sku: 'AM90-SE-ORG-10',
        price: 98.30,
        colorName: 'White/Orange',
        colorHex: '#FFFFFF',
        sizeName: 'US 10',
        inStock: 19,
        images: ['/shoes/shoe-8.avif']
      }
    ]
  },
  {
    id: '9',
    name: 'Nike Legend Essential 3 Next Nature',
    description: 'Men\'s Training Shoes',
    category: 'Training',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Extra 10% off'],
    variants: [
      {
        id: '9-1',
        sku: 'LEG-ESS-NVY-9',
        price: 98.30,
        salePrice: 88.47,
        colorName: 'Navy/Red',
        colorHex: '#000080',
        sizeName: 'US 9',
        inStock: 13,
        images: ['/shoes/shoe-9.avif']
      }
    ]
  },
  {
    id: '10',
    name: 'Nike SB Zoom Janoski OG+',
    description: 'Men\'s Shoes',
    category: 'Skateboarding',
    gender: 'Men',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '10-1',
        sku: 'SB-JAN-TAN-9',
        price: 98.30,
        colorName: 'Tan/Navy',
        colorHex: '#D2B48C',
        sizeName: 'US 9',
        inStock: 17,
        images: ['/shoes/shoe-10.avif']
      }
    ]
  },
  {
    id: '11',
    name: 'Jordan Series ES',
    description: 'Men\'s Shoes',
    category: 'Basketball',
    gender: 'Men',
    brand: 'Nike',
    badges: [],
    variants: [
      {
        id: '11-1',
        sku: 'JOR-SER-GRN-10',
        price: 98.30,
        colorName: 'Sage Green',
        colorHex: '#9DC183',
        sizeName: 'US 10',
        inStock: 21,
        images: ['/shoes/shoe-11.avif']
      }
    ]
  },
  {
    id: '12',
    name: 'Nike Blazer Low \'77 Jumbo',
    description: 'Women\'s Shoes',
    category: 'Lifestyle',
    gender: 'Women',
    brand: 'Nike',
    badges: [],
    variants: [
      {
        id: '12-1',
        sku: 'BLZ-LOW-WHT-7',
        price: 98.30,
        colorName: 'White/Blue',
        colorHex: '#FFFFFF',
        sizeName: 'US 7',
        inStock: 15,
        images: ['/shoes/shoe-12.avif']
      },
      {
        id: '12-2',
        sku: 'BLZ-LOW-WHT-8',
        price: 98.30,
        colorName: 'White/Blue',
        colorHex: '#FFFFFF',
        sizeName: 'US 8',
        inStock: 12,
        images: ['/shoes/shoe-12.avif']
      }
    ]
  },
  {
    id: '13',
    name: 'Nike Air Max 270',
    description: 'Women\'s Shoes',
    category: 'Lifestyle',
    gender: 'Women',
    brand: 'Nike',
    badges: ['New'],
    variants: [
      {
        id: '13-1',
        sku: 'AM270-WHT-7',
        price: 125.00,
        colorName: 'White/Purple',
        colorHex: '#FFFFFF',
        sizeName: 'US 7',
        inStock: 18,
        images: ['/shoes/shoe-13.avif']
      }
    ]
  },
  {
    id: '14',
    name: 'Nike Pegasus 40',
    description: 'Women\'s Running Shoes',
    category: 'Running',
    gender: 'Women',
    brand: 'Nike',
    badges: ['Best Seller'],
    variants: [
      {
        id: '14-1',
        sku: 'PEG40-PNK-7',
        price: 140.00,
        colorName: 'Pink/White',
        colorHex: '#FFC0CB',
        sizeName: 'US 7',
        inStock: 24,
        images: ['/shoes/shoe-14.avif']
      }
    ]
  },
  {
    id: '15',
    name: 'Nike Metcon 9',
    description: 'Unisex Training Shoes',
    category: 'Training',
    gender: 'Unisex',
    brand: 'Nike',
    badges: [],
    variants: [
      {
        id: '15-1',
        sku: 'MET9-BLK-9',
        price: 150.00,
        colorName: 'Black/Grey',
        colorHex: '#000000',
        sizeName: 'US 9',
        inStock: 20,
        images: ['/shoes/shoe-15.avif']
      },
      {
        id: '15-2',
        sku: 'MET9-BLK-10',
        price: 150.00,
        colorName: 'Black/Grey',
        colorHex: '#000000',
        sizeName: 'US 10',
        inStock: 16,
        images: ['/shoes/shoe-15.avif']
      }
    ]
  }
];

// Extract unique filter options from mock data
export const FILTER_OPTIONS = {
  genders: ['Men', 'Women', 'Unisex'],
  categories: ['Lifestyle', 'Running', 'Basketball', 'Training', 'Skateboarding', 'Soccer'],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'],
  colors: [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Yellow', hex: '#FFD700' },
    { name: 'Grey', hex: '#CCCCCC' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Orange', hex: '#FFA500' }
  ],
  priceRanges: [
    { label: 'Under $75', min: 0, max: 75 },
    { label: '$75 - $100', min: 75, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: 'Over $150', min: 150, max: 10000 }
  ]
};
