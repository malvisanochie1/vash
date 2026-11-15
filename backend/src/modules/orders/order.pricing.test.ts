import { describe, expect, it } from 'vitest';
import { priceOrder } from './order.pricing.js';

describe('priceOrder', () => {
  it('sums lines, applies discount and delivery', () => {
    const totals = priceOrder(
      [
        { unitPrice: 6500, quantity: 2 },
        { unitPrice: 8900, quantity: 1 },
      ],
      2500,
      2190,
    );
    expect(totals).toEqual({ subtotal: 21900, discount: 2190, deliveryFee: 2500, total: 22210 });
  });

  it('never discounts more than the subtotal', () => {
    expect(priceOrder([{ unitPrice: 1000, quantity: 1 }], 0, 5000).total).toBe(0);
  });
});
