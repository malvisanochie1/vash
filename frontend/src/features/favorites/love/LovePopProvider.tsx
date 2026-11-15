import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';
import { Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';

const Ctx = createContext<{ pop(point: { x: number; y: number }): void } | null>(null);

/** Box each pop is drawn in; the heart sits at its centre. */
const BOX = 220;
const DURATION = 1900;
/** A few pops can overlap when hearts are tapped quickly. */
const SLOTS = 3;
const MINI = ['💕', '💖', '💗', '💞', '💓', '💗'];

/**
 * Why it is built this way (Android):
 * - Every pop view is mounted once at start-up and never mounted on tap.
 *   Views mounted mid-gesture inside an overlay were not drawn on Android.
 * - Every view has a real size and `collapsable={false}`, so Android can't
 *   optimise it away.
 * - The worklets only read numbers (shared values), never React objects.
 */
function MiniHeart({ t, index }: { t: SharedValue<number>; index: number }) {
  const angle = -Math.PI / 2 + (index - (MINI.length - 1) / 2) * 0.55;
  const distance = 62 + (index % 3) * 16;
  const style = useAnimatedStyle(() => {
    const p = Math.min(1, Math.max(0, (t.value - 0.06 - index * 0.025) / 0.7));
    const ease = 1 - Math.pow(1 - p, 3);
    return {
      opacity: p <= 0 || p >= 1 ? 0 : p < 0.6 ? Math.min(1, p * 4) : (1 - p) / 0.4,
      transform: [
        { translateX: Math.cos(angle) * distance * ease },
        { translateY: Math.sin(angle) * distance * ease - 24 * ease },
        { scale: 0.6 + 0.6 * ease },
      ],
    };
  });
  return (
    <Animated.View
      collapsable={false}
      style={[{ position: 'absolute', left: BOX / 2 - 14, top: BOX / 2 - 14, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      <Text style={{ fontSize: 20, lineHeight: 26 }}>{MINI[index]}</Text>
    </Animated.View>
  );
}

function PopSlot({ t, x, y }: { t: SharedValue<number>; x: SharedValue<number>; y: SharedValue<number> }) {
  const box = useAnimatedStyle(() => ({
    opacity: t.value > 0 && t.value < 1 ? 1 : 0,
    transform: [{ translateX: x.value - BOX / 2 }, { translateY: y.value - BOX / 2 }],
  }));
  const big = useAnimatedStyle(() => {
    const p = t.value;
    // Grow softly from nothing, rest a moment, then float up and fade.
    const grow = Math.min(p / 0.28, 1);
    const scale = 0.2 + 0.95 * (1 - Math.pow(1 - grow, 3)) - 0.15 * Math.max(0, Math.min((p - 0.28) / 0.25, 1));
    const drift = Math.max(0, (p - 0.45) / 0.55);
    return {
      opacity: p < 0.72 ? Math.min(1, p * 6) : (1 - p) / 0.28,
      transform: [{ translateY: -80 * drift * drift }, { scale }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      collapsable={false}
      style={[{ position: 'absolute', left: 0, top: 0, width: BOX, height: BOX, zIndex: 130, elevation: 60 }, box]}
    >
      {MINI.map((_, i) => (
        <MiniHeart key={i} t={t} index={i} />
      ))}
      <Animated.View
        collapsable={false}
        style={[{ position: 'absolute', left: BOX / 2 - 48, top: BOX / 2 - 48, width: 96, height: 96, alignItems: 'center', justifyContent: 'center' }, big]}
      >
        <Text style={{ fontSize: 64, lineHeight: 80 }}>❤️</Text>
      </Animated.View>
    </Animated.View>
  );
}

function useSlot() {
  return { t: useSharedValue(0), x: useSharedValue(0), y: useSharedValue(0) };
}

/** Love pops live above every screen. Call `pop({ x, y })` with a point in window coordinates. */
export function LovePopProvider({ children }: { children: ReactNode }) {
  const slots = [useSlot(), useSlot(), useSlot()];
  const slotsRef = useRef(slots);
  const next = useRef(0);

  const pop = useCallback((point: { x: number; y: number }) => {
    const slot = slotsRef.current[next.current % SLOTS]!;
    next.current += 1;
    slot.x.value = point.x;
    slot.y.value = point.y;
    slot.t.value = 0.0001;
    slot.t.value = withTiming(1, { duration: DURATION, easing: Easing.linear });
  }, []);
  const value = useMemo(() => ({ pop }), [pop]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {slots.map((s, i) => (
        <PopSlot key={i} t={s.t} x={s.x} y={s.y} />
      ))}
    </Ctx.Provider>
  );
}

export const useLovePop = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLovePop must be used inside LovePopProvider');
  return ctx.pop;
};
