import { bankTransferProvider } from './providers/bank-transfer.provider.js';
import { cardProvider } from './providers/card.provider.js';
import { onDeliveryProvider } from './providers/on-delivery.provider.js';
import type { PaymentMethod, PaymentProvider } from './payment.types.js';

/** Registry pattern: adding a gateway = adding a provider, nothing else changes. */
const providers: Record<PaymentMethod, PaymentProvider> = {
  bank_transfer: bankTransferProvider,
  card: cardProvider,
  pay_on_delivery: onDeliveryProvider,
};

export const paymentService = {
  provider: (method: PaymentMethod) => providers[method],
};
