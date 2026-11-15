import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Monogram } from '@/components/brand/Monogram';
import { Text } from '@/components/ui';
import { brand } from '@/config/brand';
import { useResponsive } from '@/hooks/use-responsive';
import { EASE_OUT } from '@/components/motion/use-appear';
import { gradients, palette } from '@/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const DURATION = 2300;

function Sparkle({ left, top, delay, size = 10 }: { left: `${number}%`; top: `${number}%`; delay: number; size?: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(delay, withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }), -1, true));
  }, [delay, t]);
  const style = useAnimatedStyle(() => ({
    opacity: 0.25 + t.value * 0.75,
    transform: [{ translateY: -t.value * 6 }, { rotate: `${t.value * 90}deg` }, { scale: 0.7 + t.value * 0.4 }],
  }));
  return (
    <Animated.View style={[{ position: 'absolute', left, top }, style]}>
      <Text style={{ fontSize: size, color: palette.rose[400] }}>✦</Text>
    </Animated.View>
  );
}

/** Brand intro: the seal's ring draws itself, the monogram blooms, the name settles. */
export function SplashIntro({ onFinish }: { onFinish: () => void }) {
  const { width } = useResponsive();
  const size = Math.min(width * 0.52, 240);
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;

  const ring = useSharedValue(0);
  const logo = useSharedValue(0);
  const words = useSharedValue(0);
  const bar = useSharedValue(0);
  const exit = useSharedValue(0);

  useEffect(() => {
    ring.value = withTiming(1, { duration: 1100, easing: EASE_OUT });
    logo.value = withDelay(250, withSpring(1, { damping: 14, stiffness: 120 }));
    words.value = withDelay(700, withTiming(1, { duration: 600, easing: EASE_OUT }));
    bar.value = withDelay(300, withTiming(1, { duration: DURATION - 400, easing: Easing.inOut(Easing.quad) }));
    exit.value = withDelay(
      DURATION,
      withTiming(1, { duration: 320, easing: Easing.in(Easing.quad) }, (done) => {
        if (done) runOnJS(onFinish)();
      }),
    );
  }, [bar, exit, logo, onFinish, ring, words]);

  const ringProps = useAnimatedProps(() => ({ strokeDashoffset: circumference * (1 - ring.value) }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logo.value,
    transform: [{ scale: 0.7 + logo.value * 0.3 }, { rotate: `${(1 - logo.value) * -16}deg` }],
  }));
  const wordsStyle = useAnimatedStyle(() => ({ opacity: words.value, transform: [{ translateY: (1 - words.value) * 12 }] }));
  const barStyle = useAnimatedStyle(() => ({ width: `${bar.value * 100}%` }));
  const exitStyle = useAnimatedStyle(() => ({ opacity: 1 - exit.value, transform: [{ scale: 1 + exit.value * 0.05 }] }));

  return (
    <View className="flex-1">
      <LinearGradient colors={[palette.white, palette.blush[200]]} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.center, exitStyle]}>
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
            <Circle cx={size / 2} cy={size / 2} r={radius} stroke={palette.blush[300]} strokeWidth={1} fill="none" />
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={palette.rose[500]}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              animatedProps={ringProps}
            />
          </Svg>
          <Animated.View style={logoStyle}>
            <Monogram size={size * 0.68} />
          </Animated.View>
          <Sparkle left="-4%" top="12%" delay={200} size={14} />
          <Sparkle left="96%" top="74%" delay={600} />
          <Sparkle left="84%" top="2%" delay={900} size={8} />
        </View>

        <Animated.View style={[{ marginTop: '8%', alignItems: 'center' }, wordsStyle]}>
          <Text className="font-display-bold text-[28px] tracking-[6px] text-rose-600">{brand.wordmark}</Text>
          <Text className="font-display-italic mt-1 text-[15px] text-muted">{brand.tagline}</Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.track}>
        <Animated.View style={[{ height: '100%' }, barStyle]}>
          <LinearGradient colors={gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  track: {
    position: 'absolute',
    bottom: '8%',
    alignSelf: 'center',
    width: '24%',
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: palette.blush[300],
  },
});
