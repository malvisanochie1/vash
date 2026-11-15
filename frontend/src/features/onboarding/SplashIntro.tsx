import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '@/components/ui';
import { Monogram } from '@/components/brand/Monogram';
import { brand } from '@/config/brand';
import { gradients, palette } from '@/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const SIZE = 210;
const RADIUS = 98;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION = 2600;

function Sparkle({ x, y, delay, size = 10 }: { x: number; y: number; delay: number; size?: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(delay, withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }), -1, true));
  }, [delay, t]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.25 + t.value * 0.75,
    transform: [{ translateY: -t.value * 6 }, { rotate: `${t.value * 90}deg` }, { scale: 0.7 + t.value * 0.4 }],
  }));
  return (
    <Animated.Text className="absolute text-rose-400" style={[{ left: x, top: y, fontSize: size }, style]}>
      ✦
    </Animated.Text>
  );
}

/** Brand intro: the seal's ring draws itself, logo blooms, tagline settles. */
export function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const ring = useSharedValue(0);
  const logo = useSharedValue(0);
  const tagline = useSharedValue(0);
  const bar = useSharedValue(0);
  const exit = useSharedValue(0);

  useEffect(() => {
    ring.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) });
    logo.value = withDelay(350, withSpring(1, { damping: 12, stiffness: 120 }));
    tagline.value = withDelay(900, withTiming(1, { duration: 700 }));
    bar.value = withDelay(500, withTiming(1, { duration: DURATION - 700, easing: Easing.inOut(Easing.quad) }));
    exit.value = withDelay(
      DURATION,
      withSequence(
        withTiming(1, { duration: 380, easing: Easing.in(Easing.quad) }, (done) => {
          if (done) runOnJS(onFinish)();
        }),
      ),
    );
  }, [bar, exit, logo, onFinish, ring, tagline]);

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: CIRCUMFERENCE * (1 - ring.value) }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logo.value,
    transform: [{ scale: 0.6 + logo.value * 0.4 }, { rotate: `${(1 - logo.value) * -20}deg` }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: tagline.value,
    letterSpacing: 2 + tagline.value * 4,
    transform: [{ translateY: (1 - tagline.value) * 12 }],
  }));
  const barStyle = useAnimatedStyle(() => ({ width: `${bar.value * 100}%` }));
  const exitStyle = useAnimatedStyle(() => ({
    opacity: 1 - exit.value,
    transform: [{ scale: 1 + exit.value * 0.06 }],
  }));

  return (
    <View className="flex-1">
      <LinearGradient colors={[palette.white, palette.blush[200]]} className="absolute inset-0" />
      <Animated.View className="flex-1 items-center justify-center" style={exitStyle}>
        <View style={{ width: SIZE, height: SIZE }} className="items-center justify-center">
          <Svg width={SIZE} height={SIZE} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
            <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke={palette.blush[300]} strokeWidth={1} fill="none" />
            <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={palette.rose[500]}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={ringProps}
            />
          </Svg>
          <Animated.View style={logoStyle}>
            <Monogram size={140} />
          </Animated.View>
          <Sparkle x={-6} y={28} delay={200} size={14} />
          <Sparkle x={SIZE - 4} y={SIZE - 46} delay={600} />
          <Sparkle x={SIZE - 30} y={4} delay={900} size={8} />
        </View>

        <Animated.View style={taglineStyle} className="mt-10 items-center">
          <Text className="font-display-bold text-[26px] text-rose-600">{brand.wordmark}</Text>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(1200)} className="mt-1">
          <Text className="font-display-italic text-[15px] text-muted">{brand.tagline}</Text>
        </Animated.View>
      </Animated.View>

      <View className="absolute bottom-16 self-center h-[3px] w-24 overflow-hidden rounded-full bg-blush-300">
        <Animated.View style={barStyle} className="h-full rounded-full">
          <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-full" />
        </Animated.View>
      </View>
    </View>
  );
}
