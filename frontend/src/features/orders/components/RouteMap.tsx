import { Bike, Home, Store } from 'lucide-react-native';
import { useEffect, useMemo } from 'react';
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

/** Stylised city map: the route draws itself and the rider glides along it. */
export function RouteMap({ progress, width }: { progress: number; width: number }) {
  const height = width * (180 / 320);
  const scale = width / 320;
  const draw = useSharedValue(0);
  const rider = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    draw.value = withTiming(1, { duration: 1400, easing: Easing.out(Easing.cubic) });
    pulse.value = withRepeat(withTiming(1, { duration: 1600 }), -1);
  }, [draw, pulse]);

  useEffect(() => {
    rider.value = withTiming(progress, { duration: 1800, easing: Easing.inOut(Easing.cubic) });
  }, [progress, rider]);

  const lengths = useMemo(() => segmentLengths, []);

  const routeProps = useAnimatedProps(() => ({ strokeDashoffset: TOTAL * (1 - draw.value) }));
  const riderStyle = useAnimatedStyle(() => {
    let remaining = rider.value * TOTAL;
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
    return { transform: [{ translateX: x * scale - 17 }, { translateY: y * scale - 17 }] };
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
        <Animated.View className="absolute h-8 w-8 rounded-full bg-rose-400" style={pulseStyle} />
        <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-rose-500">
          <Home size={14} color={palette.white} />
        </View>
      </View>

      <Animated.View className="absolute left-0 top-0 h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-rose-500 bg-white" style={riderStyle}>
        <Bike size={17} color={palette.rose[600]} />
      </Animated.View>
    </View>
  );
}
