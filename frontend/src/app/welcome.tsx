import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { Logo } from '@/components/brand/Logo';
import { Screen } from '@/components/layout/Screen';
import { Button, Text } from '@/components/ui';
import { useAuthStore } from '@/features/auth/auth.store';
import { OnboardingSlide } from '@/features/onboarding/OnboardingSlide';
import { PagerDots } from '@/features/onboarding/PagerDots';
import { onboardingSlides } from '@/features/onboarding/slides';
import { brand } from '@/config/brand';
import { useResponsive } from '@/hooks/use-responsive';

const AUTO_ADVANCE_MS = 4200;

function SlideCopy({ index, width, scrollX }: { index: number; width: number; scrollX: SharedValue<number> }) {
  const slide = onboardingSlides[index]!;
  const style = useAnimatedStyle(() => {
    const input = [(index - 0.6) * width, index * width, (index + 0.6) * width];
    return {
      opacity: interpolate(scrollX.value, input, [0, 1, 0], Extrapolation.CLAMP),
      transform: [{ translateY: interpolate(scrollX.value, input, [16, 0, -16], Extrapolation.CLAMP) }],
    };
  });
  return (
    <Animated.View style={style} className="absolute inset-x-0 items-center px-8" pointerEvents="none">
      <Text variant="hero" className="text-center">
        {slide.title}
      </Text>
      <Text className="mt-3 max-w-[320px] text-center text-muted">{slide.body}</Text>
    </Animated.View>
  );
}

export default function Welcome() {
  const { width, height } = useResponsive();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const [page, setPage] = useState(0);
  const userInteracted = useRef(false);

  const archWidth = Math.min(width * 0.74, height * 0.36, 380);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (userInteracted.current) return;
      const next = (page + 1) % onboardingSlides.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [page, scrollRef, width]);

  const start = () => {
    completeOnboarding();
    router.replace('/login');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <Animated.View entering={FadeInDown.duration(500)} className="items-center pt-3">
        <Logo size={36} />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150).duration(500)} className="mt-5 self-center rounded-full bg-white px-4 py-1.5">
        <Text className="font-body-medium text-[11px] text-rose-600">✨ {brand.promise}</Text>
      </Animated.View>

      <View className="flex-1 justify-center">
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onScrollBeginDrag={() => (userInteracted.current = true)}
          onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
          className="flex-grow-0"
        >
          {onboardingSlides.map((slide, index) => (
            <OnboardingSlide key={slide.key} slide={slide} index={index} width={width} archWidth={archWidth} scrollX={scrollX} />
          ))}
        </Animated.ScrollView>

        <View className="mt-7 h-[130px]">
          {onboardingSlides.map((slide, index) => (
            <SlideCopy key={slide.key} index={index} width={width} scrollX={scrollX} />
          ))}
        </View>
      </View>

      <Animated.View entering={FadeInUp.delay(300).springify()} className="w-full max-w-[460px] self-center gap-5 px-6 pb-4">
        <PagerDots count={onboardingSlides.length} width={width} scrollX={scrollX} />
        <Button title="Get Started" trailingIcon={ArrowRight} onPress={start} />
      </Animated.View>
    </Screen>
  );
}
