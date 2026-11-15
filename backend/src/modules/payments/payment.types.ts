export const PAYMENT_METHODS = ['bank_transfer', 'card', 'pay_on_delivery'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type PaymentStatus = 'awaiting_transfer' | 'awaiting_card' | 'pay_on_delivery' | 'paid';

export interface BankTransferInstruction {
  type: 'bank_transfer';
  bankName: string;
  accountName: string;
  accountNumber: string;
  reference: string;
  amount: number;
}

export interface CardInstruction {
  type: 'card';
  /** Hosted checkout URL (Paystack). Absent in sandbox mode. */
  authorizationUrl?: string;
  reference: string;
  sandbox: boolean;
}

export interface OnDeliveryInstruction {
  type: 'pay_on_delivery';
  amount: number;
}

export type PaymentInstruction = BankTransferInstruction | CardInstruction | OnDeliveryInstruction;

export interface PaymentRequest {
  reference: string;
  amount: number;
  email: string;
}

export interface PaymentProvider {
  readonly method: PaymentMethod;
  readonly initialStatus: PaymentStatus;
  initiate(request: PaymentRequest): Promise<PaymentInstruction>;
}
