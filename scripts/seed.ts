import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { products } from '../src/lib/db/schema';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const sampleProducts = [
  {
    name: "Air Jordan 1 Retro High OG",
    description: "The Air Jordan 1 Retro High OG is a classic basketball shoe that combines timeless style with modern comfort.",
    price: "170.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-4aec-89eb-724be12a0082/air-jordan-1-retro-high-og-shoes-PZ6fT9.png",
    category: "Sneakers",
    brand: "Nike",
    size: "US 9",
    color: "Bred",
    stock: 25,
    isActive: true,
  },
  {
    name: "Air Max 270",
    description: "The Air Max 270 delivers visible cushioning under every step with the largest Air Max unit ever.",
    price: "150.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b88a3032-849d-4b14-aa85-708a9516bf15/air-max-270-mens-shoes-KkLcGR.png",
    category: "Lifestyle",
    brand: "Nike",
    size: "US 10",
    color: "Black/White",
    stock: 30,
    isActive: true,
  },
  {
    name: "Dri-FIT ADV Apex Training Shorts",
    description: "These training shorts are made with lightweight, breathable fabric that wicks sweat to keep you cool and dry.",
    price: "45.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f37fca8-6cce-4f7b-8a0c-5e8c8b8b8b8b/dri-fit-adv-apex-training-shorts-2xlTd7.png",
    category: "Apparel",
    brand: "Nike",
    size: "M",
    color: "Black",
    stock: 50,
    isActive: true,
  },
  {
    name: "React Element 55",
    description: "The Nike React Element 55 delivers a bold, futuristic design that's ready for the street.",
    price: "130.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f37fca8-6cce-4f7b-8a0c-5e8c8b8b8b8b/react-element-55-shoes-9QqF6q.png",
    category: "Lifestyle",
    brand: "Nike",
    size: "US 8.5",
    color: "Sail/Black",
    stock: 20,
    isActive: true,
  },
  {
    name: "Nike Pro Dri-FIT Tank",
    description: "A lightweight, breathable tank top designed for training and competition.",
    price: "35.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f37fca8-6cce-4f7b-8a0c-5e8c8b8b8b8b/pro-dri-fit-tank-2xlTd7.png",
    category: "Apparel",
    brand: "Nike",
    size: "L",
    color: "White",
    stock: 40,
    isActive: true,
  },
  {
    name: "Air Force 1 '07",
    description: "The radiance lives on in the Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
    price: "90.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f37fca8-6cce-4f7b-8a0c-5e8c8b8b8b8b/air-force-1-07-shoes-CW2288-111.png",
    category: "Sneakers",
    brand: "Nike",
    size: "US 11",
    color: "White",
    stock: 35,
    isActive: true,
  },
];

async function seed() {
  try {
    console.log('Starting to seed products...');
    
    // Insert sample products
    await db.insert(products).values(sampleProducts);
    
    console.log('Successfully seeded products!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed();
