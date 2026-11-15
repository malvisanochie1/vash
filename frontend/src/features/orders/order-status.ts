import type { OrderStatus } from '@/types/domain';

/** Delivery journey shown on the tracking screen (after payment). */
export const ORDER_STEPS: { status: OrderStatus; title: string; hint: string }[] = [
  { status: 'payment_review', title: 'Order placed', hint: "We're confirming your payment" },
  { status: 'confirmed', title: 'Payment confirmed', hint: 'Your order is being prepared' },
  { status: 'packed', title: 'Packed with love', hint: 'Your goodies are ready' },
  { status: 'out_for_delivery', title: 'Out for delivery', hint: 'Rider is on the way' },
  { status: 'delivered', title: 'Delivered', hint: 'Enjoy your hair care' },
];

export const statusIndex = (status: OrderStatus) => Math.max(0, ORDER_STEPS.findIndex((s) => s.status === status));

export const statusLabel: Record<OrderStatus, string> = {
  awaiting_payment: 'Awaiting payment',
  payment_review: 'Confirming payment',
  confirmed: 'Confirmed',
  packed: 'Packed',
  out_for_delivery: 'On the way',
  delivered: 'Delivered',
};

/** True until the customer has paid (or reported their transfer). */
export const needsPayment = (status: OrderStatus) => status === 'awaiting_payment';

/** Payment is confirmed (or due on delivery) — delivery details like the rider can show. */
export const isPaymentSettled = (status: OrderStatus) => statusIndex(status) >= 1 && status !== 'awaiting_payment';
