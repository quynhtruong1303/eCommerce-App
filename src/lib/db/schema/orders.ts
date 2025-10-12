import { pgTable, uuid, numeric, integer, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './user';
import { addresses } from './addresses';
import { productVariants } from './variants';

// Enums
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'paypal', 'cod']);
export const paymentStatusEnum = pgEnum('payment_status', ['initiated', 'completed', 'failed']);

// Orders
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'restrict' }),
  status: orderStatusEnum('status').notNull().default('pending'),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  shippingAddressId: uuid('shipping_address_id').notNull().references(() => addresses.id, { onDelete: 'restrict' }),
  billingAddressId: uuid('billing_address_id').notNull().references(() => addresses.id, { onDelete: 'restrict' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Order Items
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productVariantId: uuid('product_variant_id').notNull().references(() => productVariants.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: numeric('price_at_purchase', { precision: 10, scale: 2 }).notNull(), // price at time of purchase
});

// Payments
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  method: paymentMethodEnum('method').notNull(),
  status: paymentStatusEnum('status').notNull().default('initiated'),
  paidAt: timestamp('paid_at'),
  transactionId: text('transaction_id'), // external payment gateway transaction ID
});

// Relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  shippingAddress: one(addresses, {
    fields: [orders.shippingAddressId],
    references: [addresses.id],
    relationName: 'shippingAddress',
  }),
  billingAddress: one(addresses, {
    fields: [orders.billingAddressId],
    references: [addresses.id],
    relationName: 'billingAddress',
  }),
  items: many(orderItems),
  payments: many(payments),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  productVariant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

// Zod schemas for validation
export const insertOrderSchema = createInsertSchema(orders);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const insertPaymentSchema = createInsertSchema(payments);
export const selectOrderSchema = createSelectSchema(orders);
export const selectOrderItemSchema = createSelectSchema(orderItems);
export const selectPaymentSchema = createSelectSchema(payments);

// TypeScript types
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type InsertPayment = typeof payments.$inferInsert;
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'stripe' | 'paypal' | 'cod';
export type PaymentStatus = 'initiated' | 'completed' | 'failed';
