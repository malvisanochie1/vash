import { useId } from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { brand } from '@/config/brand';
import { palette } from '@/theme';

/** The brand seal: gradient disc, fine inner ring, italic serif monogram. */
export function Monogram({ size = 44 }: { size?: number }) {
  const id = `mono-${useId().replace(/:/g, '')}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={palette.rose[400]} />
          <Stop offset="1" stopColor={palette.rose[700]} />
        </LinearGradient>
      </Defs>
      <Circle cx={50} cy={50} r={48} fill={`url(#${id})`} />
      <Circle cx={50} cy={50} r={41} stroke={palette.white} strokeOpacity={0.55} strokeWidth={1.2} fill="none" />
      <SvgText x={50} y={66} fill={palette.white} fontSize={48} fontFamily="PlayfairDisplay_500Medium_Italic" textAnchor="middle">
        {brand.monogram}
      </SvgText>
    </Svg>
  );
}
