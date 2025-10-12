import { pgTable, uuid, text, numeric, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Enum for discount type
export const discountTypeEnum = pgEnum('discount_type', ['percentage', 'fixed']);

export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: numeric('discount_value', { precision: 10, scale: 2 }).notNull(), // percentage (0-100) or fixed amount
  expiresAt: timestamp('expires_at').notNull(),
  maxUsage: integer('max_usage').notNull(), // maximum number of times coupon can be used
  usedCount: integer('used_count').notNull().default(0), // current usage count
});

// Zod schemas for validation
export const insertCouponSchema = createInsertSchema(coupons);
export const selectCouponSchema = createSelectSchema(coupons);

// TypeScript types
export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;
export type DiscountType = 'percentage' | 'fixed';
