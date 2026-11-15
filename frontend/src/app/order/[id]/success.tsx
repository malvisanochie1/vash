import { router, useLocalSearchParams } from 'expo-router';
import { MapPinned } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { Container } from '@/components/layout/Container';
import { Screen } from '@/components/layout/Screen';
import { Button, SummaryRow, Text } from '@/components/ui';
import { paymentLabel } from '@/features/checkout/payment-methods';
import { HeartBurst } from '@/features/orders/components/HeartBurst';
import { SuccessBadge } from '@/features/orders/components/SuccessBadge';
import { useOrder } from '@/features/orders/use-orders';
import { formatNaira } from '@/lib/format';
import { shadow } from '@/theme';

const rise = (i: number) => 650 + i * 110;

export default function OrderSuccess() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: order } = useOrder(id);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView contentContainerClassName="flex-grow justify-center py-8">
        <Container narrow className="items-center">
          <View className="items-center justify-center">
            <HeartBurst delay={300} />
            <SuccessBadge />
          </View>

          <Appear delay={rise(0)} className="mt-8 items-center">
            <Text variant="hero" className="text-center">
              Order placed, queen! 👑
            </Text>
            <Text className="mt-2 max-w-[300px] text-center text-muted">
              Thank you for shopping with us. You can follow every step of your order from here.
            </Text>
          </Appear>

          {order && (
            <Appear delay={rise(1)} style={{ width: '100%' }}>
              <View className="mt-7 gap-2.5 rounded-[28px] bg-white p-5" style={shadow.card}>
                <SummaryRow label="Order ID" value={`#${order.reference}`} />
                <SummaryRow label="Est. delivery" value={order.delivery.eta} />
                <SummaryRow label="Payment" value={paymentLabel(order.payment.method)} />
                <SummaryRow label="Amount" value={formatNaira(order.totals.total)} emphasis />
              </View>
            </Appear>
          )}

          {order?.status === 'payment_review' && (
            <Appear delay={rise(2)} style={{ width: '100%' }} className="mt-4 flex-row items-center gap-3 rounded-3xl bg-blush-100 p-4">
              <Text className="text-lg">⏳</Text>
              <Text className="flex-1 text-[13px]">
                We're confirming your transfer. Your order moves forward as soon as the money arrives — usually within 30 minutes.
              </Text>
            </Appear>
          )}

          <Appear delay={rise(3)} style={{ width: '100%' }} className="mt-7 gap-2">
            <Button title="Track Order" icon={MapPinned} onPress={() => router.replace(`/order/${id}/track`)} />
            <Button title="Continue shopping" variant="ghost" onPress={() => router.replace('/(tabs)')} />
          </Appear>
        </Container>
      </ScrollView>
    </Screen>
  );
}
