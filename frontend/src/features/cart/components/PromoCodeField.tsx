import { useMutation } from '@tanstack/react-query';
import { BadgePercent, X } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { PressableScale, Text } from '@/components/ui';
import { formatNaira } from '@/lib/format';
import { api } from '@/services';
import { palette } from '@/theme';
import { useCartStore } from '../cart.store';

export function PromoCodeField({ subtotal, discount }: { subtotal: number; discount: number }) {
  const promo = useCartStore((s) => s.promo);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const [code, setCode] = useState('');
  const validate = useMutation({
    mutationFn: () => api.promotions.validate(code, subtotal),
    onSuccess: (result) => {
      applyPromo({ code: result.code, description: result.description });
      setCode('');
    },
  });

  if (promo) {
    return (
      <Animated.View entering={FadeInDown.springify()} exiting={FadeOut} className="flex-row items-center gap-3 rounded-3xl border border-dashed border-rose-300 bg-blush-100 px-4 py-3">
        <BadgePercent size={20} color={palette.rose[500]} />
        <View className="flex-1">
          <Text className="font-body-semibold tracking-[2px] text-rose-600">{promo.code}</Text>
          <Text variant="caption">
            Applied — you save {formatNaira(discount)}
          </Text>
        </View>
        <Pressable onPress={() => applyPromo(null)} hitSlop={10} accessibilityLabel="Remove promo code">
          <X size={18} color={palette.muted} />
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View>
      <View className="h-14 flex-row items-center gap-3 rounded-3xl border border-dashed border-blush-400 bg-white pl-4 pr-1.5">
        <BadgePercent size={18} color={palette.muted} />
        <TextInput
          value={code}
          onChangeText={(t) => setCode(t.toUpperCase())}
          placeholder="Promo code (try BLACKFRIDAY)"
          placeholderTextColor={palette.muted}
          autoCapitalize="characters"
          className="h-full flex-1 font-body-semibold text-[13px] tracking-[1px] text-ink"
          style={{ outlineStyle: 'none' } as object}
          onSubmitEditing={() => code && validate.mutate()}
        />
        <PressableScale
          disabled={!code || validate.isPending}
          onPress={() => validate.mutate()}
          className="h-11 items-center justify-center rounded-full bg-plum-800 px-5"
        >
          {validate.isPending ? <ActivityIndicator color={palette.white} size="small" /> : <Text className="font-body-semibold text-xs text-white">Apply</Text>}
        </PressableScale>
      </View>
      {validate.error && (
        <Animated.View entering={FadeInDown}>
          <Text className="ml-4 mt-1.5 text-xs text-rose-600">{validate.error.message}</Text>
        </Animated.View>
      )}
    </View>
  );
}
