import type { OrderStatus } from '@/types/domain';

export const ORDER_STEPS: { status: OrderStatus; title: string; hint: string }[] = [
  { status: 'confirmed', title: 'Order confirmed', hint: 'We have your order' },
  { status: 'packed', title: 'Packed with love', hint: 'Your wash-day goodies are ready' },
  { status: 'out_for_delivery', title: 'Out for delivery', hint: 'Rider is on the way' },
  { status: 'delivered', title: 'Delivered', hint: 'Enjoy your wash day' },
];

export const statusIndex = (status: OrderStatus) => ORDER_STEPS.findIndex((s) => s.status === status);

export const statusLabel: Record<OrderStatus, string> = {
  confirmed: 'Confirmed',
  packed: 'Packed',
  out_for_delivery: 'On the way',
  delivered: 'Delivered',
};
