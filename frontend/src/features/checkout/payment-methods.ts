import { Banknote, CreditCard, Landmark, type LucideIcon } from 'lucide-react-native';
import type { PaymentMethod } from '@/types/domain';

export const paymentMethods: { id: PaymentMethod; title: string; subtitle: string; icon: LucideIcon }[] = [
  { id: 'bank_transfer', title: 'Bank transfer', subtitle: 'Pay into our business account', icon: Landmark },
  { id: 'card', title: 'Debit / credit card', subtitle: 'Visa, Mastercard, Verve', icon: CreditCard },
  { id: 'pay_on_delivery', title: 'Pay on delivery', subtitle: 'Cash or transfer to the rider', icon: Banknote },
];

export const paymentLabel = (method: PaymentMethod) => paymentMethods.find((m) => m.id === method)?.title ?? method;
