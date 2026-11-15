import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { ArtScene } from '@/features/catalog/art/ArtScene';
import { palette } from '@/theme';
import { onboardingSlides } from './slides';

interface Props {
  slide: (typeof onboardingSlides)[number];
  index: number;
  /** Page width (the viewport) — paging needs the real pixel width. */
  width: number;
  /** Arch width, derived from the viewport by the parent. */
  archWidth: number;
  scrollX: SharedValue<number>;
}

/** Arch-framed product scene with depth: it scales and drifts as you swipe. */
export function OnboardingSlide({ slide, index, width, archWidth, scrollX }: Props) {
  const range = [(index - 1) * width, index * width, (index + 1) * width];

  const archStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, range, [0.5, 1, 0.5], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(scrollX.value, range, [0.9, 1, 0.9], Extrapolation.CLAMP) }],
  }));
  const sceneStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(scrollX.value, range, [width * 0.18, 0, -width * 0.18], Extrapolation.CLAMP) }],
  }));

  return (
    <View style={{ width }} className="items-center justify-center">
      <Animated.View
        style={[
          {
            width: archWidth,
            aspectRatio: 0.82,
            borderTopLeftRadius: archWidth / 2,
            borderTopRightRadius: archWidth / 2,
            borderBottomLeftRadius: 36,
            borderBottomRightRadius: 36,
            backgroundColor: palette.blush[200],
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '6%',
          },
          archStyle,
        ]}
      >
        <Animated.View style={sceneStyle}>
          <ArtScene productIds={[...slide.productIds]} size={archWidth * 0.98} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
