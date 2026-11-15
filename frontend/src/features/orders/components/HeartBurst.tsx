import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme';

const GLYPHS = ['♥', '✦', '♥', '•'];
const COLORS = [palette.rose[400], palette.rose[300], palette.rose[600], palette.blush[400]];

interface Particle {
  angle: number;
  distance: number;
  size: number;
  delay: number;
  spin: number;
  glyph: string;
  color: string;
}

function Piece({ p }: { p: Particle }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(p.delay, withTiming(1, { duration: 1600, easing: Easing.out(Easing.cubic) }));
  }, [p.delay, t]);

  const style = useAnimatedStyle(() => {
    const dx = Math.cos(p.angle) * p.distance * t.value;
    // Burst outward, then gravity pulls the confetti down.
    const dy = Math.sin(p.angle) * p.distance * t.value + 160 * t.value * t.value;
    return {
      opacity: t.value < 0.75 ? 1 : (1 - t.value) * 4,
      transform: [{ translateX: dx }, { translateY: dy }, { rotate: `${p.spin * t.value}deg` }, { scale: 0.4 + t.value * 0.8 }],
    };
  });

  return (
    <Animated.Text className="absolute" style={[{ fontSize: p.size, color: p.color }, style]}>
      {p.glyph}
    </Animated.Text>
  );
}

/** Celebration: hearts and sparkles burst from the centre. */
export function HeartBurst({ count = 28, delay = 0 }: { count?: number; delay?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (Math.PI * 2 * i) / count + Math.random() * 0.4,
        distance: 110 + Math.random() * 150,
        size: 12 + Math.random() * 14,
        delay: delay + Math.random() * 180,
        spin: -180 + Math.random() * 360,
        glyph: GLYPHS[i % GLYPHS.length]!,
        color: COLORS[i % COLORS.length]!,
      })),
    [count, delay],
  );

  return (
    <View pointerEvents="none" className="absolute items-center justify-center">
      {particles.map((p, i) => (
        <Piece key={i} p={p} />
      ))}
    </View>
  );
}
