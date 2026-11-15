import { env } from '../../../config/env.js';
import type { PaymentProvider } from '../payment.types.js';

export const bankTransferProvider: PaymentProvider = {
  method: 'bank_transfer',
  initialStatus: 'awaiting_transfer',
  async initiate({ reference, amount }) {
    return {
      type: 'bank_transfer',
      bankName: env.PAYOUT_BANK_NAME || 'To be confirmed',
      accountName: env.PAYOUT_ACCOUNT_NAME || 'Velora Hair Ltd',
      accountNumber: env.PAYOUT_ACCOUNT_NUMBER || '0000000000',
      reference,
      amount,
    };
  },
};
