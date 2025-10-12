import { pgTable, uuid, text, numeric, integer, real, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { products } from './products';
import { colors } from './filters/colors';
import { sizes } from './filters/sizes';

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: text('sku').notNull().unique(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric('sale_price', { precision: 10, scale: 2 }),
  colorId: uuid('color_id').notNull().references(() => colors.id, { onDelete: 'restrict' }),
  sizeId: uuid('size_id').notNull().references(() => sizes.id, { onDelete: 'restrict' }),
  inStock: integer('in_stock').notNull().default(0),
  weight: real('weight'), // in kg or lbs
  dimensions: jsonb('dimensions').$type<{ length: number; width: number; height: number }>(), // in cm or inches
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  color: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
  size: one(sizes, {
    fields: [productVariants.sizeId],
    references: [sizes.id],
  }),
  // images, cartItems, orderItems relations will be added in their respective files
}));

// Zod schemas for validation
export const insertProductVariantSchema = createInsertSchema(productVariants).omit({
  id: true,
  createdAt: true,
});

export const selectProductVariantSchema = createSelectSchema(productVariants);

// TypeScript types
export type ProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = typeof productVariants.$inferInsert;
export type VariantDimensions = { length: number; width: number; height: number };
