import { Check } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Appear } from '@/components/motion/Appear';
import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { formatTime } from '@/lib/format';
import { palette } from '@/theme';
import type { Order } from '@/types/domain';
import { ORDER_STEPS, statusIndex } from '../order-status';

function PulseDot() {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 1400 }), -1);
  }, [t]);
  const style = useAnimatedStyle(() => ({ opacity: 0.6 * (1 - t.value), transform: [{ scale: 1 + t.value }] }));
  return (
    <View className="h-7 w-7 items-center justify-center">
      <Animated.View style={[{ position: 'absolute', width: 28, height: 28, borderRadius: 14, backgroundColor: palette.rose[400] }, style]} />
      <View className="h-7 w-7 items-center justify-center rounded-full border-2 border-rose-500 bg-white">
        <View className="h-2.5 w-2.5 rounded-full bg-rose-500" />
      </View>
    </View>
  );
}

function Connector({ filled, delay }: { filled: boolean; delay: number }) {
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = withDelay(delay, withTiming(filled ? 1 : 0, { duration: 500 }));
  }, [delay, filled, h]);
  const style = useAnimatedStyle(() => ({ height: `${h.value * 100}%` }));
  return (
    <View className="ml-[13px] h-9 w-[2px] overflow-hidden bg-blush-300">
      <Animated.View style={[{ width: '100%', backgroundColor: palette.rose[500] }, style]} />
    </View>
  );
}

export function OrderTimeline({ order }: { order: Order }) {
  const current = statusIndex(order.status);
  return (
    <View>
      {ORDER_STEPS.map((step, i) => {
        const done = i < current || order.status === 'delivered';
        const active = i === current && order.status !== 'delivered';
        const at = order.history.find((h) => h.status === step.status)?.at;
        return (
          <Appear key={step.status} preset="left" delay={200 + i * 110}>
            <View className="flex-row items-center gap-3">
              {done ? (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-rose-500">
                  <Check size={14} color={palette.white} strokeWidth={3} />
                </View>
              ) : active ? (
                <PulseDot />
              ) : (
                <View className="h-7 w-7 rounded-full border-2 border-blush-300 bg-white" />
              )}
              <View className="flex-1">
                <Text className={cn('font-body-semibold text-[14px]', !done && !active && 'text-muted')}>{step.title}</Text>
                <Text variant="caption">{at ? formatTime(at) : step.hint}</Text>
              </View>
            </View>
            {i < ORDER_STEPS.length - 1 && <Connector filled={i < current} delay={300 + i * 200} />}
          </Appear>
        );
      })}
    </View>
  );
}
