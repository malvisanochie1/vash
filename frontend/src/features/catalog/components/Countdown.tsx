import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';

const pad = (n: number) => String(n).padStart(2, '0');

const remaining = (target: Date) => {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
};

export function Countdown({ endsAt }: { endsAt: Date }) {
  const [left, setLeft] = useState(() => remaining(endsAt));
  useEffect(() => {
    const timer = setInterval(() => setLeft(remaining(endsAt)), 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  const units = [
    [left.days, 'd'],
    [left.hours, 'h'],
    [left.minutes, 'm'],
    [left.seconds, 's'],
  ] as const;

  return (
    <View className="flex-row gap-1">
      {units.map(([value, unit]) => (
        <View key={unit} className="min-w-[34px] items-center rounded-lg bg-white/25 px-1.5 py-1">
          <Text className="font-body-semibold text-xs text-white">
            {pad(value)}
            <Text className="text-[9px] text-white/80">{unit}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}
