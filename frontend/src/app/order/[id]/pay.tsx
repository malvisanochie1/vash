import { router, useLocalSearchParams } from 'expo-router';
import { Clock, Send } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Button, Text } from '@/components/ui';
import { CopyRow } from '@/features/orders/components/CopyRow';
import { OrderThumbs } from '@/features/orders/components/OrderThumbs';
import { useOrder, useReportTransfer } from '@/features/orders/use-orders';
import { formatNaira } from '@/lib/format';
import { palette, shadow } from '@/theme';

/** How long the order is held while we wait for the transfer. */
const HOLD_MINUTES = 30;

function useHoldCountdown(createdAt?: string) {
  const [left, setLeft] = useState('');
  useEffect(() => {
    if (!createdAt) return;
    const deadline = new Date(createdAt).getTime() + HOLD_MINUTES * 60_000;
    const tick = () => {
      const ms = Math.max(0, deadline - Date.now());
      setLeft(`${String(Math.floor(ms / 60_000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);
  return left;
}

/**
 * Bank transfer step. The order only counts as placed once the customer
 * confirms they've sent the money; the owner then verifies it arrived.
 */
export default function PayByTransfer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id);
  const report = useReportTransfer();
  const insets = useSafeAreaInsets();
  const countdown = useHoldCountdown(order?.createdAt);

  useEffect(() => {
    // Already reported (e.g. reopened from orders): go straight to the confirmation.
    if (order && order.status !== 'awaiting_payment') router.replace(`/order/${order.id}/success`);
  }, [order]);

  if (isLoading || !order) {
    return (
      <Screen>
        <ActivityIndicator className="flex-1" color={palette.rose[500]} />
      </Screen>
    );
  }
  const instruction = order.payment.instruction;
  if (instruction.type !== 'bank_transfer') return null;

  const sent = () =>
    report.mutate(order.id, { onSuccess: () => router.replace(`/order/${order.id}/success`) });

  return (
    <Screen>
      <Container narrow>
        <Header title="Complete payment" subtitle={`Order #${order.reference}`} onBack={() => router.replace('/(tabs)/profile')} />
      </Container>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 170 }}>
        <Container narrow className="gap-5 pt-2">
          <Reveal index={0} className="items-center rounded-[28px] bg-white px-5 py-6" style={shadow.card}>
            <OrderThumbs lines={order.lines} size={48} />
            <Text variant="caption" className="mt-4">
              Transfer exactly
            </Text>
            <Text className="font-display-bold text-[38px] leading-[46px] text-rose-600">{formatNaira(instruction.amount)}</Text>
            <View className="mt-2 flex-row items-center gap-1.5 rounded-full bg-blush-100 px-3 py-1.5">
              <Clock size={13} color={palette.rose[600]} />
              <Text className="font-body-medium text-xs text-rose-600">Order held for {countdown}</Text>
            </View>
          </Reveal>

          <Reveal index={1} className="rounded-[28px] bg-white px-5 py-3" style={shadow.card}>
            <CopyRow label="Bank" value={instruction.bankName} copyable={false} />
            <View className="h-px bg-line" />
            <CopyRow label="Account number" value={instruction.accountNumber} large />
            <View className="h-px bg-line" />
            <CopyRow label="Account name" value={instruction.accountName} copyable={false} />
            <View className="h-px bg-line" />
            <CopyRow label="Narration / reference" value={instruction.reference} />
          </Reveal>

          <Reveal index={2} className="gap-3 rounded-3xl bg-blush-100 p-4">
            {[
              'Open your bank app and send the exact amount above.',
              'Put the reference in the narration so we can match your payment.',
              "Come back and tap “I've sent the money”.",
            ].map((step, i) => (
              <View key={step} className="flex-row gap-3">
                <View className="h-6 w-6 items-center justify-center rounded-full bg-white">
                  <Text className="font-body-semibold text-xs text-rose-600">{i + 1}</Text>
                </View>
                <Text className="flex-1 text-[13px]">{step}</Text>
              </View>
            ))}
          </Reveal>
        </Container>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 bg-blush-50/95 pt-3" style={{ paddingBottom: Math.max(insets.bottom, 14) }}>
        <Container narrow className="gap-1">
          <Button title="I've sent the money" icon={Send} loading={report.isPending} onPress={sent} />
          <Button title="I'll pay later" variant="ghost" size="md" onPress={() => router.replace('/(tabs)/profile')} />
        </Container>
      </View>
    </Screen>
  );
}
