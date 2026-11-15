import { BadRequest } from '../../core/errors.js';

export interface Promotion {
  code: string;
  description: string;
  /** Percentage off the subtotal, 0–100. */
  percentOff: number;
  minSubtotal: number;
}

const promotions: Promotion[] = [
  { code: 'BLACKFRIDAY', description: 'Extra 10% off for Black Friday', percentOff: 10, minSubtotal: 0 },
  { code: 'WASHDAY', description: '15% off orders above ₦25,000', percentOff: 15, minSubtotal: 25000 },
];

export const promotionService = {
  find(code: string): Promotion {
    const promo = promotions.find((p) => p.code === code.trim().toUpperCase());
    if (!promo) throw BadRequest('This promo code is not valid');
    return promo;
  },

  discountFor(promo: Promotion, subtotal: number): number {
    if (subtotal < promo.minSubtotal) {
      throw BadRequest(`${promo.code} needs a subtotal of ₦${promo.minSubtotal.toLocaleString()}`);
    }
    return Math.round((subtotal * promo.percentOff) / 100);
  },
};
