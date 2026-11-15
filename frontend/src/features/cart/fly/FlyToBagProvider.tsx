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

export interface Rect extends Point {
  width: number;
  height: number;
}

type ViewRef = RefObject<ComponentRef<typeof View> | null>;

interface LaunchOptions {
  /** The product's image frame on screen (window coordinates). */
  from: Rect;
  /** What flies — the product photo, rendered to fill the frame. */
  visual: ReactNode;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
  /** The product in flight (its card dims while it's away). */
  productId?: string;
  /** Runs when the product drops into the bag (add to cart here). */
  onLand?: () => void;
}

interface FlyContext {
  launch(options: LaunchOptions): void;
  floatingTarget: ViewRef;
}

const Ctx = createContext<FlyContext | null>(null);

const FLIGHT_MS = 1550;
/** First part of the flight: the product lifts gently out of its frame. */
const LIFT = 0.2;
/** Size the product has when it reaches the bag's mouth, before dropping in. */
const ARRIVAL_SIZE = 46;
/** Last part of the flight: the product sinks into the bag (which is drawn above it). */
const SINK = 0.16;

const measure = (ref: ViewRef) =>
  new Promise<Rect | null>((resolve) => {
    if (!ref.current) return resolve(null);
    ref.current.measureInWindow((x, y, width, height) => resolve(width || height ? { x, y, width, height } : null));
  });

/**
 * "Watch it go into the bag": the product photo lifts out of its card, then
 * glides along a soft arc into the bag, shrinking as it travels. The bag
 * swells as it lands and a soft pop plays.
 */
export function FlyToBagProvider({ children }: { children: ReactNode }) {
  const floatingTarget = useRef<ComponentRef<typeof View>>(null);
  const [flight, setFlight] = useState<{ from: Rect; to: Point; visual: ReactNode } | null>(null);
  const pending = useRef<(() => void) | undefined>(undefined);
  const t = useSharedValue(0);
  const drop = useAudioPlayer(require('@assets/sounds/drop.wav'));

  const land = useCallback(() => {
    pending.current?.();
    pending.current = undefined;
    setFlight(null);
    useBagFx.getState().land();
    try {
      drop.seekTo(0);
      drop.play();
    } catch {
      // Sound is a nicety — never let it break adding to the bag.
    }
  }, [drop]);

  const launch = useCallback(
    async ({ from, visual, target, productId, onLand }: LaunchOptions) => {
      if (pending.current) land();
      const bag = await measure(target ?? floatingTarget);
      const to = bag ? { x: bag.x + bag.width / 2, y: bag.y + bag.height / 2 } : { x: from.x + from.width, y: 40 };

      pending.current = onLand;
      useBagFx.getState().setFlying(productId ?? null);
      setFlight({ from, to, visual });
      t.value = 0;
      t.value = withTiming(1, { duration: FLIGHT_MS, easing: Easing.linear }, (done) => {
        if (done) runOnJS(land)();
      });
    },
    [land, t],
  );

  const style = useAnimatedStyle(() => {
    if (!flight) return { opacity: 0 };
    const { from, to } = flight;
    const p = t.value;
    const lift = Math.min(p / LIFT, 1);
    const travelEnd = 1 - SINK;
    const raw = Math.min(1, Math.max(0, (p - LIFT) / (travelEnd - LIFT)));
    const sink = Math.max(0, (p - travelEnd) / SINK);
    // Ease-in-out cubic: starts unhurried, glides, settles softly.
    const k = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
    const liftEase = 1 - Math.pow(1 - lift, 3);

    const x0 = from.x + from.width / 2;
    const y0 = from.y + from.height / 2;
    // Control point above both ends gives a graceful arc.
    const cx = x0 + (to.x - x0) * 0.25;
    const cy = Math.min(y0, to.y) - 120;
    const x = (1 - k) * (1 - k) * x0 + 2 * (1 - k) * k * cx + k * k * to.x;
    const y = (1 - k) * (1 - k) * y0 + 2 * (1 - k) * k * cy + k * k * to.y;

    const arrival = ARRIVAL_SIZE / from.width;
    // Travel: shrink to the bag's mouth. Sink: keep shrinking as it drops inside.
    const travelScale = (1 + 0.07 * liftEase * (1 - k)) * (1 - (1 - arrival) * k);
    const scale = travelScale * (1 - 0.75 * sink);

    return {
      opacity: 1,
      shadowOpacity: 0.25 * liftEase * (1 - k),
      transform: [
        { translateX: x - from.width / 2 },
        { translateY: y - from.height / 2 - 12 * liftEase * (1 - k) + 10 * sink },
        { scale },
        { rotate: `${-8 * k}deg` },
      ],
    };
  });

  const value = useMemo(() => ({ launch, floatingTarget }), [launch]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {flight && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 100,
              width: flight.from.width,
              height: flight.from.height,
              borderRadius: 24,
              backgroundColor: palette.blush[100],
              overflow: 'hidden',
              shadowColor: palette.plum[900],
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 10 },
              elevation: 30,
            },
            style,
          ]}
        >
          {flight.visual}
        </Animated.View>
      )}
      {/* Drawn after (above) the flying product, so it visibly drops inside. */}
      <FloatingBag targetRef={floatingTarget} />
    </Ctx.Provider>
  );
}

export const useFlyToBag = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFlyToBag must be used inside FlyToBagProvider');
  return ctx;
};
