import { router } from 'expo-router';
import { ChevronRight, HelpCircle, LogOut, MapPin, Package } from 'lucide-react-native';
import { View } from 'react-native';
import { Monogram } from '@/components/brand/Monogram';
import { Screen } from '@/components/layout/Screen';
import { TabScroll } from '@/components/layout/TabScroll';
import { Reveal } from '@/components/motion/Reveal';
import { Badge, PressableScale, Text, toast } from '@/components/ui';
import { useAuthStore } from '@/features/auth/auth.store';
import { useCartStore } from '@/features/cart/cart.store';
import { OrderThumbs } from '@/features/orders/components/OrderThumbs';
import { statusLabel } from '@/features/orders/order-status';
import { useOrders } from '@/features/orders/use-orders';
import { formatNaira } from '@/lib/format';
import { palette, shadow } from '@/theme';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const clearCart = useCartStore((s) => s.clear);
  const { data: orders = [] } = useOrders();

  const menu = [
    { icon: MapPin, label: 'Delivery addresses' },
    { icon: HelpCircle, label: 'Help & support' },
  ];

  return (
    <Screen>
      <TabScroll floatingBag={false}>
        <Reveal className="items-center pt-6">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-blush-200">
            <Text className="font-display-bold text-4xl text-rose-600">{user?.name.charAt(0) ?? 'V'}</Text>
          </View>
          <Text variant="title" className="mt-3">
            {user?.name}
          </Text>
          <Text variant="caption">{user?.email}</Text>
        </Reveal>

        <Reveal index={1} className="mt-8">
          <Text variant="heading" className="mb-3">
            My orders
          </Text>
          {orders.length ? (
            <View className="gap-3">
              {orders.map((order) => (
                <PressableScale
                  key={order.id}
                  scaleTo={0.98}
                  onPress={() => router.push(`/order/${order.id}/track`)}
                  className="flex-row items-center gap-3 rounded-[24px] bg-white p-3"
                  style={shadow.card}
                >
                  <OrderThumbs lines={order.lines} size={40} />
                  <View className="flex-1">
                    <Text className="font-body-semibold">#{order.reference}</Text>
                    <Text variant="caption">{formatNaira(order.totals.total)}</Text>
                  </View>
                  <Badge label={statusLabel[order.status]} />
                  <ChevronRight size={18} color={palette.muted} />
                </PressableScale>
              ))}
            </View>
          ) : (
            <View className="flex-row items-center gap-3 rounded-[24px] bg-white p-4" style={shadow.card}>
              <Package size={20} color={palette.rose[500]} />
              <Text className="text-muted">No orders yet — your first is waiting.</Text>
            </View>
          )}
        </Reveal>

        <Reveal index={2} className="mt-6 overflow-hidden rounded-[24px] bg-white" style={shadow.card}>
          {menu.map(({ icon: Icon, label }) => (
            <PressableScale
              key={label}
              scaleTo={0.99}
              onPress={() => toast.show({ title: `${label} is coming soon`, tone: 'info' })}
              className="flex-row items-center gap-3 border-b border-line px-4 py-4"
            >
              <Icon size={19} color={palette.rose[500]} />
              <Text className="flex-1">{label}</Text>
              <ChevronRight size={18} color={palette.muted} />
            </PressableScale>
          ))}
          <PressableScale
            scaleTo={0.99}
            onPress={() => {
              signOut();
              clearCart();
              router.replace('/login');
            }}
            className="flex-row items-center gap-3 px-4 py-4"
          >
            <LogOut size={19} color={palette.rose[600]} />
            <Text className="flex-1 font-body-semibold text-rose-600">Sign out</Text>
          </PressableScale>
        </Reveal>

        <Reveal index={3} className="mt-8 items-center opacity-60">
          <Monogram size={28} />
        </Reveal>
      </TabScroll>
    </Screen>
  );
}
