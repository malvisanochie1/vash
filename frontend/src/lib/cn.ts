import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Tailwind-aware class joiner: later classes win over conflicting earlier ones,
 * so `cn('text-sm', 'text-lg')` yields `text-lg`. Knows our custom font families.
 */
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': [{ font: ['display', 'display-bold', 'display-italic', 'body', 'body-medium', 'body-semibold'] }],
    },
  },
});

export const cn = (...classes: (string | false | null | undefined)[]) => merge(classes.filter(Boolean).join(' '));
