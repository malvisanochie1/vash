import { router } from 'expo-router';
import { Clock, Lock, Store, Truck } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Button, SummaryRow, Text, toast } from '@/components/ui';
import { useAuthStore } from '@/features/auth/auth.store';
import { useCartStore } from '@/features/cart/cart.store';
import { useCartLines } from '@/features/cart/use-cart-lines';
import { usePromoDiscount } from '@/features/cart/use-promo';
import { AddressCard, isAddressComplete, type DeliveryDetails } from '@/features/checkout/components/AddressCard';
import { CheckoutSteps } from '@/features/checkout/components/CheckoutSteps';
import { OptionCard } from '@/features/checkout/components/OptionCard';
import { paymentMethods } from '@/features/checkout/payment-methods';
import { useCreateOrder } from '@/features/orders/use-orders';
import { deliveryOptions } from '@/data/catalog';
import { formatNaira } from '@/lib/format';
import { shadow } from '@/theme';
import type { DeliveryOptionId, PaymentMethod } from '@/types/domain';

const EMPTY_ADDRESS = { line1: '', city: 'Lagos', state: 'Lagos', phone: '' };

export default function Checkout() {
  const user = useAuthStore((s) => s.user);
  const clearCart = useCartStore((s) => s.clear);
  const { lines, subtotal } = useCartLines();
  const { promo, discount } = usePromoDiscount(subtotal);
  const createOrder = useCreateOrder();
  const insets = useSafeAreaInsets();

  const [details, setDetails] = useState<DeliveryDetails>({
    recipient: user?.name ?? '',
    address: user?.address ?? EMPTY_ADDRESS,
  });
  const [deliveryId, setDeliveryId] = useState<DeliveryOptionId>('express');
  const [payment, setPayment] = useState<PaymentMethod>();

  const delivery = deliveryOptions.find((d) => d.id === deliveryId)!;
  const total = subtotal - discount + delivery.fee;
  const addressReady = isAddressComplete(details);
  const step = !addressReady ? 1 : payment ? 3 : 2;

  const placeOrder = () => {
    if (!payment) return;
    createOrder.mutate(
      {
        items: lines.map(({ productId, variantId, quantity }) => ({ productId, variantId, quantity })),
        delivery: { option: deliveryId, ...details },
        paymentMethod: payment,
        promoCode: promo?.code,
      },
      {
        onSuccess: (order) => {
          clearCart();
          // Transfers aren't 'placed' until the customer has actually paid.
          router.replace(order.status === 'awaiting_payment' ? `/order/${order.id}/pay` : `/order/${order.id}/success`);
        },
        onError: (error) => toast.show({ title: 'Could not place order', message: error.message, tone: 'info' }),
      },
    );
  };

  return (
    <Screen edges={['top']}>
      <Container narrow>
        <Header title="Checkout" />
        <View className="pb-3">
          <CheckoutSteps current={step} />
        </View>
      </Container>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <Container narrow className="gap-6 pt-3">
          <Reveal index={0} className="gap-3">
            <Text variant="subheading">Deliver to</Text>
            <AddressCard value={details} onChange={setDetails} startEditing={!addressReady} />
          </Reveal>

          <Reveal index={1} className="gap-3">
            <Text variant="subheading">Delivery</Text>
            {deliveryOptions.map((option) => (
              <OptionCard
                key={option.id}
                icon={option.id === 'express' ? Truck : option.id === 'pickup' ? Store : Clock}
                title={option.label}
                subtitle={option.eta}
                trailing={option.fee ? formatNaira(option.fee) : 'Free'}
                selected={deliveryId === option.id}
                onPress={() => setDeliveryId(option.id)}
              />
            ))}
          </Reveal>

          <Reveal index={2} className="gap-3">
            <Text variant="subheading">Payment method</Text>
            {paymentMethods.map((method) => (
              <OptionCard
                key={method.id}
                icon={method.icon}
                title={method.title}
                subtitle={method.subtitle}
                selected={payment === method.id}
                disabled={!method.available}
                onPress={() => setPayment(method.id)}
              />
            ))}
          </Reveal>

          <Reveal index={3} className="gap-2.5 rounded-[28px] bg-white p-5" style={shadow.card}>
            <SummaryRow label={`Subtotal (${lines.length} item${lines.length === 1 ? '' : 's'})`} value={formatNaira(subtotal)} />
            {discount > 0 && <SummaryRow label={`Promo ${promo?.code}`} value={`-${formatNaira(discount)}`} tone="positive" />}
            <SummaryRow label={`Delivery (${delivery.label})`} value={delivery.fee ? formatNaira(delivery.fee) : 'Free'} />
            <SummaryRow label="Total" value={formatNaira(total)} emphasis />
          </Reveal>
        </Container>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 bg-blush-50/95 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 14) }}>
        <Container narrow>
          <Button
            title={createOrder.isPending ? 'Placing order…' : payment ? `Place order · ${formatNaira(total)}` : 'Choose a payment method'}
            icon={Lock}
            loading={createOrder.isPending}
            disabled={!payment || !addressReady || !lines.length}
            onPress={placeOrder}
          />
        </Container>
      </View>
    </Screen>
  );
}
