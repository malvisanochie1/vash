import type { OrderLine, OrderTotals } from './order.types.js';

/** Pure pricing rule — server is the single source of truth for money. */
export const priceOrder = (
  lines: Pick<OrderLine, 'unitPrice' | 'quantity'>[],
  deliveryFee: number,
  discount = 0,
): OrderTotals => {
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const safeDiscount = Math.min(discount, subtotal);
  return { subtotal, discount: safeDiscount, deliveryFee, total: subtotal - safeDiscount + deliveryFee };
};
