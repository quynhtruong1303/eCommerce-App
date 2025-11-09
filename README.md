# Nike eCommerce App

A modern eCommerce application built with Next.js, TypeScript, TailwindCSS, Better Auth, Neon PostgreSQL, Drizzle ORM, and Zustand.

## Features

- 🛍️ Product catalog with Nike items
- 🔍 Advanced product filtering (Gender, Category, Size, Color, Price Range)
- 🔄 Multiple sort options (Featured, Newest, Price)
- 🔗 URL-based state management for shareable links
- 🗄️ PostgreSQL database with Drizzle ORM
- 🔐 Authentication with Better Auth
- 🎨 Modern UI with TailwindCSS
- 📱 Responsive design (Desktop sidebar / Mobile drawer)
- 🛒 Shopping cart with Zustand state management
- ⚡ Server-side rendering with Next.js 15

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Zustand
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd nike-ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your database credentials:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

### Database Setup

1. Generate and run migrations:

```bash
npm run db:generate
npm run db:push
```

2. Seed the database with sample Nike products:

```bash
npm run db:seed
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (root)/
│   │   └── products/      # Product listing page (SSR)
│   ├── api/               # API routes
│   │   └── auth/          # Better Auth API routes
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Filters.tsx        # Product filters (client component)
│   ├── Sort.tsx           # Sort dropdown (client component)
│   └── Card.tsx           # Product card
├── lib/                   # Utility libraries
│   ├── auth.ts           # Better Auth configuration
│   ├── data/
│   │   └── products.ts   # Mock product data
│   ├── db/               # Database configuration
│   │   ├── index.ts      # Database connection
│   │   ├── seed.ts       # Database seeding script
│   │   └── schema/       # Database schemas
│   │       ├── index.ts  # Schema exports
│   │       ├── filters/  # Filter schemas (genders, colors, sizes)
│   │       ├── products.ts
│   │       ├── variants.ts
│   │       ├── brands.ts
│   │       ├── categories.ts
│   │       ├── orders.ts
│   │       └── ...       # Other schemas
│   ├── store/            # Zustand stores
│   └── utils/
│       └── query.ts      # URL query parameter utilities
└── ...
```

## Database Schema

The application uses a **normalized database schema** with the following tables:

### Product Schemas
- **products** - Main product information (name, description, category, brand, gender)
- **product_variants** - Product variants (SKU, price, color, size, stock)
- **product_images** - Product and variant images
- **brands** - Product brands (Nike, etc.)
- **categories** - Product categories with hierarchy support

### Filter Schemas
- **genders** - Gender categories (Men, Women, Unisex)
- **colors** - Product colors with hex codes
- **sizes** - Shoe sizes with sort ordering

### User Schemas
- **users** - User accounts (Better Auth)
- **addresses** - Billing and shipping addresses
- **reviews** - Product reviews and ratings
- **wishlists** - User wishlists

### Shopping Schemas
- **carts** - Shopping carts (supports guest and authenticated users)
- **cart_items** - Items in shopping carts
- **orders** - Order information
- **order_items** - Items in orders
- **payments** - Payment transactions
- **coupons** - Discount coupons

### Collection Schemas
- **collections** - Product collections (e.g., "New Arrivals", "Best Sellers")
- **product_collections** - Many-to-many relationship between products and collections

All tables use **UUID primary keys**, proper **foreign key relationships**, and include **Zod validation schemas** for type safety.

## Product Listing Page

The product listing page (`/products`) is a fully functional server-side rendered page with advanced filtering and sorting capabilities.

### Features

- **Server-Side Rendering**: Fast initial load with SEO-friendly HTML
- **URL-Based State**: All filters sync to URL for shareable links and browser back/forward support
- **Multiple Filters**:
  - Gender (Men, Women, Unisex)
  - Category (Lifestyle, Running, Basketball, Training, Skateboarding, Soccer)
  - Size (US 7-13)
  - Color (10 colors with visual swatches)
  - Price Range (Under $75, $75-$100, $100-$150, Over $150)
- **Sort Options**: Featured, Newest, Price (High to Low / Low to High)
- **Responsive Design**: Desktop sidebar layout / Mobile drawer with overlay
- **Active Filter Display**: Removable badges showing current filters
- **Empty States**: Graceful handling when no products match filters

### URL Examples

```bash
# Men's products
/products?gender=men

# Women's running shoes, size US 9
/products?gender=women&category=running&size=us%209

# Multiple filters with pipe separator
/products?gender=men|women&color=black|white

# Sorted by price
/products?sort=price_asc
```

### Key Files

- `/src/app/(root)/products/page.tsx` - Server component with filtering/sorting logic
- `/src/components/Filters.tsx` - Client component for filter UI
- `/src/components/Sort.tsx` - Client component for sort dropdown
- `/src/lib/utils/query.ts` - URL query parameter utilities
- `/src/lib/data/products.ts` - Mock product data (15 Nike products)

### Query Parameter Format

The implementation uses **pipe separator** (`|`) for multi-value filters:

```
?gender=men|women           # Multiple genders
?size=us%208|us%209         # Multiple sizes
?color=black|white|blue     # Multiple colors
```

This format ensures:
- Clean, readable URLs
- Proper handling by Next.js 15
- No duplicate values
- Easy sharing and bookmarking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
