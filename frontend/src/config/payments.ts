/**
 * Where customer money goes. Bank transfers are paid straight into this
 * account by the customer, so double-check every digit before changing it.
 * When the backend is live, it serves these details from its own .env instead.
 */
export const payoutAccount = {
  bankName: 'OPay',
  accountName: 'Nwakonobi Chisom Malvis',
  accountNumber: '8121437432',
} as const;

/**
 * Card payments need a merchant gateway (OPay Business or Paystack). They stay
 * switched off until one is connected, so no customer can be charged by mistake.
 */
export const cardPaymentsEnabled = false;
