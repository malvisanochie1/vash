import type { PaymentInstruction, PaymentMethod, PaymentStatus } from '../payments/payment.types.js';
import type { ProductArt } from '../products/product.types.js';
import type { Address } from '../users/user.types.js';

export const DELIVERY_OPTIONS = {
  express: { id: 'express', label: 'Express', eta: 'Today, 3 – 6 PM', fee: 5000 },
  standard: { id: 'standard', label: 'Standard', eta: '2 – 3 working days', fee: 2500 },
} as const;
export type DeliveryOptionId = keyof typeof DELIVERY_OPTIONS;

export const ORDER_STATUSES = ['confirmed', 'packed', 'out_for_delivery', 'delivered'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderLine {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  image: string;
  art: ProductArt;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export interface StatusEvent {
  status: OrderStatus;
  at: string;
}

export interface Rider {
  name: string;
  phone: string;
  rating: number;
}

export interface Order {
  id: string;
  reference: string;
  userId: string;
  lines: OrderLine[];
  totals: OrderTotals;
  promoCode?: string;
  delivery: { option: DeliveryOptionId; eta: string; address: Address; recipient: string };
  payment: { method: PaymentMethod; status: PaymentStatus; instruction: PaymentInstruction };
  status: OrderStatus;
  history: StatusEvent[];
  rider?: Rider;
  createdAt: string;
}
