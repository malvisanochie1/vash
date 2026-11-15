import { memo, useId } from 'react';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';
import { brand } from '@/config/brand';
import { palette } from '@/theme';
import type { ArtShape, ProductArt as ArtSpec } from '@/types/domain';

/**
 * Vector packshots drawn from a small spec (shape + colours + label), so the
 * catalogue looks consistent and crisp at any size until real photography
 * is uploaded. Canvas is 200×200; every shape stands on the floor at y≈182.
 */

const FONT = 'Poppins_600SemiBold';

const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
};

interface Ctx {
  art: ArtSpec;
  ink: string;
}

const inkFor = ({ body, cap, label }: ArtSpec) => (isLight(label) ? (isLight(body) ? cap : body) : palette.white);

function Wordmark({ x, y, color, size = 7 }: { x: number; y: number; color: string; size?: number }) {
  return (
    <SvgText x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} letterSpacing={1.6} textAnchor="middle">
      {brand.wordmark}
    </SvgText>
  );
}

function LabelText({ x, y, ctx, size = 10 }: { x: number; y: number; ctx: Ctx; size?: number }) {
  if (!ctx.art.text) return null;
  return (
    <SvgText x={x} y={y} fill={ctx.ink} fontSize={size} fontFamily={FONT} textAnchor="middle" letterSpacing={0.6}>
      {ctx.art.text}
    </SvgText>
  );
}

/** Glossy highlight stripe that sells the "packshot" look. */
const Shine = ({ x, y, h }: { x: number; y: number; h: number }) => (
  <Rect x={x} y={y} width={6} height={h} rx={3} fill="#FFFFFF" opacity={0.35} />
);

const shapes: Record<ArtShape, (ctx: Ctx) => React.ReactElement> = {
  bottle: ({ art, ...rest }) => (
    <G>
      <Rect x={84} y={28} width={32} height={24} rx={6} fill={art.cap} />
      <Rect x={88} y={50} width={24} height={10} fill={art.cap} opacity={0.85} />
      <Rect x={64} y={58} width={72} height={124} rx={20} fill={art.body} />
      <Rect x={68} y={98} width={64} height={52} rx={6} fill={art.label} />
      <Wordmark x={100} y={113} color={rest.ink} />
      <LabelText x={100} y={133} ctx={{ art, ...rest }} size={art.text && art.text.length > 8 ? 8 : 10} />
      <Shine x={72} y={66} h={96} />
    </G>
  ),
  pump: ({ art, ...rest }) => (
    <G>
      <Rect x={84} y={34} width={32} height={10} rx={4} fill={art.cap} />
      <Rect x={112} y={36} width={26} height={6} rx={3} fill={art.cap} />
      <Rect x={96} y={42} width={8} height={26} fill={art.cap} />
      <Rect x={84} y={64} width={32} height={18} rx={4} fill={art.cap} />
      <Rect x={66} y={80} width={68} height={102} rx={18} fill={art.body} />
      <Rect x={70} y={108} width={60} height={50} rx={6} fill={art.label} />
      <Wordmark x={100} y={123} color={rest.ink} />
      <LabelText x={100} y={143} ctx={{ art, ...rest }} />
      <Shine x={74} y={88} h={80} />
    </G>
  ),
  jar: ({ art, ...rest }) => (
    <G>
      <Rect x={52} y={84} width={96} height={30} rx={10} fill={art.cap} />
      <Rect x={52} y={108} width={96} height={6} fill="#000000" opacity={0.08} />
      <Rect x={56} y={112} width={88} height={70} rx={16} fill={art.body} />
      <Rect x={56} y={124} width={88} height={42} fill={art.label} />
      <Wordmark x={100} y={140} color={rest.ink} />
      <LabelText x={100} y={158} ctx={{ art, ...rest }} />
      <Shine x={64} y={118} h={56} />
    </G>
  ),
  tin: ({ art, ...rest }) => (
    <G>
      <Ellipse cx={100} cy={128} rx={56} ry={14} fill={art.cap} />
      <Rect x={44} y={128} width={112} height={30} fill={art.cap} />
      <Ellipse cx={100} cy={158} rx={56} ry={14} fill={art.cap} />
      <Rect x={48} y={150} width={104} height={26} rx={6} fill={art.body} />
      <Ellipse cx={100} cy={128} rx={46} ry={9} fill={art.body} />
      <Wordmark x={100} y={131} color={rest.ink} size={6.5} />
      <SvgText x={100} y={168} fill={palette.white} fontSize={10} fontFamily={FONT} textAnchor="middle">
        {art.text ?? ''}
      </SvgText>
    </G>
  ),
  tube: ({ art, ...rest }) => (
    <G>
      <Path d="M68 36 h64 l-4 8 h-56 z" fill={art.cap} opacity={0.9} />
      <Path d="M70 44 h60 l-14 116 h-32 z" fill={art.body} />
      <Rect x={84} y={158} width={32} height={24} rx={6} fill={art.cap} />
      <Rect x={78} y={80} width={44} height={44} rx={6} fill={art.label} />
      <Wordmark x={100} y={95} color={rest.ink} size={6} />
      <LabelText x={100} y={114} ctx={{ art, ...rest }} size={art.text && art.text.length > 6 ? 8 : 10} />
      <Shine x={78} y={50} h={70} />
    </G>
  ),
  dropper: ({ art, ...rest }) => (
    <G>
      <Ellipse cx={100} cy={46} rx={12} ry={18} fill={art.cap} />
      <Rect x={84} y={60} width={32} height={20} rx={4} fill={art.cap} />
      <Rect x={90} y={78} width={20} height={12} fill={art.body} opacity={0.8} />
      <Rect x={70} y={88} width={60} height={94} rx={16} fill={art.body} />
      <Rect x={74} y={112} width={52} height={46} rx={6} fill={art.label} />
      <Wordmark x={100} y={127} color={rest.ink} size={6} />
      <LabelText x={100} y={146} ctx={{ art, ...rest }} size={9} />
      <Shine x={76} y={96} h={70} />
    </G>
  ),
  spray: ({ art, ...rest }) => (
    <G>
      <Path d="M82 42 h34 l8 10 h14 v8 h-22 l-4 8 h-30 z" fill={art.cap} />
      <Rect x={88} y={66} width={24} height={14} rx={3} fill={art.cap} />
      <Rect x={70} y={78} width={60} height={104} rx={18} fill={art.body} />
      <Rect x={74} y={106} width={52} height={48} rx={6} fill={art.label} />
      <Wordmark x={100} y={121} color={rest.ink} size={6} />
      <LabelText x={100} y={141} ctx={{ art, ...rest }} />
      <Shine x={78} y={86} h={84} />
    </G>
  ),
  box: ({ art, ...rest }) => (
    <G>
      <Path d="M58 48 l12 -12 h84 l-12 12 z" fill={art.cap} />
      <Path d="M142 48 l12 -12 v134 l-12 12 z" fill={art.cap} opacity={0.75} />
      <Rect x={58} y={48} width={84} height={134} rx={4} fill={art.body} />
      <Circle cx={100} cy={100} r={28} fill={art.label} />
      <SvgText x={100} y={108} fill={art.body} fontSize={22} fontFamily="PlayfairDisplay_700Bold" textAnchor="middle">
        {brand.monogram}
      </SvgText>
      <Wordmark x={100} y={148} color={palette.white} size={8} />
      <SvgText x={100} y={166} fill={palette.white} fontSize={10} fontFamily={FONT} textAnchor="middle">
        {art.text ?? ''}
      </SvgText>
      <Rect x={64} y={56} width={5} height={118} rx={2.5} fill="#FFFFFF" opacity={0.25} />
    </G>
  ),
  kit: (ctx) => (
    <G>
      <G transform="translate(-14 10) scale(0.82)">{shapes.bottle({ ...ctx, art: { ...ctx.art, text: null } })}</G>
      <G transform="translate(58 26) scale(0.72)">{shapes.dropper({ ...ctx, art: { ...ctx.art, text: null } })}</G>
      <G transform="translate(30 58) scale(0.7)">{shapes.jar(ctx)}</G>
    </G>
  ),
};

interface Props {
  art: ArtSpec;
  /** Pixel size; omit to fill the parent (use with an aspect-ratio box). */
  size?: number;
  /** Backdrop style: soft blush disc, or none (for composed scenes). */
  backdrop?: 'disc' | 'none';
}

export const ProductArt = memo(function ProductArt({ art, size, backdrop = 'disc' }: Props) {
  const id = `art-${useId().replace(/:/g, '')}`;
  return (
    <Svg width={size ?? '100%'} height={size ?? '100%'} viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.white} stopOpacity={0.9} />
          <Stop offset="1" stopColor={palette.blush[300]} stopOpacity={0.9} />
        </LinearGradient>
      </Defs>
      {backdrop === 'disc' && <Circle cx={100} cy={104} r={82} fill={`url(#${id})`} />}
      <Ellipse cx={100} cy={184} rx={52} ry={6} fill={palette.plum[900]} opacity={0.12} />
      {shapes[art.shape]({ art, ink: inkFor(art) })}
    </Svg>
  );
});
