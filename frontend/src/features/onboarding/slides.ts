import type { SceneKey } from '@/lib/product-images';

/** Onboarding story. Each slide shows a floating group of products. */
export const onboardingSlides = [
  {
    key: 'treatment',
    scene: 'treatment',
    title: 'Your crown,\nsoftly cared for',
    body: 'Relaxers, treatments and daily care made for melanin-rich hair.',
  },
  {
    key: 'routine',
    scene: 'routine',
    title: 'A routine\nthat loves you back',
    body: 'Wash, treat and moisturise with hibiscus, amla and shea.',
  },
  {
    key: 'regrowth',
    scene: 'regrowth',
    title: 'Regrow, restore\n& darken',
    body: 'Regrowth serums, edge balms and darkening care — up to 50% off this Black Friday.',
  },
] as const satisfies readonly { key: string; scene: SceneKey; title: string; body: string }[];
