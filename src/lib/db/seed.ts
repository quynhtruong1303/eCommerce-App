import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import {
  genders,
  colors,
  sizes,
  brands,
  categories,
  collections,
  products,
  productVariants,
  productImages,
  productCollections,
} from './schema';

// Load environment variables
config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Helper function to copy images to static uploads directory
function setupStaticImageDirectory() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✓ Created uploads directory');
  }
  return uploadDir;
}

function copyImageToUploads(sourcePath: string, filename: string, uploadDir: string): string {
  try {
    const destPath = path.join(uploadDir, filename);
    fs.copyFileSync(sourcePath, destPath);
    return `/uploads/products/${filename}`;
  } catch (error) {
    console.error(`✗ Failed to copy ${filename}:`, error);
    return '';
  }
}

async function clearDatabase() {
  console.log('🗑️  Clearing existing data...\n');

  // Delete in reverse order of dependencies
  await db.delete(productCollections);
  await db.delete(productImages);
  await db.delete(productVariants);
  await db.delete(products);
  await db.delete(collections);
  await db.delete(categories);
  await db.delete(brands);
  await db.delete(sizes);
  await db.delete(colors);
  await db.delete(genders);

  console.log('✓ Database cleared\n');
}

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Clear existing data first
    await clearDatabase();

    // Setup image directory
    const uploadDir = setupStaticImageDirectory();

    // 1. Seed Genders
    console.log('📊 Seeding genders...');
    const [menGender, womenGender, unisexGender] = await db.insert(genders).values([
      { label: 'Men', slug: 'men' },
      { label: 'Women', slug: 'women' },
      { label: 'Unisex', slug: 'unisex' },
    ]).returning();
    console.log('✓ Seeded 3 genders\n');

    // 2. Seed Colors
    console.log('🎨 Seeding colors...');
    const colorData = [
      { name: 'Black', slug: 'black', hexCode: '#000000' },
      { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
      { name: 'Red', slug: 'red', hexCode: '#DC143C' },
      { name: 'Blue', slug: 'blue', hexCode: '#0000FF' },
      { name: 'Navy', slug: 'navy', hexCode: '#000080' },
      { name: 'Grey', slug: 'grey', hexCode: '#808080' },
      { name: 'Green', slug: 'green', hexCode: '#008000' },
      { name: 'Orange', slug: 'orange', hexCode: '#FF8C00' },
      { name: 'Pink', slug: 'pink', hexCode: '#FFC0CB' },
      { name: 'Yellow', slug: 'yellow', hexCode: '#FFD700' },
    ];
    const insertedColors = await db.insert(colors).values(colorData).returning();
    console.log(`✓ Seeded ${insertedColors.length} colors\n`);

    // 3. Seed Sizes
    console.log('📏 Seeding sizes...');
    const sizeData = [
      { name: 'US 6', slug: 'us-6', sortOrder: 1 },
      { name: 'US 6.5', slug: 'us-6-5', sortOrder: 2 },
      { name: 'US 7', slug: 'us-7', sortOrder: 3 },
      { name: 'US 7.5', slug: 'us-7-5', sortOrder: 4 },
      { name: 'US 8', slug: 'us-8', sortOrder: 5 },
      { name: 'US 8.5', slug: 'us-8-5', sortOrder: 6 },
      { name: 'US 9', slug: 'us-9', sortOrder: 7 },
      { name: 'US 9.5', slug: 'us-9-5', sortOrder: 8 },
      { name: 'US 10', slug: 'us-10', sortOrder: 9 },
      { name: 'US 10.5', slug: 'us-10-5', sortOrder: 10 },
      { name: 'US 11', slug: 'us-11', sortOrder: 11 },
      { name: 'US 11.5', slug: 'us-11-5', sortOrder: 12 },
      { name: 'US 12', slug: 'us-12', sortOrder: 13 },
      { name: 'US 12.5', slug: 'us-12-5', sortOrder: 14 },
      { name: 'US 13', slug: 'us-13', sortOrder: 15 },
    ];
    const insertedSizes = await db.insert(sizes).values(sizeData).returning();
    console.log(`✓ Seeded ${insertedSizes.length} sizes\n`);

    // 4. Seed Brand (Nike)
    console.log('🏷️  Seeding brands...');
    const [nikeBrand] = await db.insert(brands).values([
      { name: 'Nike', slug: 'nike', logoUrl: '/logos/nike.svg' },
    ]).returning();
    console.log('✓ Seeded 1 brand\n');

    // 5. Seed Categories
    console.log('📂 Seeding categories...');
    const categoryData = [
      { name: 'Running', slug: 'running' },
      { name: 'Basketball', slug: 'basketball' },
      { name: 'Training', slug: 'training' },
      { name: 'Lifestyle', slug: 'lifestyle' },
      { name: 'Soccer', slug: 'soccer' },
      { name: 'Skateboarding', slug: 'skateboarding' },
    ];
    const insertedCategories = await db.insert(categories).values(categoryData).returning();
    console.log(`✓ Seeded ${insertedCategories.length} categories\n`);

    // 6. Seed Collections
    console.log('📦 Seeding collections...');
    const collectionData = [
      { name: 'New Arrivals', slug: 'new-arrivals' },
      { name: 'Best Sellers', slug: 'best-sellers' },
      { name: 'Summer 2025', slug: 'summer-2025' },
    ];
    const insertedCollections = await db.insert(collections).values(collectionData).returning();
    console.log(`✓ Seeded ${insertedCollections.length} collections\n`);

    // 7. Seed Products with Variants and Images
    console.log('👟 Seeding products with variants and images...');

    const productData = [
      {
        name: 'Air Max 270',
        description: 'The Air Max 270 delivers visible cushioning under every step with the largest Air Max unit ever. Its inspired by two icons of big Air: the Air Max 180 and Air Max 93.',
        categoryId: insertedCategories.find(c => c.slug === 'lifestyle')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-1.jpg',
        variants: [
          { colorSlug: 'black', sizes: ['us-9', 'us-10', 'us-11'], price: '160.00', salePrice: '140.00', stock: 25 },
          { colorSlug: 'white', sizes: ['us-8', 'us-9', 'us-10'], price: '160.00', stock: 30 },
        ],
      },
      {
        name: 'Air Force 1 \'07',
        description: 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash.',
        categoryId: insertedCategories.find(c => c.slug === 'lifestyle')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-2.webp',
        variants: [
          { colorSlug: 'white', sizes: ['us-7', 'us-8', 'us-9', 'us-10', 'us-11'], price: '115.00', stock: 50 },
          { colorSlug: 'black', sizes: ['us-8', 'us-9', 'us-10'], price: '115.00', stock: 35 },
        ],
      },
      {
        name: 'React Infinity Run Flyknit 3',
        description: 'A stable, bouncy ride with responsive cushioning. The Nike React Infinity Run Flyknit 3 is designed to help reduce injury and keep you running.',
        categoryId: insertedCategories.find(c => c.slug === 'running')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-3.webp',
        variants: [
          { colorSlug: 'blue', sizes: ['us-9', 'us-10', 'us-11', 'us-12'], price: '170.00', stock: 20 },
          { colorSlug: 'grey', sizes: ['us-8', 'us-9', 'us-10'], price: '170.00', salePrice: '150.00', stock: 15 },
        ],
      },
      {
        name: 'LeBron 20',
        description: 'The LeBron 20 has a cabling system that works with Zoom Air cushioning and a lightweight, low-to-the-ground design to help you feel fast and stay contained.',
        categoryId: insertedCategories.find(c => c.slug === 'basketball')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-4.webp',
        variants: [
          { colorSlug: 'red', sizes: ['us-10', 'us-11', 'us-12', 'us-13'], price: '200.00', stock: 18 },
          { colorSlug: 'black', sizes: ['us-9', 'us-10', 'us-11'], price: '200.00', stock: 22 },
        ],
      },
      {
        name: 'Metcon 8',
        description: 'The Nike Metcon 8 is designed for lifters, runners and anyone seeking stability during high-intensity workouts. A wide heel carries loads while a flexible forefoot lets you move.',
        categoryId: insertedCategories.find(c => c.slug === 'training')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-5.avif',
        variants: [
          { colorSlug: 'black', sizes: ['us-8', 'us-9', 'us-10', 'us-11'], price: '150.00', stock: 30 },
          { colorSlug: 'grey', sizes: ['us-9', 'us-10'], price: '150.00', salePrice: '130.00', stock: 15 },
        ],
      },
      {
        name: 'Pegasus 40',
        description: 'Reinvent your run with the Nike Pegasus 40. This workhorse is designed for everyday training with a feather-light feel and responsive cushioning.',
        categoryId: insertedCategories.find(c => c.slug === 'running')!.id,
        genderId: womenGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-6.avif',
        variants: [
          { colorSlug: 'pink', sizes: ['us-6', 'us-7', 'us-8', 'us-9'], price: '140.00', stock: 40 },
          { colorSlug: 'white', sizes: ['us-7', 'us-8', 'us-9'], price: '140.00', stock: 35 },
        ],
      },
      {
        name: 'Dunk Low Retro',
        description: 'Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors.',
        categoryId: insertedCategories.find(c => c.slug === 'lifestyle')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-7.avif',
        variants: [
          { colorSlug: 'white', sizes: ['us-8', 'us-9', 'us-10', 'us-11'], price: '110.00', stock: 45 },
          { colorSlug: 'navy', sizes: ['us-8', 'us-9', 'us-10'], price: '110.00', salePrice: '95.00', stock: 25 },
        ],
      },
      {
        name: 'Phantom GX Elite',
        description: 'Nike Phantom GX Elite helps you create separation on the field with amplified touch. A grippy texture in key zones gives you precise control when dribbling.',
        categoryId: insertedCategories.find(c => c.slug === 'soccer')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-8.avif',
        variants: [
          { colorSlug: 'green', sizes: ['us-8', 'us-9', 'us-10', 'us-11'], price: '275.00', stock: 12 },
          { colorSlug: 'orange', sizes: ['us-9', 'us-10'], price: '275.00', stock: 8 },
        ],
      },
      {
        name: 'SB Dunk Low Pro',
        description: 'The Nike SB Dunk Low Pro is designed to stand up to the punishment and abuse that comes with skateboarding. A padded tongue and collar provide extra cushioning.',
        categoryId: insertedCategories.find(c => c.slug === 'skateboarding')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-9.avif',
        variants: [
          { colorSlug: 'black', sizes: ['us-8', 'us-9', 'us-10', 'us-11'], price: '110.00', stock: 28 },
          { colorSlug: 'blue', sizes: ['us-8', 'us-9'], price: '110.00', salePrice: '95.00', stock: 15 },
        ],
      },
      {
        name: 'ZoomX Vaporfly Next% 3',
        description: 'Continue your run in the Nike ZoomX Vaporfly Next% 3. Built for racing and fast-paced training, these elite runners are exceptionally fast.',
        categoryId: insertedCategories.find(c => c.slug === 'running')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-10.avif',
        variants: [
          { colorSlug: 'yellow', sizes: ['us-9', 'us-10', 'us-11'], price: '260.00', stock: 10 },
          { colorSlug: 'white', sizes: ['us-9', 'us-10'], price: '260.00', stock: 8 },
        ],
      },
      {
        name: 'Air Zoom GT Cut 2',
        description: 'Built for quick, creative players like Sabrina Ionescu, the Nike Air Zoom GT Cut 2 helps you shift your pace with deceptive quickness.',
        categoryId: insertedCategories.find(c => c.slug === 'basketball')!.id,
        genderId: womenGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-11.avif',
        variants: [
          { colorSlug: 'pink', sizes: ['us-6', 'us-7', 'us-8', 'us-9'], price: '180.00', stock: 20 },
          { colorSlug: 'white', sizes: ['us-7', 'us-8'], price: '180.00', salePrice: '160.00', stock: 12 },
        ],
      },
      {
        name: 'Free Metcon 5',
        description: 'From burpees to intervals, the Nike Free Metcon 5 has you covered with a flexible forefoot and stable heel for weight training and high-intensity workouts.',
        categoryId: insertedCategories.find(c => c.slug === 'training')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-12.avif',
        variants: [
          { colorSlug: 'black', sizes: ['us-8', 'us-9', 'us-10', 'us-11', 'us-12'], price: '120.00', stock: 35 },
          { colorSlug: 'grey', sizes: ['us-9', 'us-10'], price: '120.00', stock: 20 },
        ],
      },
      {
        name: 'Alphafly 3',
        description: 'Designed for racing, the Nike Alphafly 3 provides a bouncy sensation as you run. The next-generation technology gives you stability and a sense of rolling with every stride.',
        categoryId: insertedCategories.find(c => c.slug === 'running')!.id,
        genderId: womenGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-13.avif',
        variants: [
          { colorSlug: 'orange', sizes: ['us-6', 'us-7', 'us-8', 'us-9'], price: '285.00', stock: 8 },
          { colorSlug: 'pink', sizes: ['us-7', 'us-8'], price: '285.00', stock: 6 },
        ],
      },
      {
        name: 'Jordan Luka 2',
        description: 'Built for Luka\'s step-back artistry, the Jordan Luka 2 gives players of all levels the tools to go 1-on-1 with their defenders.',
        categoryId: insertedCategories.find(c => c.slug === 'basketball')!.id,
        genderId: menGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-14.avif',
        variants: [
          { colorSlug: 'blue', sizes: ['us-9', 'us-10', 'us-11', 'us-12'], price: '140.00', stock: 25 },
          { colorSlug: 'red', sizes: ['us-10', 'us-11'], price: '140.00', salePrice: '120.00', stock: 15 },
        ],
      },
      {
        name: 'Tiempo Legend 10 Elite',
        description: 'The Nike Tiempo Legend 10 Elite has a reconstructed design for elevated comfort and precise control. Premium leather has a supple feel for precision passing.',
        categoryId: insertedCategories.find(c => c.slug === 'soccer')!.id,
        genderId: unisexGender.id,
        brandId: nikeBrand.id,
        imageFile: 'shoe-15.avif',
        variants: [
          { colorSlug: 'white', sizes: ['us-8', 'us-9', 'us-10', 'us-11'], price: '270.00', stock: 15 },
          { colorSlug: 'black', sizes: ['us-9', 'us-10'], price: '270.00', stock: 10 },
        ],
      },
    ];

    let productCount = 0;
    let variantCount = 0;
    let imageCount = 0;

    for (const productInfo of productData) {
      // Copy product image
      const sourcePath = path.join(process.cwd(), 'public', 'shoes', productInfo.imageFile);
      const imageUrl = copyImageToUploads(sourcePath, productInfo.imageFile, uploadDir);

      // Insert product
      const [insertedProduct] = await db.insert(products).values({
        name: productInfo.name,
        description: productInfo.description,
        categoryId: productInfo.categoryId,
        genderId: productInfo.genderId,
        brandId: productInfo.brandId,
        isPublished: true,
      }).returning();
      productCount++;

      // Insert product image (product-level)
      if (imageUrl) {
        await db.insert(productImages).values({
          productId: insertedProduct.id,
          url: imageUrl,
          sortOrder: 0,
          isPrimary: true,
        });
        imageCount++;
      }

      // Insert variants
      let firstVariantId: string | null = null;
      for (const variantInfo of productInfo.variants) {
        const color = insertedColors.find(c => c.slug === variantInfo.colorSlug);
        if (!color) continue;

        for (const sizeSlug of variantInfo.sizes) {
          const size = insertedSizes.find(s => s.slug === sizeSlug);
          if (!size) continue;

          const sku = `NIKE-${insertedProduct.id.substring(0, 8).toUpperCase()}-${color.slug.toUpperCase()}-${size.slug.toUpperCase()}`;

          const [variant] = await db.insert(productVariants).values({
            productId: insertedProduct.id,
            sku,
            price: variantInfo.price,
            salePrice: variantInfo.salePrice || null,
            colorId: color.id,
            sizeId: size.id,
            inStock: variantInfo.stock,
            weight: 0.8, // Default weight in kg
            dimensions: { length: 30, width: 20, height: 12 }, // Default dimensions in cm
          }).returning();
          variantCount++;

          if (!firstVariantId) {
            firstVariantId = variant.id;
          }
        }
      }

      // Update product with default variant
      if (firstVariantId) {
        await db.update(products)
          .set({ defaultVariantId: firstVariantId })
          .where(eq(products.id, insertedProduct.id));
      }

      // Add to collections (randomize)
      if (productCount % 3 === 0) {
        await db.insert(productCollections).values({
          productId: insertedProduct.id,
          collectionId: insertedCollections[0].id, // New Arrivals
        });
      }
      if (productCount % 2 === 0) {
        await db.insert(productCollections).values({
          productId: insertedProduct.id,
          collectionId: insertedCollections[1].id, // Best Sellers
        });
      }
    }

    console.log(`✓ Seeded ${productCount} products`);
    console.log(`✓ Seeded ${variantCount} variants`);
    console.log(`✓ Seeded ${imageCount} images\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - Genders: 3`);
    console.log(`  - Colors: ${insertedColors.length}`);
    console.log(`  - Sizes: ${insertedSizes.length}`);
    console.log(`  - Brands: 1`);
    console.log(`  - Categories: ${insertedCategories.length}`);
    console.log(`  - Collections: ${insertedCollections.length}`);
    console.log(`  - Products: ${productCount}`);
    console.log(`  - Variants: ${variantCount}`);
    console.log(`  - Images: ${imageCount}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
