import { env } from '../../../config/env.js';
import { AppError } from '../../../core/errors.js';
import type { PaymentProvider } from '../payment.types.js';

const PAYSTACK_INIT_URL = 'https://api.paystack.co/transaction/initialize';

/** Card payments via Paystack. Without a secret key it runs in sandbox mode. */
export const cardProvider: PaymentProvider = {
  method: 'card',
  initialStatus: 'awaiting_card',
  async initiate({ reference, amount, email }) {
    if (!env.PAYSTACK_SECRET_KEY) return { type: 'card', reference, sandbox: true };

    const response = await fetch(PAYSTACK_INIT_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount: amount * 100, reference }),
    });
    const body = (await response.json()) as { status: boolean; data?: { authorization_url: string } };
    if (!body.status || !body.data) throw new AppError(502, 'Card payment is unavailable', 'PAYMENT_PROVIDER');

    return { type: 'card', reference, sandbox: false, authorizationUrl: body.data.authorization_url };
  },
};
