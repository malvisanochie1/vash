import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { Logo } from '@/components/brand/Logo';
import { Screen } from '@/components/layout/Screen';
import { Appear } from '@/components/motion/Appear';
import { Button, Text } from '@/components/ui';
import { brand } from '@/config/brand';
import { OnboardingSlide } from '@/features/onboarding/OnboardingSlide';
import { PagerDots } from '@/features/onboarding/PagerDots';
import { onboardingSlides } from '@/features/onboarding/slides';
import { useResponsive } from '@/hooks/use-responsive';

const AUTO_ADVANCE_MS = 3800;
const RESUME_AFTER_TOUCH_MS = 6000;

function SlideCopy({ index, width, scrollX }: { index: number; width: number; scrollX: SharedValue<number> }) {
  const slide = onboardingSlides[index]!;
  const style = useAnimatedStyle(() => {
    const range = [(index - 0.6) * width, index * width, (index + 0.6) * width];
    return {
      opacity: interpolate(scrollX.value, range, [0, 1, 0], Extrapolation.CLAMP),
      transform: [{ translateY: interpolate(scrollX.value, range, [14, 0, -14], Extrapolation.CLAMP) }],
    };
  });
  return (
    <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 0, right: 0, top: 0, alignItems: 'center', paddingHorizontal: '8%' }, style]}>
      <Text variant="hero" className="text-center">
        {slide.title}
      </Text>
      <Text className="mt-3 text-center text-muted">{slide.body}</Text>
    </Animated.View>
  );
}

export default function Welcome() {
  const { width, height } = useResponsive();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const page = useRef(0);
  const pausedUntil = useRef(0);

  // Arch scales with the viewport: ~72% of the width, capped by the height on short/wide screens.
  const archWidth = Math.min(width * 0.72, height * 0.36, 400);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  const goTo = useCallback(
    (index: number) => {
      page.current = index;
      scrollRef.current?.scrollTo({ x: index * width, animated: true });
    },
    [scrollRef, width],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      goTo((page.current + 1) % onboardingSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goTo]);

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 justify-between" style={{ paddingVertical: '3%' }}>
        <Appear preset="down" className="items-center">
          <Logo size={36} />
          <View className="mt-4 rounded-full bg-white px-4 py-1.5">
            <Text className="font-body-medium text-[11px] text-rose-600">✨ {brand.promise}</Text>
          </View>
        </Appear>

        <Appear preset="fade" duration={600} delay={120}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={() => {
              pausedUntil.current = Date.now() + RESUME_AFTER_TOUCH_MS;
            }}
            onMomentumScrollEnd={(e) => {
              page.current = Math.round(e.nativeEvent.contentOffset.x / width);
            }}
            style={{ flexGrow: 0 }}
          >
            {onboardingSlides.map((slide, index) => (
              <OnboardingSlide key={slide.key} slide={slide} index={index} width={width} archWidth={archWidth} scrollX={scrollX} />
            ))}
          </Animated.ScrollView>

          <View style={{ height: Math.max(120, height * 0.15), marginTop: '6%' }}>
            {onboardingSlides.map((slide, index) => (
              <SlideCopy key={slide.key} index={index} width={width} scrollX={scrollX} />
            ))}
          </View>
        </Appear>

        <Appear preset="up" delay={240} style={{ width: '100%', maxWidth: 460, alignSelf: 'center', paddingHorizontal: '6%' }}>
          <PagerDots count={onboardingSlides.length} width={width} scrollX={scrollX} />
          <View className="mt-5">
            <Button title="Get Started" trailingIcon={ArrowRight} onPress={() => router.push('/register')} />
          </View>
          <Pressable onPress={() => router.push('/login')} className="mt-3 items-center py-2" hitSlop={8}>
            <Text className="text-muted">
              I already have an account · <Text className="font-body-semibold text-rose-600">Sign in</Text>
            </Text>
          </Pressable>
        </Appear>
      </View>
    </Screen>
  );
}
