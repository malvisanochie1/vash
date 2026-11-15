import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Badge, Text } from '@/components/ui';
import { OrderThumbs } from '@/features/orders/components/OrderThumbs';
import { OrderTimeline } from '@/features/orders/components/OrderTimeline';
import { RiderCard } from '@/features/orders/components/RiderCard';
import { RouteMap } from '@/features/orders/components/RouteMap';
import { statusIndex, statusLabel, ORDER_STEPS } from '@/features/orders/order-status';
import { useOrder } from '@/features/orders/use-orders';
import { formatNaira } from '@/lib/format';
import { palette, shadow } from '@/theme';

export default function TrackOrder() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id, { live: true });

  if (isLoading || !order) {
    return (
      <Screen>
        <ActivityIndicator className="flex-1" color={palette.rose[500]} />
      </Screen>
    );
  }

  const units = order.lines.reduce((n, l) => n + l.quantity, 0);
  const progress = statusIndex(order.status) / (ORDER_STEPS.length - 1);

  return (
    <Screen>
      <Container narrow>
        <Header title="Track Order" subtitle={`#${order.reference}`} onBack={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/profile'))} />
      </Container>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Container narrow className="gap-5 pt-2">
          <Reveal index={0} className="flex-row items-center gap-3 rounded-[28px] bg-white p-3.5" style={shadow.card}>
            <OrderThumbs lines={order.lines} />
            <View className="flex-1">
              <Text className="font-body-semibold">
                {units} item{units === 1 ? '' : 's'} · {formatNaira(order.totals.total)}
              </Text>
              <Text variant="caption">{order.delivery.eta}</Text>
            </View>
            <Badge label={statusLabel[order.status]} />
          </Reveal>

          <Reveal index={1}>
            <RouteMap progress={progress} />
          </Reveal>

          <Reveal index={2} className="rounded-[28px] bg-white p-5" style={shadow.card}>
            <OrderTimeline order={order} />
          </Reveal>

          {order.rider && (
            <Reveal index={3}>
              <RiderCard rider={order.rider} />
            </Reveal>
          )}
        </Container>
      </ScrollView>
    </Screen>
  );
}
