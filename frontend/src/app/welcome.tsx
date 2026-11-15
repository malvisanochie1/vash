import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useCallback, useEffect, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
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

const AUTO_ADVANCE_MS = 4200;
const RESUME_AFTER_TOUCH_MS = 6000;
const SLIDES = onboardingSlides.length;
/** Calm settle: the slide glides into place without bouncing. */
const SETTLE = { damping: 28, stiffness: 120, mass: 1 };
const AUTO_SLIDE = { duration: 950, easing: Easing.bezier(0.45, 0, 0.2, 1) };

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
  const translateX = useSharedValue(0);
  const dragStart = useSharedValue(0);
  const page = useSharedValue(0);
  const pausedUntil = useRef(0);
  // Existing slide/copy/dots animations read a scroll-like offset.
  const scrollX = useDerivedValue(() => -translateX.value);

  // Arch scales with the viewport: ~72% of the width, capped by the height on short/wide screens.
  const archWidth = Math.min(width * 0.72, height * 0.36, 400);

  const pause = useCallback(() => {
    pausedUntil.current = Date.now() + RESUME_AFTER_TOUCH_MS;
  }, []);

  // Follows the finger 1:1 on the UI thread, rubber-bands at the ends,
  // then settles on the nearest slide (or the next one on a flick).
  const swipe = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-14, 14])
    .onBegin(() => {
      cancelAnimation(translateX);
      dragStart.value = translateX.value;
      runOnJS(pause)();
    })
    .onUpdate((e) => {
      const min = -(SLIDES - 1) * width;
      let next = dragStart.value + e.translationX;
      if (next > 0) next *= 0.3;
      if (next < min) next = min + (next - min) * 0.3;
      translateX.value = next;
    })
    .onEnd((e) => {
      const position = -translateX.value / width;
      let target = Math.round(position);
      if (Math.abs(e.velocityX) > 450) target = e.velocityX < 0 ? Math.ceil(position) : Math.floor(position);
      target = Math.max(0, Math.min(SLIDES - 1, target));
      page.value = target;
      translateX.value = withSpring(-target * width, { ...SETTLE, velocity: e.velocityX });
    });

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      const next = (page.value + 1) % SLIDES;
      page.value = next;
      translateX.value = withTiming(-next * width, AUTO_SLIDE);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [page, translateX, width]);

  // Keep the current slide aligned if the window is resized (tablet rotation, desktop).
  useEffect(() => {
    translateX.value = -page.value * width;
  }, [page, translateX, width]);

  const track = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

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
          <GestureDetector gesture={swipe}>
            <Animated.View style={[{ flexDirection: 'row', width: width * SLIDES }, track]}>
              {onboardingSlides.map((slide, index) => (
                <OnboardingSlide key={slide.key} slide={slide} index={index} width={width} archWidth={archWidth} scrollX={scrollX} />
              ))}
            </Animated.View>
          </GestureDetector>

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
