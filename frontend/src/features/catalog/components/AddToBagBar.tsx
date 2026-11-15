import { LinearGradient } from 'expo-linear-gradient';
import { Check, ShoppingBag } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appear } from '@/components/motion/Appear';
import { PressableScale, QuantityStepper, Text } from '@/components/ui';
import { formatNaira } from '@/lib/format';
import { gradients, palette, shadow } from '@/theme';

interface Props {
  unitPrice: number;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAdd: () => void;
}

/** Sticky footer: quantity + Add to Bag, which morphs into a confirmation. */
export function AddToBagBar({ unitPrice, quantity, onQuantityChange, onAdd }: Props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const press = () => {
    onAdd();
    setAdded(true);
  };

  return (
    <View className="flex-row items-center gap-3 rounded-full bg-white p-2" style={shadow.card}>
      <QuantityStepper value={quantity} onChange={onQuantityChange} />
      <View className="flex-1">
        <PressableScale onPress={press} disabled={added} style={added ? undefined : shadow.button}>
          <View className="overflow-hidden rounded-full">
            <LinearGradient
              colors={added ? [palette.plum[700], palette.plum[800]] : gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 999, paddingHorizontal: 16 }}
            >
              {added ? (
                <Appear key="added" preset="scale" duration={280} className="flex-row items-center gap-2">
                  <Check size={18} color={palette.white} strokeWidth={3} />
                  <Text className="font-body-semibold text-[15px] text-white">Added to bag</Text>
                </Appear>
              ) : (
                <Appear key="add" preset="fade" duration={240} className="flex-row items-center gap-2">
                  <ShoppingBag size={18} color={palette.white} />
                  <Text numberOfLines={1} className="font-body-semibold text-[15px] text-white">
                    Add · {formatNaira(unitPrice * quantity)}
                  </Text>
                </Appear>
              )}
            </LinearGradient>
          </View>
        </PressableScale>
      </View>
    </View>
  );
}
