import { useCallback, useState, type ReactNode } from 'react';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme';

export interface Point {
  x: number;
  y: number;
}

interface Flight {
  from: Point;
  to: Point;
  visual: ReactNode;
}

const SIZE = 64;

/**
 * "Fly to bag": a product thumbnail arcs from the Add button into the bag icon.
 * Returns the overlay to render and a `launch` function.
 */
export function useFlyToBag(onLand?: () => void) {
  const [flight, setFlight] = useState<Flight | null>(null);
  const t = useSharedValue(0);

  const land = useCallback(() => {
    setFlight(null);
    onLand?.();
  }, [onLand]);

  const launch = useCallback(
    (next: Flight) => {
      setFlight(next);
      t.value = 0;
      t.value = withTiming(1, { duration: 780, easing: Easing.bezier(0.45, 0, 0.2, 1) }, (done) => {
        if (done) runOnJS(land)();
      });
    },
    [land, t],
  );

  const style = useAnimatedStyle(() => {
    if (!flight) return { opacity: 0 };
    const p = t.value;
    const x = flight.from.x + (flight.to.x - flight.from.x) * p;
    // Parabolic lift so the item arcs up before dropping into the bag.
    const y = flight.from.y + (flight.to.y - flight.from.y) * p - Math.sin(Math.PI * p) * 140;
    return {
      opacity: p < 0.92 ? 1 : (1 - p) * 12,
      transform: [
        { translateX: x - SIZE / 2 },
        { translateY: y - SIZE / 2 },
        { scale: 1 - p * 0.65 },
        { rotate: `${p * 300}deg` },
      ],
    };
  });

  const overlay = flight ? (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 50,
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          borderWidth: 3,
          borderColor: palette.white,
          backgroundColor: palette.blush[200],
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {flight.visual}
    </Animated.View>
  ) : null;

  return { overlay, launch };
}
