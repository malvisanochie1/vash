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
    key: 'regrowth',
    productIds: ['p-darkening-cream', 'p-regrowth-serum', 'p-edge-balm'],
    title: 'Regrow, restore\n& darken',
    body: 'Regrowth serums, edge balms and darkening care — up to 50% off this Black Friday.',
  },
] as const;
