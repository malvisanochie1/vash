import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { ArtScene } from '@/features/catalog/art/ArtScene';
import { onboardingSlides } from './slides';

interface Props {
  slide: (typeof onboardingSlides)[number];
  index: number;
  width: number;
  archWidth: number;
  scrollX: SharedValue<number>;
}

/** Arch-framed image with depth: it scales and drifts as you swipe. */
export function OnboardingSlide({ slide, index, width, archWidth, scrollX }: Props) {
  const imageStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      transform: [
        { translateX: interpolate(scrollX.value, input, [-width * 0.25, 0, width * 0.25], Extrapolation.CLAMP) },
        { scale: interpolate(scrollX.value, input, [0.8, 1, 0.8], Extrapolation.CLAMP) },
      ],
    };
  });
  const archStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      opacity: interpolate(scrollX.value, input, [0.4, 1, 0.4], Extrapolation.CLAMP),
      transform: [{ scale: interpolate(scrollX.value, input, [0.88, 1, 0.88], Extrapolation.CLAMP) }],
    };
  });

  return (
    <View style={{ width }} className="items-center">
      <Animated.View
        style={[
          archStyle,
          {
            width: archWidth,
            height: archWidth * 1.22,
            borderTopLeftRadius: archWidth / 2,
            borderTopRightRadius: archWidth / 2,
          },
        ]}
        className="items-center justify-end overflow-hidden rounded-b-[36px] bg-blush-200 pb-6"
      >
        <Animated.View style={imageStyle}>
          <ArtScene productIds={[...slide.productIds]} size={archWidth * 0.98} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
