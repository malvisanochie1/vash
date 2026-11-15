import { Check } from 'lucide-react-native';
import { Fragment } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming, ZoomIn } from 'react-native-reanimated';
import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { palette } from '@/theme';

const STEPS = ['Bag', 'Delivery', 'Payment'] as const;

function Connector({ filled }: { filled: boolean }) {
  const p = useDerivedValue(() => withTiming(filled ? 1 : 0, { duration: 450 }));
  const style = useAnimatedStyle(() => ({ width: `${p.value * 100}%` }));
  return (
    <View className="mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-blush-300">
      <Animated.View className="h-full bg-rose-500" style={style} />
    </View>
  );
}

/** Bag ✓ — Delivery — Payment, with the line filling as you progress. */
export function CheckoutSteps({ current }: { current: number }) {
  return (
    <View className="flex-row items-center">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={label}>
            {i > 0 && <Connector filled={i <= current} />}
            <View className="flex-row items-center gap-1.5">
              <View
                className={cn(
                  'h-6 w-6 items-center justify-center rounded-full',
                  done || active ? 'bg-rose-500' : 'border border-blush-400 bg-white',
                )}
              >
                {done ? (
                  <Animated.View entering={ZoomIn.springify()}>
                    <Check size={13} color={palette.white} strokeWidth={3} />
                  </Animated.View>
                ) : (
                  <Text className={cn('font-body-semibold text-[11px]', active ? 'text-white' : 'text-muted')}>{i + 1}</Text>
                )}
              </View>
              <Text className={cn('text-xs', done || active ? 'font-body-semibold text-ink' : 'text-muted')}>{label}</Text>
            </View>
          </Fragment>
        );
      })}
    </View>
  );
}
