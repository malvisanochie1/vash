import { Banknote, CreditCard, Landmark, type LucideIcon } from 'lucide-react-native';
import { cardPaymentsEnabled, payoutAccount } from '@/config/payments';
import type { PaymentMethod } from '@/types/domain';

interface PaymentOption {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  available: boolean;
}

export const paymentMethods: PaymentOption[] = [
  {
    id: 'bank_transfer',
    title: 'Bank transfer',
    subtitle: `Pay into our ${payoutAccount.bankName} account`,
    icon: Landmark,
    available: true,
  },
  {
    id: 'card',
    title: 'Debit / credit card',
    subtitle: cardPaymentsEnabled ? 'Visa, Mastercard, Verve' : 'Coming soon',
    icon: CreditCard,
    available: cardPaymentsEnabled,
  },
  { id: 'pay_on_delivery', title: 'Pay on delivery', subtitle: 'Cash or transfer to the rider', icon: Banknote, available: true },
];

export const paymentLabel = (method: PaymentMethod) => paymentMethods.find((m) => m.id === method)?.title ?? method;
