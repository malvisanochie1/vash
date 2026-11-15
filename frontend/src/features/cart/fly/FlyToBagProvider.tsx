import { useAudioPlayer } from 'expo-audio';
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ComponentRef, type ReactNode, type RefObject } from 'react';
import { View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme';
import { useBagFx } from './bag-fx.store';
import { FloatingBag } from './FloatingBag';

export interface Point {
  x: number;
  y: number;
}

type ViewRef = RefObject<ComponentRef<typeof View> | null>;

interface LaunchOptions {
  /** Where the flight starts, in window coordinates (centre of the Add button). */
  from: Point;
  /** Small round picture of the product that flies. */
  visual: ReactNode;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
  /** Runs when the product drops into the bag (add to cart here). */
  onLand?: () => void;
}

interface FlyContext {
  launch(options: LaunchOptions): void;
  floatingTarget: ViewRef;
}

const Ctx = createContext<FlyContext | null>(null);

/** Size of the flying thumbnail. */
export const THUMB = 46;
const FLIGHT_MS = 900;

const measureCentre = (ref: ViewRef) =>
  new Promise<Point | null>((resolve) => {
    if (!ref.current) return resolve(null);
    ref.current.measureInWindow((x, y, width, height) => resolve(width ? { x: x + width / 2, y: y + height / 2 } : null));
  });

/**
 * A small round picture of the product pops out of the Add button, glides up
 * along a soft arc and drops into the bag, which swells as it lands.
 *
 * Android notes: the flying view is mounted once and stays mounted (views
 * mounted on tap inside an overlay were not drawn), and the worklet reads
 * only numbers from shared values.
 */
export function FlyToBagProvider({ children }: { children: ReactNode }) {
  const floatingTarget = useRef<ComponentRef<typeof View>>(null);
  const [visual, setVisual] = useState<ReactNode>(null);
  const pending = useRef<(() => void) | undefined>(undefined);
  const t = useSharedValue(0);
  const x0 = useSharedValue(0);
  const y0 = useSharedValue(0);
  const x1 = useSharedValue(0);
  const y1 = useSharedValue(0);
  const drop = useAudioPlayer(require('@assets/sounds/drop.wav'));

  const land = useCallback(() => {
    pending.current?.();
    pending.current = undefined;
    useBagFx.getState().land();
    try {
      drop.seekTo(0);
      drop.play();
    } catch {
      // Sound is a nicety — never let it break adding to the bag.
    }
  }, [drop]);

  const launch = useCallback(
    async ({ from, visual: picture, target, onLand }: LaunchOptions) => {
      if (pending.current) land();
      const bag = await measureCentre(target ?? floatingTarget);
      pending.current = onLand;
      setVisual(picture);
      x0.value = from.x;
      y0.value = from.y;
      x1.value = bag?.x ?? from.x;
      y1.value = bag?.y ?? 60;
      t.value = 0;
      t.value = withTiming(1, { duration: FLIGHT_MS, easing: Easing.bezier(0.45, 0, 0.25, 1) }, (done) => {
        if (done) runOnJS(land)();
      });
    },
    [land, t, x0, y0, x1, y1],
  );

  const style = useAnimatedStyle(() => {
    const k = t.value;
    if (k <= 0 || k >= 1) return { opacity: 0, transform: [{ translateX: -200 }, { translateY: -200 }, { scale: 0 }] };
    // Quadratic curve whose control point sits above both ends: a soft arc.
    const cx = x0.value + (x1.value - x0.value) * 0.2;
    const cy = Math.min(y0.value, y1.value) - 80;
    const x = (1 - k) * (1 - k) * x0.value + 2 * (1 - k) * k * cx + k * k * x1.value;
    const y = (1 - k) * (1 - k) * y0.value + 2 * (1 - k) * k * cy + k * k * y1.value;
    // Pop out (0 → 1.1), cruise, then shrink into the bag.
    const appear = Math.min(k / 0.18, 1);
    const sink = Math.max(0, (k - 0.82) / 0.18);
    const scale = (0.3 + 0.8 * (1 - Math.pow(1 - appear, 3))) * (1 - 0.65 * sink);
    return {
      opacity: 1 - 0.6 * sink,
      transform: [{ translateX: x - THUMB / 2 }, { translateY: y - THUMB / 2 }, { scale }],
    };
  });

  const value = useMemo(() => ({ launch, floatingTarget }), [launch]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Animated.View
        pointerEvents="none"
        collapsable={false}
        style={[
          {
            position: 'absolute',
            left: 0,
            top: 0,
            width: THUMB,
            height: THUMB,
            borderRadius: THUMB / 2,
            borderWidth: 2,
            borderColor: palette.white,
            backgroundColor: palette.blush[100],
            overflow: 'hidden',
            zIndex: 105,
            elevation: 35,
          },
          style,
        ]}
      >
        {visual}
      </Animated.View>
      {/* Drawn after (above) the flying picture, so it visibly drops inside. */}
      <FloatingBag targetRef={floatingTarget} />
    </Ctx.Provider>
  );
}

export const useFlyToBag = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFlyToBag must be used inside FlyToBagProvider');
  return ctx;
};
