import { useAudioPlayer } from 'expo-audio';
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ComponentRef, type ReactNode, type RefObject } from 'react';
import { View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { palette, shadow } from '@/theme';
import { useBagFx } from './bag-fx.store';

export interface Point {
  x: number;
  y: number;
}

type ViewRef = RefObject<ComponentRef<typeof View> | null>;

interface LaunchOptions {
  /** Where the item starts (window coordinates, usually the tapped button's centre). */
  from: Point;
  /** What flies — typically the product's packshot. */
  visual: ReactNode;
  /** Bag to land in; defaults to the floating bag. */
  target?: ViewRef;
  /** Runs when the item drops into the bag (add to cart here). */
  onLand?: () => void;
}

interface FlyContext {
  launch(options: LaunchOptions): void;
  /** The floating bag registers itself as the default landing spot. */
  floatingTarget: ViewRef;
}

const Ctx = createContext<FlyContext | null>(null);

const SIZE = 66;
const FLIGHT_MS = 680;

const measureCentre = (ref: ViewRef) =>
  new Promise<Point | null>((resolve) => {
    if (!ref.current) return resolve(null);
    ref.current.measureInWindow((x, y, w, h) => resolve(w || h ? { x: x + w / 2, y: y + h / 2 } : null));
  });

/**
 * "Throw it in the bag": a packshot arcs from the tapped button into the bag,
 * spins and shrinks as it drops, then the bag bounces and a soft pop plays.
 */
export function FlyToBagProvider({ children }: { children: ReactNode }) {
  const floatingTarget = useRef<ComponentRef<typeof View>>(null);
  const [flight, setFlight] = useState<{ from: Point; to: Point; visual: ReactNode } | null>(null);
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
    async ({ from, visual, target, onLand }: LaunchOptions) => {
      // Finish any flight still in the air so nothing is lost on rapid taps.
      if (pending.current) land();
      if (!target) useBagFx.getState().reveal();
      // Give the floating bag a frame to appear before measuring it.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      const to = (await measureCentre(target ?? floatingTarget)) ?? { x: from.x, y: from.y - 200 };

      pending.current = onLand;
      setFlight({ from, to, visual });
      t.value = 0;
      t.value = withTiming(1, { duration: FLIGHT_MS, easing: Easing.bezier(0.5, 0, 0.3, 1) }, (done) => {
        if (done) runOnJS(land)();
      });
    },
    [land, t],
  );

  const style = useAnimatedStyle(() => {
    if (!flight) return { opacity: 0 };
    const p = t.value;
    const { from, to } = flight;
    // Throw: rise first, then fall into the bag along a parabola.
    const lift = Math.min(160, Math.abs(to.x - from.x) * 0.4 + 90);
    const x = from.x + (to.x - from.x) * p;
    const y = from.y + (to.y - from.y) * p - Math.sin(Math.PI * p) * lift;
    return {
      opacity: p < 0.9 ? 1 : (1 - p) * 10,
      transform: [
        { translateX: x - SIZE / 2 },
        { translateY: y - SIZE / 2 },
        { scale: 1 - p * 0.68 },
        { rotate: `${p * 340}deg` },
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
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              borderWidth: 3,
              borderColor: palette.white,
              backgroundColor: palette.blush[100],
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            },
            shadow.card,
            style,
          ]}
        >
          {flight.visual}
        </Animated.View>
      )}
    </Ctx.Provider>
  );
}

export const useFlyToBag = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFlyToBag must be used inside FlyToBagProvider');
  return ctx;
};
