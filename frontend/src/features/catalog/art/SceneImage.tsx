import { Image } from 'expo-image';
import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { scenes, type SceneKey } from '@/lib/product-images';

interface Props {
  scene: SceneKey;
  size: number;
  /** Gentle bob, for hero spots. */
  float?: boolean;
}

/** A grouped product shot, optionally floating softly in place. */
export function SceneImage({ scene, size, float = true }: Props) {
  const t = useSharedValue(0);
  useEffect(() => {
    if (float) t.value = withRepeat(withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.sin) }), -1, true);
  }, [float, t]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: -size * 0.025 * t.value }] }));

  return (
    <Animated.View style={style} renderToHardwareTextureAndroid>
      <Image source={scenes[scene]} style={{ width: size, height: size }} contentFit="contain" transition={250} />
    </Animated.View>
  );
}
