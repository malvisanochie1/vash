import { Heart } from 'lucide-react-native';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme';

interface Pop {
  id: number;
  x: number;
  y: number;
}

const Ctx = createContext<{ pop(point: { x: number; y: number }): void } | null>(null);

const EASE = Easing.bezier(0.22, 1, 0.36, 1);
const MINI = ['💕', '💖', '💗', '💞', '💓', '💗', '💕'];
const BIG = 76;

function MiniHeart({ index, total }: { index: number; total: number }) {
  const t = useSharedValue(0);
  const angle = -Math.PI / 2 + (index - (total - 1) / 2) * 0.5;
  const distance = 70 + (index % 3) * 18;
  useEffect(() => {
    t.value = withDelay(120 + index * 40, withTiming(1, { duration: 1200, easing: EASE }));
  }, [index, t]);
  const style = useAnimatedStyle(() => ({
    opacity: t.value < 0.65 ? Math.min(1, t.value * 4) : (1 - t.value) / 0.35,
    transform: [
      { translateX: Math.cos(angle) * distance * t.value },
      { translateY: Math.sin(angle) * distance * t.value - 30 * t.value },
      { scale: 0.5 + 0.7 * t.value },
    ],
  }));
  return (
    <Animated.View style={[{ position: 'absolute' }, style]}>
      <Text style={{ fontSize: 18 }}>{MINI[index % MINI.length]}</Text>
    </Animated.View>
  );
}

/** One love moment: a big heart pops up and floats away, surrounded by little hearts. */
function LovePop({ pop, onDone }: { pop: Pop; onDone: (id: number) => void }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withTiming(1, { duration: 1500, easing: Easing.linear }, (done) => {
      if (done) runOnJS(onDone)(pop.id);
    });
  }, [onDone, pop.id, t]);

  const big = useAnimatedStyle(() => {
    const p = t.value;
    // 0–0.25: pop up from nothing with a soft overshoot; then drift up and fade.
    const grow = Math.min(p / 0.25, 1);
    const popScale = grow < 1 ? 1.25 * (1 - Math.pow(1 - grow, 3)) : 1.25 - 0.25 * Math.min((p - 0.25) / 0.2, 1);
    const drift = Math.max(0, (p - 0.35) / 0.65);
    return {
      opacity: p < 0.7 ? 1 : (1 - p) / 0.3,
      transform: [{ translateY: -90 * (1 - Math.pow(1 - drift, 2)) }, { scale: popScale }],
    };
  });

  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: pop.x, top: pop.y, alignItems: 'center', justifyContent: 'center' }}>
      {MINI.map((_, i) => (
        <MiniHeart key={i} index={i} total={MINI.length} />
      ))}
      <Animated.View style={[{ position: 'absolute', width: BIG, height: BIG, alignItems: 'center', justifyContent: 'center' }, big]}>
        <Heart size={BIG} color={palette.rose[500]} fill={palette.rose[500]} strokeWidth={1.2} />
      </Animated.View>
    </View>
  );
}

/**
 * Screen-level overlay so love pops are never clipped by cards or lists.
 * Call `pop({ x, y })` with the heart's position in window coordinates.
 */
export function LovePopProvider({ children }: { children: ReactNode }) {
  const [pops, setPops] = useState<Pop[]>([]);
  const remove = useCallback((id: number) => setPops((list) => list.filter((p) => p.id !== id)), []);
  const pop = useCallback((point: { x: number; y: number }) => {
    setPops((list) => [...list.slice(-2), { id: Date.now() + Math.random(), ...point }]);
  }, []);
  const value = useMemo(() => ({ pop }), [pop]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 120 }}>
        {pops.map((p) => (
          <LovePop key={p.id} pop={p} onDone={remove} />
        ))}
      </View>
    </Ctx.Provider>
  );
}

export const useLovePop = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLovePop must be used inside LovePopProvider');
  return ctx.pop;
};
