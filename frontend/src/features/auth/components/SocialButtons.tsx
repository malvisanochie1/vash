import { View } from 'react-native';
import { PressableScale, Text, toast } from '@/components/ui';

const providers = [
  { id: 'google', label: 'Google', glyph: 'G' },
  { id: 'apple', label: 'Apple', glyph: '' },
] as const;

export function SocialButtons() {
  return (
    <View>
      <View className="my-6 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-line" />
        <Text variant="caption">or continue with</Text>
        <View className="h-px flex-1 bg-line" />
      </View>
      <View className="flex-row gap-3">
        {providers.map((p) => (
          <PressableScale
            key={p.id}
            wrapperStyle={{ flex: 1 }}
            className="h-12 flex-row items-center justify-center gap-2 rounded-full border border-line bg-white"
            onPress={() => toast.show({ title: `${p.label} sign-in is coming soon`, tone: 'info' })}
          >
            <Text className="font-body-semibold text-[15px]">{p.glyph}</Text>
            <Text variant="label">{p.label}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
}
