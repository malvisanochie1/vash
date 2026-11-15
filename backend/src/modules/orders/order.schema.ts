import { z } from 'zod';
import { PAYMENT_METHODS } from '../payments/payment.types.js';
import { DELIVERY_OPTIONS, ORDER_STATUSES } from './order.types.js';

export const CreateOrderBody = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        variantId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1, 'Your bag is empty'),
  delivery: z.object({
    option: z.enum(Object.keys(DELIVERY_OPTIONS) as [keyof typeof DELIVERY_OPTIONS]),
    recipient: z.string().trim().min(2),
    address: z.object({
      line1: z.string().trim().min(4),
      city: z.string().trim().min(2),
      state: z.string().trim().min(2),
      phone: z.string().trim().min(7),
    }),
  }),
  paymentMethod: z.enum(PAYMENT_METHODS),
  promoCode: z.string().trim().optional(),
});
export type CreateOrderBody = z.infer<typeof CreateOrderBody>;

export const UpdateStatusBody = z.object({ status: z.enum(ORDER_STATUSES) });
