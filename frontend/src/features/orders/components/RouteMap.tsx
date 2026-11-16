import { Bike, Home, Store } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';
import { palette } from '@/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** Route in a 320×180 map space. */
const ROUTE: [number, number][] = [
  [36, 150],
  [90, 150],
  [120, 112],
  [182, 112],
  [212, 66],
  [284, 40],
];

const segmentLengths = ROUTE.slice(1).map(([x, y], i) => Math.hypot(x - ROUTE[i]![0], y - ROUTE[i]![1]));
const TOTAL = segmentLengths.reduce((a, b) => a + b, 0);
const PATH = ROUTE.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

/** One ride from the store to the door, plus a short rest there, in ms. */
const RIDE_MS = 11000;

/**
 * Stylised city map. While the order is on its way the rider keeps riding
 * from the store to your door along the route, leaving a pink trail.
 */
export function RouteMap({ progress }: { progress: number }) {
  const [width, setWidth] = useState(0);
  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} style={{ width: '100%', aspectRatio: 320 / 180 }}>
      {width > 0 && <RouteMapCanvas progress={progress} width={width} />}
    </View>
  );
}

function RouteMapCanvas({ progress, width }: { progress: number; width: number }) {
  const height = width * (180 / 320);
  const scale = width / 320;
  const delivered = progress >= 1;
  const clock = useSharedValue(delivered ? 1 : 0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1600 }), -1);
  }, [pulse]);

  useEffect(() => {
    if (delivered) {
      clock.value = withTiming(1, { duration: 600 });
      return;
    }
    // A steady loop: ride out, rest at the door, then the next ride begins.
    clock.value = 0;
    clock.value = withRepeat(withTiming(1, { duration: RIDE_MS, easing: Easing.linear }), -1);
  }, [clock, delivered]);

  const lengths = useMemo(() => segmentLengths, []);

  // Where along the route the rider is (0 store → 1 door), with a soft start and stop.
  const ride = (c: number) => {
    'worklet';
    const p = Math.min(c / 0.82, 1);
    return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  };

  const routeProps = useAnimatedProps(() => ({ strokeDashoffset: TOTAL * (1 - ride(clock.value)) }));
  const riderStyle = useAnimatedStyle(() => {
    const c = clock.value;
    const at = ride(c);
    let remaining = at * TOTAL;
    let x = ROUTE[0]![0];
    let y = ROUTE[0]![1];
    for (let i = 0; i < lengths.length; i++) {
      const seg = lengths[i]!;
      const [x1, y1] = ROUTE[i]!;
      const [x2, y2] = ROUTE[i + 1]!;
      if (remaining <= seg) {
        const t = seg === 0 ? 0 : remaining / seg;
        x = x1 + (x2 - x1) * t;
        y = y1 + (y2 - y1) * t;
        break;
      }
      remaining -= seg;
      x = x2;
      y = y2;
    }
    // Fade in at the store, fade out after resting at the door; a gentle bob while riding.
    const opacity = delivered ? 1 : c < 0.04 ? c / 0.04 : c > 0.93 ? Math.max(0, (1 - c) / 0.07) : 1;
    const bob = at > 0 && at < 1 ? Math.sin(c * 90) * 1.2 : 0;
    return { opacity, transform: [{ translateX: x * scale - 17 }, { translateY: y * scale - 17 + bob }] };
  });
  const pulseStyle = useAnimatedStyle(() => ({ opacity: 1 - pulse.value, transform: [{ scale: 1 + pulse.value * 1.6 }] }));

  const [endX, endY] = ROUTE[ROUTE.length - 1]!;
  const [startX, startY] = ROUTE[0]!;

  return (
    <View style={{ width, height }} className="overflow-hidden rounded-3xl bg-blush-100">
      <Svg width={width} height={height} viewBox="0 0 320 180">
        {/* city blocks */}
        {[
          [10, 10, 70, 50],
          [100, 10, 90, 40],
          [210, 80, 50, 40],
          [10, 80, 60, 40],
          [140, 130, 80, 40],
          [240, 130, 70, 40],
          [100, 60, 70, 30],
        ].map(([x, y, w, h], i) => (
          <Rect key={i} x={x} y={y} width={w} height={h} rx={8} fill={palette.white} opacity={0.85} />
        ))}
        <Rect x={240} y={70} width={70} height={30} rx={10} fill="#CFEBDD" />
        <Rect x={200} y={8} width={44} height={30} rx={10} fill="#D6E9F8" />
        <Path d={PATH} stroke={palette.blush[300]} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <AnimatedPath
          d={PATH}
          stroke={palette.rose[500]}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={TOTAL}
          fill="none"
          animatedProps={routeProps}
        />
      </Svg>

      <View className="absolute h-7 w-7 items-center justify-center rounded-full bg-plum-800" style={{ left: startX * scale - 14, top: startY * scale - 14 }}>
        <Store size={14} color={palette.white} />
      </View>

      <View className="absolute items-center justify-center" style={{ left: endX * scale - 16, top: endY * scale - 16, width: 32, height: 32 }}>
        <Animated.View style={[{ position: 'absolute', width: 32, height: 32, borderRadius: 16, backgroundColor: palette.rose[400] }, pulseStyle]} />
        <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-rose-500">
          <Home size={14} color={palette.white} />
        </View>
      </View>

      <Animated.View
        style={[{ position: 'absolute', left: 0, top: 0, width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: palette.rose[500], backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center' }, riderStyle]}
      >
        <Bike size={17} color={palette.rose[600]} />
      </Animated.View>
    </View>
  );
}
