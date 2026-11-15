import type { PaymentProvider } from '../payment.types.js';

export const onDeliveryProvider: PaymentProvider = {
  method: 'pay_on_delivery',
  initialStatus: 'pay_on_delivery',
  async initiate({ amount }) {
    return { type: 'pay_on_delivery', amount };
  },
};
