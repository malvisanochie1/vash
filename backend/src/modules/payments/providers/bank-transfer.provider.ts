import { env } from '../../../config/env.js';
import { AppError } from '../../../core/errors.js';
import type { PaymentProvider } from '../payment.types.js';

export const bankTransferProvider: PaymentProvider = {
  method: 'bank_transfer',
  initialStatus: 'awaiting_transfer',
  async initiate({ reference, amount }) {
    if (!env.PAYOUT_ACCOUNT_NUMBER) {
      throw new AppError(503, 'Bank transfer is not configured yet', 'PAYMENT_UNAVAILABLE');
    }
    return {
      type: 'bank_transfer',
      bankName: env.PAYOUT_BANK_NAME,
      accountName: env.PAYOUT_ACCOUNT_NAME,
      accountNumber: env.PAYOUT_ACCOUNT_NUMBER,
      reference,
      amount,
    };
  },
};
