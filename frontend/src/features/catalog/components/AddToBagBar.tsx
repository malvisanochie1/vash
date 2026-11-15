import { LinearGradient } from 'expo-linear-gradient';
import { Check, ShoppingBag } from 'lucide-react-native';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { PressableScale, QuantityStepper, Text } from '@/components/ui';
import { formatNaira } from '@/lib/format';
import { gradients, palette, shadow } from '@/theme';
import type { Point } from '@/features/cart/components/FlyToBag';

interface Props {
  unitPrice: number;
  quantity: number;
  onQuantityChange: (q: number) => void;
  /** Receives the button's centre so the fly animation can start there. */
  onAdd: (origin: Point) => void;
}

/** Sticky footer: quantity + Add to Bag, which morphs into a confirmation. */
export function AddToBagBar({ unitPrice, quantity, onQuantityChange, onAdd }: Props) {
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<ComponentRef<typeof View>>(null);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const press = () => {
    buttonRef.current?.measureInWindow((x, y, w, h) => onAdd({ x: x + w / 2, y: y + h / 2 }));
    setAdded(true);
  };

  return (
    <View className="flex-row items-center gap-3 rounded-full bg-white p-2" style={shadow.card}>
      <QuantityStepper value={quantity} onChange={onQuantityChange} />
      <Animated.View layout={LinearTransition.springify()} className="flex-1">
        <PressableScale onPress={press} disabled={added} style={added ? undefined : shadow.button}>
          <View ref={buttonRef} collapsable={false} className="overflow-hidden rounded-full">
            <LinearGradient
              colors={added ? [palette.plum[700], palette.plum[800]] : gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-[52px] flex-row items-center justify-center gap-2 rounded-full px-4"
            >
              {added ? (
                <Animated.View key="added" entering={ZoomIn.springify().damping(12)} exiting={FadeOut} className="flex-row items-center gap-2">
                  <Check size={18} color={palette.white} strokeWidth={3} />
                  <Text className="font-body-semibold text-[15px] text-white">Added to bag</Text>
                </Animated.View>
              ) : (
                <Animated.View key="add" entering={FadeIn} className="flex-row items-center gap-2">
                  <ShoppingBag size={18} color={palette.white} />
                  <Text numberOfLines={1} className="font-body-semibold text-[15px] text-white">
                    Add · {formatNaira(unitPrice * quantity)}
                  </Text>
                </Animated.View>
              )}
            </LinearGradient>
          </View>
        </PressableScale>
      </Animated.View>
    </View>
  );
}
