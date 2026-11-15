/** Onboarding story. Each slide is a floating product scene from the catalogue. */
export const onboardingSlides = [
  {
    key: 'treatment',
    productIds: ['p-protein-mask', 'p-relaxer-kit', 'p-growth-oil'],
    title: 'Your crown,\nsoftly cared for',
    body: 'Relaxers, treatments and daily care made for melanin-rich hair.',
  },
  {
    key: 'routine',
    productIds: ['p-shampoo', 'p-leave-in', 'p-conditioner'],
    title: 'A routine\nthat loves you back',
    body: 'Wash, treat and moisturise with hibiscus, amla and shea.',
  },
  {
    key: 'extensions',
    productIds: ['p-braid-extension', 'p-silky-weavon', 'p-edge-control'],
    title: 'Weavon, braids\n& the finish',
    body: 'Up to 50% off this Black Friday, delivered to your door.',
  },
] as const;
