import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { PressableScale, Text } from '@/components/ui';
import { productSeed } from '@/data/catalog';
import { ProductArt } from '../art/ProductArt';
import { palette, shadow } from '@/theme';
import { campaign } from '../promo';
import { Countdown } from './Countdown';

/** Campaign hero: animated ribbon, live countdown, floating product. */
const heroArt = productSeed.find((p) => p.id === campaign.heroProductId)!.art;

export function PromoBanner() {
  const float = useSharedValue(0);
  const shine = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }), -1, true);
    shine.value = withRepeat(withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.quad) }), -1, false);
  }, [float, shine]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -8 * float.value }, { rotate: `${-4 + float.value * 4}deg` }],
  }));
  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -200 + shine.value * 700 }, { rotate: '20deg' }],
  }));

  return (
    <PressableScale scaleTo={0.98} onPress={() => router.push(`/product/${campaign.heroProductId}`)}>
      <View className="overflow-hidden rounded-[32px]" style={shadow.button}>
        <LinearGradient colors={[palette.rose[400], palette.rose[600]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View className="min-h-[178px] flex-row">
            <View className="flex-1 justify-between gap-3 p-5 pr-0">
              <View>
                <View className="self-start rounded-full bg-white px-2.5 py-1">
                  <Text numberOfLines={1} className="font-body-semibold text-[10px] uppercase tracking-[1.2px] text-rose-600">
                    {campaign.name} · {campaign.dates}
                  </Text>
                </View>
                <Text className="font-display-bold mt-2.5 text-[28px] leading-8 text-white">{campaign.headline}</Text>
                <Text className="mt-1 text-xs text-white/90">{campaign.body}</Text>
              </View>
              <Countdown endsAt={campaign.endsAt} />
              <View className="flex-row items-center gap-1.5 self-start rounded-full bg-white px-4 py-2">
                <Text className="font-body-semibold text-xs text-rose-600">Shop now</Text>
                <ArrowRight size={14} color={palette.rose[600]} />
              </View>
            </View>
            <Animated.View style={[{ width: '46%', alignItems: 'center', justifyContent: 'center' }, floatStyle]}>
              <View className="absolute h-36 w-36 rounded-full bg-white/20" />
              <ProductArt art={heroArt} size={170} backdrop="none" />
            </Animated.View>
          </View>
        </LinearGradient>
        <Animated.View pointerEvents="none" style={[{ position: 'absolute', top: -40, height: 300, width: 64, backgroundColor: 'rgba(255,255,255,0.15)' }, shineStyle]} />
      </View>
    </PressableScale>
  );
}
