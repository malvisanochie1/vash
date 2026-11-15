import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';
import { EmptyState } from '@/components/layout/EmptyState';
import { Screen } from '@/components/layout/Screen';
import { TabScroll } from '@/components/layout/TabScroll';
import { Reveal } from '@/components/motion/Reveal';
import { Button, SummaryRow, Text } from '@/components/ui';
import { BagItem } from '@/features/cart/components/BagItem';
import { PromoCodeField } from '@/features/cart/components/PromoCodeField';
import { useCartLines } from '@/features/cart/use-cart-lines';
import { usePromoDiscount } from '@/features/cart/use-promo';
import { useResponsive } from '@/hooks/use-responsive';
import { formatNaira } from '@/lib/format';
import { shadow } from '@/theme';

export default function Bag() {
  const { lines, subtotal, savings } = useCartLines();
  const { discount } = usePromoDiscount(subtotal);
  const { isTablet } = useResponsive();
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const total = subtotal - discount;

  if (!lines.length) {
    return (
      <Screen>
        <TabScroll floatingBag={false}>
          <Reveal className="pt-3">
            <Text variant="title">My Bag</Text>
          </Reveal>
          <EmptyState
            title="Your bag is feeling light"
            body="Add your wash-day favourites and they'll wait for you here."
            action={<Button title="Start shopping" onPress={() => router.push('/(tabs)/shop')} />}
          />
        </TabScroll>
      </Screen>
    );
  }

  const summary = (
    <View className="gap-4">
      <PromoCodeField subtotal={subtotal} discount={discount} />
      <View className="gap-2.5 rounded-[28px] bg-white p-5" style={shadow.card}>
        <SummaryRow label="Subtotal" value={formatNaira(subtotal)} />
        {savings > 0 && <SummaryRow label="Black Friday savings" value={`-${formatNaira(savings)}`} tone="positive" />}
        {discount > 0 && <SummaryRow label="Promo" value={`-${formatNaira(discount)}`} tone="positive" />}
        <SummaryRow label="Delivery" value="At checkout" />
        <SummaryRow label="Total" value={formatNaira(total)} emphasis />
      </View>
      <Button title={`Checkout · ${formatNaira(total)}`} trailingIcon={ArrowRight} onPress={() => router.push('/checkout')} />
    </View>
  );

  return (
    <Screen>
      <TabScroll floatingBag={false}>
        <Reveal className="mb-5 pt-3">
          <Text variant="title">My Bag</Text>
          <Text variant="caption">
            {count} item{count === 1 ? '' : 's'}
          </Text>
        </Reveal>
        <View className={isTablet ? 'flex-row items-start gap-8' : 'gap-6'}>
          <View className={isTablet ? 'flex-[1.4] gap-3' : 'gap-3'}>
            {lines.map((line, index) => (
              <BagItem key={`${line.productId}-${line.variantId}`} line={line} index={index} />
            ))}
          </View>
          <Reveal index={2} className={isTablet ? 'flex-1' : undefined}>
            {summary}
          </Reveal>
        </View>
      </TabScroll>
    </Screen>
  );
}
