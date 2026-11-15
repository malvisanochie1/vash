import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { gradients, palette, shadow } from '@/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const CHECK_LENGTH = 60;

/** Pink seal pops in, the check mark draws itself, and a soft halo pulses. */
export function SuccessBadge({ size = 120 }: { size?: number }) {
  const pop = useSharedValue(0);
  const draw = useSharedValue(0);
  const halo = useSharedValue(0);

  useEffect(() => {
    pop.value = withSpring(1, { damping: 10, stiffness: 140 });
    draw.value = withDelay(350, withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }));
    halo.value = withDelay(600, withRepeat(withTiming(1, { duration: 1800, easing: Easing.out(Easing.quad) }), -1));
  }, [draw, halo, pop]);

  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: pop.value }] }));
  const haloStyle = useAnimatedStyle(() => ({ opacity: 0.5 * (1 - halo.value), transform: [{ scale: 1 + halo.value * 0.7 }] }));
  const checkProps = useAnimatedProps(() => ({ strokeDashoffset: CHECK_LENGTH * (1 - draw.value) }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[{ position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: palette.rose[300] }, haloStyle]} />
      <Animated.View style={[{ borderRadius: size / 2, overflow: 'hidden' }, popStyle, shadow.button]}>
        <LinearGradient colors={gradients.primary} style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size * 0.45} height={size * 0.45} viewBox="0 0 48 48">
            <AnimatedPath
              d="M10 25 L20 35 L38 14"
              stroke={palette.white}
              strokeWidth={5.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={CHECK_LENGTH}
              animatedProps={checkProps}
            />
          </Svg>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
