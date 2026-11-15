import type { ImageSource } from 'expo-image';

/**
 * Bundled product photography (background removed, ~10–35 KB WebP each).
 * Catalogue entries reference these as `local:<key>`; absolute URLs work too.
 */
const products: Record<string, number> = {
  'conditioner': require('@assets/products/conditioner.webp'),
  'darkening-cream': require('@assets/products/darkening-cream.webp'),
  'darkening-shampoo': require('@assets/products/darkening-shampoo.webp'),
  'deep-conditioner': require('@assets/products/deep-conditioner.webp'),
  'deep-conditioner-2': require('@assets/products/deep-conditioner-2.webp'),
  'edge-balm': require('@assets/products/edge-balm.webp'),
  'edge-control': require('@assets/products/edge-control.webp'),
  'edge-control-2': require('@assets/products/edge-control-2.webp'),
  'growth-oil': require('@assets/products/growth-oil.webp'),
  'hair-cream': require('@assets/products/hair-cream.webp'),
  'hair-cream-2': require('@assets/products/hair-cream-2.webp'),
  'hot-oil': require('@assets/products/hot-oil.webp'),
  'kiddies-relaxer': require('@assets/products/kiddies-relaxer.webp'),
  'leave-in': require('@assets/products/leave-in.webp'),
  'leave-in-2': require('@assets/products/leave-in-2.webp'),
  'neutralizing': require('@assets/products/neutralizing.webp'),
  'protein-mask': require('@assets/products/protein-mask.webp'),
  'protein-mask-2': require('@assets/products/protein-mask-2.webp'),
  'regrowth-serum': require('@assets/products/regrowth-serum.webp'),
  'regrowth-serum-2': require('@assets/products/regrowth-serum-2.webp'),
  'relaxer-care-kit': require('@assets/products/relaxer-care-kit.webp'),
  'relaxer-kit': require('@assets/products/relaxer-kit.webp'),
  'relaxer-kit-2': require('@assets/products/relaxer-kit-2.webp'),
  'scalp-serum': require('@assets/products/scalp-serum.webp'),
  'scalp-serum-2': require('@assets/products/scalp-serum-2.webp'),
  'shampoo': require('@assets/products/shampoo.webp'),
  'test-sample': require('@assets/products/test-sample.webp'),
  'texturizer': require('@assets/products/texturizer.webp'),
  'wash-day-kit': require('@assets/products/wash-day-kit.webp'),
};

/** Grouped product shots used by the intro slides and the campaign banner. */
export const scenes = {
  banner: require('@assets/scenes/banner.webp'),
  regrowth: require('@assets/scenes/regrowth.webp'),
  routine: require('@assets/scenes/routine.webp'),
  treatment: require('@assets/scenes/treatment.webp'),
} as const;

export type SceneKey = keyof typeof scenes;

/** Resolves a catalogue image reference to something expo-image can render. */
export const resolveImage = (ref?: string): ImageSource | number | undefined => {
  if (!ref) return undefined;
  if (/^https?:\/\//.test(ref)) return { uri: ref };
  return products[ref.replace(/^local:/, '')];
};
