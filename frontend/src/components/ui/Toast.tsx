import { CheckCircle2, Info } from 'lucide-react-native';
import { useEffect, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import { palette, shadow } from '@/theme';
import { Text } from './Text';

interface ToastMessage {
  id: number;
  title: string;
  message?: string;
  tone?: 'success' | 'info';
  visual?: ReactNode;
  action?: { label: string; onPress: () => void };
}

const useToastStore = create<{ current: ToastMessage | null; show(t: Omit<ToastMessage, 'id'>): void; hide(): void }>(
  (set) => ({
    current: null,
    show: (t) => set({ current: { ...t, id: Date.now() } }),
    hide: () => set({ current: null }),
  }),
);

/** Imperative API: toast.show({ title: 'Added to bag' }). */
export const toast = {
  show: (t: Omit<ToastMessage, 'id'>) => useToastStore.getState().show(t),
};

const VISIBLE_MS = 2600;

export function ToastHost() {
  const { current, hide } = useToastStore();
  const insets = useSafeAreaInsets();
  const y = useSharedValue(-140);

  useEffect(() => {
    if (!current) return;
    y.value = -140;
    y.value = withSpring(0, { damping: 18, stiffness: 190 });
    const timer = setTimeout(() => {
      y.value = withTiming(-140, { duration: 220 }, (done) => {
        if (done) runOnJS(hide)();
      });
    }, VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [current, hide, y]);

  const slide = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }], opacity: 1 + y.value / 140 }));

  if (!current) return null;
  const Icon = current.tone === 'info' ? Info : CheckCircle2;

  return (
    <View pointerEvents="box-none" className="absolute inset-x-0 top-0 items-center px-4" style={{ paddingTop: insets.top + 8, zIndex: 50 }}>
      <Animated.View style={[{ width: '100%', maxWidth: 460 }, slide]}>
        <View className="flex-row items-center gap-3 rounded-3xl bg-plum-900 px-4 py-3" style={shadow.card}>
          {current.visual ? (
            <View className="h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-blush-100">{current.visual}</View>
          ) : (
            <Icon size={22} color={palette.rose[300]} />
          )}
          <View className="flex-1">
            <Text className="font-body-semibold text-[13px] text-white">{current.title}</Text>
            {current.message && <Text className="text-xs text-white/70">{current.message}</Text>}
          </View>
          {current.action && (
            <Pressable
              onPress={() => {
                hide();
                current.action?.onPress();
              }}
              className="rounded-full bg-white/15 px-3 py-1.5"
            >
              <Text className="font-body-semibold text-xs text-white">{current.action.label}</Text>
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
