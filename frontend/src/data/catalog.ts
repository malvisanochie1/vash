import type { Category, DeliveryOption, Product } from '@/types/domain';

/**
 * Demo catalogue — mirrors backend/src/modules/products/product.seed.ts.
 * Used when the app runs without a configured API (see config/env.ts).
 */
export const categorySeed: Category[] = [
  {
    "id": "treatment",
    "name": "Treatment",
    "productId": "p-relaxer-kit"
  },
  {
    "id": "regrowth",
    "name": "Regrowth",
    "productId": "p-growth-oil"
  },
  {
    "id": "cleanse",
    "name": "Wash",
    "productId": "p-shampoo"
  },
  {
    "id": "moisture",
    "name": "Moisture",
    "productId": "p-leave-in"
  },
  {
    "id": "styling",
    "name": "Styling",
    "productId": "p-edge-control"
  },
  {
    "id": "kits",
    "name": "Kits",
    "productId": "p-wash-day-kit"
  }
];

export const productSeed: Product[] = [
  {
    "id": "p-relaxer-kit",
    "slug": "relaxer-kit",
    "name": "Silk Press No-Lye Relaxer Kit",
    "nickname": "Silky straight, scalp kind",
    "category": "treatment",
    "tagline": "Crème base, activator & neutralizing sachet",
    "description": "A salon-quality no-lye relaxer you can use at home. The conditioning crème base smooths and straightens while protecting the scalp and keeping strands strong.",
    "benefits": [
      "Salon results at home",
      "Gentle on the scalp",
      "Long-lasting straightness"
    ],
    "ingredients": [
      "Shea butter",
      "Olive oil",
      "Panthenol"
    ],
    "howToUse": "Base the scalp and hairline. Mix activator into crème, apply to dry unwashed hair from the roots, smooth and rinse within the recommended time. Finish with the neutralizing shampoo.",
    "images": [
      "local:relaxer-kit",
      "local:relaxer-kit-2"
    ],
    "art": {
      "shape": "box",
      "body": "#3E1F47",
      "cap": "#C9A24A",
      "label": "#C9A24A",
      "text": "RELAXER"
    },
    "optionName": "Strength",
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 412,
    "variants": [
      {
        "id": "v-relax-mild",
        "label": "Mild",
        "price": 5200,
        "inStock": true,
        "compareAtPrice": 6500
      },
      {
        "id": "v-relax-regular",
        "label": "Regular",
        "price": 5200,
        "inStock": true,
        "compareAtPrice": 6500
      },
      {
        "id": "v-relax-super",
        "label": "Super",
        "price": 5500,
        "inStock": true,
        "compareAtPrice": 6900
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-kiddies-relaxer",
    "slug": "kiddies-relaxer",
    "name": "Kiddies Gentle Relaxer Kit",
    "nickname": "Soft & gentle",
    "category": "treatment",
    "tagline": "Extra-mild formula for young, delicate hair",
    "description": "An extra-mild, no-lye system made for children's finer hair. Detangles, softens and relaxes without harshness.",
    "benefits": [
      "Extra-mild",
      "Softens & detangles",
      "Comfortable application"
    ],
    "ingredients": [
      "Aloe vera",
      "Shea butter",
      "Vitamin E"
    ],
    "howToUse": "Patch test 48 hours before. Apply a protective base, then follow the kit steps carefully. Not for children under 6.",
    "images": [
      "local:kiddies-relaxer"
    ],
    "art": {
      "shape": "box",
      "body": "#A9C6E8",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
      "text": "KIDS"
    },
    "optionName": "Kit",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 138,
    "variants": [
      {
        "id": "v-kids-std",
        "label": "Kit",
        "price": 4800,
        "inStock": true,
        "compareAtPrice": 6000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-texturizer",
    "slug": "texturizer",
    "name": "Curl Texturizer",
    "nickname": "Soft waves, no lye",
    "category": "treatment",
    "tagline": "Loosens tight coils into soft, defined waves",
    "description": "A gentle texturizer that relaxes your natural coil pattern just enough for soft, manageable waves — without going straight.",
    "benefits": [
      "Softens coils",
      "Defines waves",
      "No-lye formula"
    ],
    "ingredients": [
      "Shea butter",
      "Coconut oil",
      "Wheat protein"
    ],
    "howToUse": "Apply to dry hair in sections, comb through gently and rinse within 5–10 minutes. Neutralize thoroughly.",
    "images": [
      "local:texturizer"
    ],
    "art": {
      "shape": "jar",
      "body": "#3C3F44",
      "cap": "#B8734A",
      "label": "#FFFFFF",
      "text": "TEXTURIZER"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 77,
    "variants": [
      {
        "id": "v-tex-250",
        "label": "250g",
        "price": 4900,
        "inStock": true,
        "compareAtPrice": 6500
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-neutralizing",
    "slug": "neutralizing",
    "name": "Neutralizing Shampoo",
    "nickname": "Relaxer's best friend",
    "category": "treatment",
    "tagline": "Colour-signal formula restores pH after relaxing",
    "description": "Stops the relaxer process and restores your hair's natural pH. The lather turns from teal to white once all relaxer is gone.",
    "benefits": [
      "Restores pH",
      "Colour-signal lather",
      "Conditions while cleansing"
    ],
    "ingredients": [
      "Citric acid",
      "Panthenol",
      "Coconut oil"
    ],
    "howToUse": "Use straight after rinsing out relaxer. Lather and rinse at least 3 times, until the lather stays white.",
    "images": [
      "local:neutralizing"
    ],
    "art": {
      "shape": "bottle",
      "body": "#11606B",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
      "text": "NEUTRAL"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 93,
    "variants": [
      {
        "id": "v-neut-400",
        "label": "400ml",
        "price": 3900,
        "inStock": true,
        "compareAtPrice": 5000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-protein-mask",
    "slug": "protein-mask",
    "name": "Protein Repair Hair Mask",
    "nickname": "Strength in a jar",
    "category": "treatment",
    "tagline": "Keratin & rice protein for breakage-prone hair",
    "description": "A rich weekly masque that rebuilds weak, over-processed strands. Perfect after relaxing, colouring or heat styling.",
    "benefits": [
      "Repairs damage",
      "Reduces breakage",
      "Restores bounce"
    ],
    "ingredients": [
      "Hydrolysed keratin",
      "Rice protein",
      "Avocado oil"
    ],
    "howToUse": "After shampooing, apply generously to damp hair. Cover with a cap for 15–20 minutes, then rinse thoroughly.",
    "images": [
      "local:protein-mask",
      "local:protein-mask-2"
    ],
    "art": {
      "shape": "jar",
      "body": "#EEF0EF",
      "cap": "#C9A24A",
      "label": "#FFFFFF",
      "text": "REPAIR"
    },
    "optionName": "Size",
    "badges": [
      "New"
    ],
    "rating": 4.9,
    "reviewCount": 196,
    "variants": [
      {
        "id": "v-mask-250",
        "label": "250g",
        "price": 6800,
        "inStock": true,
        "compareAtPrice": 9500
      },
      {
        "id": "v-mask-500",
        "label": "500g",
        "price": 11500,
        "inStock": true,
        "compareAtPrice": 16000
      }
    ],
    "isNew": true,
    "featured": true
  },
  {
    "id": "p-anti-breakage",
    "slug": "anti-breakage",
    "name": "Anti-Breakage Treatment",
    "nickname": "Stop the snap",
    "category": "treatment",
    "tagline": "For thinning ends and post-relaxer breakage",
    "description": "A leave-on treatment cream that strengthens weak points along the strand and seals split ends between trims.",
    "benefits": [
      "Strengthens ends",
      "Seals split ends",
      "Lightweight"
    ],
    "ingredients": [
      "Biotin",
      "Castor oil",
      "Panthenol"
    ],
    "howToUse": "Apply a small amount to damp or dry hair, focusing on the ends. Do not rinse.",
    "images": [],
    "art": {
      "shape": "tube",
      "body": "#C2673F",
      "cap": "#F3EBDD",
      "label": "#F3EBDD",
      "text": "STRONG"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 88,
    "variants": [
      {
        "id": "v-break-150",
        "label": "150ml",
        "price": 4900,
        "inStock": true,
        "compareAtPrice": 6500
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-scalp-serum",
    "slug": "scalp-serum",
    "name": "Anti-Dandruff Scalp Serum",
    "nickname": "Calm, clear scalp",
    "category": "treatment",
    "tagline": "Tea tree & peppermint scalp relief",
    "description": "A soothing scalp serum that lifts flakes, calms itch and keeps your scalp balanced.",
    "benefits": [
      "Lifts flakes",
      "Soothes itch",
      "Cooling feel"
    ],
    "ingredients": [
      "Tea tree oil",
      "Peppermint oil",
      "Salicylic acid"
    ],
    "howToUse": "Part hair and apply directly to the scalp 2–3 times a week. Massage gently.",
    "images": [
      "local:scalp-serum",
      "local:scalp-serum-2"
    ],
    "art": {
      "shape": "dropper",
      "body": "#9FD3BF",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
      "text": "SCALP"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 71,
    "variants": [
      {
        "id": "v-scalp-60",
        "label": "60ml",
        "price": 4500,
        "inStock": true,
        "compareAtPrice": 5800
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-hot-oil",
    "slug": "hot-oil",
    "name": "Hot Oil Treatment",
    "nickname": "Weekly glow-up",
    "category": "treatment",
    "tagline": "Warm-oil therapy for dry, dull hair",
    "description": "A golden blend that melts into the hair shaft for deep softness and mirror shine.",
    "benefits": [
      "Deep softness",
      "Mirror shine",
      "Fast absorbing"
    ],
    "ingredients": [
      "Coconut oil",
      "Jojoba oil",
      "Vitamin E"
    ],
    "howToUse": "Warm the bottle in hot water for a minute, apply to damp hair, cover for 10 minutes and rinse.",
    "images": [
      "local:hot-oil"
    ],
    "art": {
      "shape": "bottle",
      "body": "#C8862F",
      "cap": "#1B1B1D",
      "label": "#FFFFFF",
      "text": "HOT OIL"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 54,
    "variants": [
      {
        "id": "v-hotoil-100",
        "label": "100ml",
        "price": 3800,
        "inStock": true,
        "compareAtPrice": 4900
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-growth-oil",
    "slug": "growth-oil",
    "name": "Rosemary & Chebe Growth Oil",
    "nickname": "Grow, glow, repeat",
    "category": "regrowth",
    "tagline": "Rosemary, chebe & castor scalp oil",
    "description": "A lightweight scalp oil that stimulates the scalp and helps retain length by reducing breakage.",
    "benefits": [
      "Supports growth",
      "Retains length",
      "Non-greasy"
    ],
    "ingredients": [
      "Rosemary oil",
      "Chebe powder",
      "Jamaican black castor oil"
    ],
    "howToUse": "Apply a few drops to the scalp and massage for 2 minutes. Use 3–4 times a week.",
    "images": [
      "local:growth-oil"
    ],
    "art": {
      "shape": "dropper",
      "body": "#C8862F",
      "cap": "#1B1B1D",
      "label": "#D2B48C",
      "text": "GROWTH"
    },
    "optionName": "Size",
    "badges": [
      "Trending"
    ],
    "rating": 4.9,
    "reviewCount": 256,
    "variants": [
      {
        "id": "v-oil-60",
        "label": "60ml",
        "price": 5500,
        "inStock": true,
        "compareAtPrice": 7500
      },
      {
        "id": "v-oil-120",
        "label": "120ml",
        "price": 9500,
        "inStock": true,
        "compareAtPrice": 13000
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-regrowth-serum",
    "slug": "regrowth-serum",
    "name": "Hair Regrowth Serum",
    "nickname": "Wake up your roots",
    "category": "regrowth",
    "tagline": "Caffeine & biotin for thinning areas",
    "description": "A fast-absorbing serum for thinning edges, crown and temples. Energises the scalp and supports thicker-looking growth.",
    "benefits": [
      "Targets thinning areas",
      "Lightweight serum",
      "Visible fullness"
    ],
    "ingredients": [
      "Caffeine",
      "Biotin",
      "Peptides"
    ],
    "howToUse": "Pump onto thinning areas once daily and massage in. Do not rinse.",
    "images": [
      "local:regrowth-serum",
      "local:regrowth-serum-2"
    ],
    "art": {
      "shape": "pump",
      "body": "#1B1B1D",
      "cap": "#B9BCC2",
      "label": "#1B1B1D",
      "text": "REGROWTH"
    },
    "optionName": "Size",
    "badges": [
      "New"
    ],
    "rating": 4.8,
    "reviewCount": 118,
    "variants": [
      {
        "id": "v-regrow-50",
        "label": "50ml",
        "price": 8900,
        "inStock": true,
        "compareAtPrice": 12500
      }
    ],
    "isNew": true,
    "featured": true
  },
  {
    "id": "p-edge-balm",
    "slug": "edge-balm",
    "name": "Edge Regrowth Balm",
    "nickname": "Fill in the edges",
    "category": "regrowth",
    "tagline": "Rich balm for thin, stressed edges",
    "description": "A nourishing balm that cushions fragile edges and supports regrowth after tight styles.",
    "benefits": [
      "Nourishes edges",
      "Supports regrowth",
      "Non-sticky"
    ],
    "ingredients": [
      "Castor oil",
      "Peppermint",
      "Shea butter"
    ],
    "howToUse": "Massage a small amount into the hairline nightly.",
    "images": [
      "local:edge-balm"
    ],
    "art": {
      "shape": "tin",
      "body": "#9CAF88",
      "cap": "#9CAF88",
      "label": "#FFFFFF",
      "text": "EDGE BALM"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 91,
    "variants": [
      {
        "id": "v-edgebalm-50",
        "label": "50g",
        "price": 3500,
        "inStock": true,
        "compareAtPrice": 4800
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-darkening-cream",
    "slug": "darkening-cream",
    "name": "Hair Darkening Cream",
    "nickname": "Rich, natural black",
    "category": "regrowth",
    "tagline": "Gradually restores deep natural black",
    "description": "A conditioning cream that gradually darkens faded or greying hair to a rich, natural-looking black with daily use.",
    "benefits": [
      "Gradual darkening",
      "Conditions as it works",
      "Natural-looking result"
    ],
    "ingredients": [
      "Black seed oil",
      "Henna extract",
      "Shea butter"
    ],
    "howToUse": "Apply to clean, dry hair daily, comb through evenly. Results build over 1–2 weeks.",
    "images": [
      "local:darkening-cream"
    ],
    "art": {
      "shape": "jar",
      "body": "#1B1B1D",
      "cap": "#B9BCC2",
      "label": "#1B1B1D",
      "text": "DARKENING"
    },
    "optionName": "Size",
    "badges": [
      "New"
    ],
    "rating": 4.7,
    "reviewCount": 64,
    "variants": [
      {
        "id": "v-dark-200",
        "label": "200g",
        "price": 5900,
        "inStock": true,
        "compareAtPrice": 7900
      }
    ],
    "isNew": true,
    "featured": true
  },
  {
    "id": "p-darkening-shampoo",
    "slug": "darkening-shampoo",
    "name": "Darkening Shampoo",
    "nickname": "Blend the grey",
    "category": "regrowth",
    "tagline": "Grey-blending wash for deeper colour",
    "description": "A gentle shampoo that blends greys and deepens your natural shade a little more with every wash.",
    "benefits": [
      "Blends greys",
      "Deepens colour",
      "Gentle cleanse"
    ],
    "ingredients": [
      "Black seed oil",
      "Amla",
      "Glycerin"
    ],
    "howToUse": "Lather into wet hair, leave for 3 minutes, then rinse. Use 2–3 times a week.",
    "images": [
      "local:darkening-shampoo"
    ],
    "art": {
      "shape": "bottle",
      "body": "#1B1B1D",
      "cap": "#1B1B1D",
      "label": "#B9BCC2",
      "text": "DARKENING"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.5,
    "reviewCount": 42,
    "variants": [
      {
        "id": "v-darksham-300",
        "label": "300ml",
        "price": 4800,
        "inStock": true,
        "compareAtPrice": 6500
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-shampoo",
    "slug": "shampoo",
    "name": "Hibiscus Moisture Shampoo",
    "nickname": "Wash me gently",
    "category": "cleanse",
    "tagline": "Hibiscus, amla & rooibos oils",
    "description": "A sulphate-conscious cleanse that lifts build-up without stripping moisture.",
    "benefits": [
      "Cleanses gently",
      "Adds moisture & shine",
      "Prevents breakage"
    ],
    "ingredients": [
      "Hibiscus oil",
      "Amla oil",
      "Rooibos oil"
    ],
    "howToUse": "Apply to wet hair, lather from roots to ends, rinse and repeat.",
    "images": [
      "local:shampoo"
    ],
    "art": {
      "shape": "bottle",
      "body": "#C8862F",
      "cap": "#F4EEE2",
      "label": "#F4EEE2",
      "text": "SHAMPOO"
    },
    "optionName": "Size",
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 214,
    "variants": [
      {
        "id": "v-sham-400",
        "label": "400ml",
        "price": 4500,
        "inStock": true,
        "compareAtPrice": 6500
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-conditioner",
    "slug": "conditioner",
    "name": "Detangling Conditioner",
    "nickname": "Rinse me smooth",
    "category": "cleanse",
    "tagline": "Slip-rich, knot-melting formula",
    "description": "Melts knots away, hydrates every strand and leaves hair soft and easy to style.",
    "benefits": [
      "Detangles",
      "Hydrates",
      "Reduces breakage"
    ],
    "ingredients": [
      "Hibiscus oil",
      "Amla oil",
      "Shea butter"
    ],
    "howToUse": "After shampooing, apply to damp hair, leave for 3–5 minutes and rinse.",
    "images": [
      "local:conditioner"
    ],
    "art": {
      "shape": "bottle",
      "body": "#F4EEE2",
      "cap": "#B98C5E",
      "label": "#FFFFFF",
      "text": "CONDITIONER"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.9,
    "reviewCount": 187,
    "variants": [
      {
        "id": "v-cond-400",
        "label": "400ml",
        "price": 4500,
        "inStock": true,
        "compareAtPrice": 6500
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-deep-conditioner",
    "slug": "deep-conditioner",
    "name": "Deep Repair Conditioner",
    "nickname": "Weekly reset",
    "category": "cleanse",
    "tagline": "Avocado & shea intensive conditioner",
    "description": "Restores softness and strength to dry, dull hair. Your wash-day reset in a tub.",
    "benefits": [
      "Restores softness",
      "Strengthens",
      "Revives dull hair"
    ],
    "ingredients": [
      "Avocado oil",
      "Shea butter",
      "Hibiscus extract"
    ],
    "howToUse": "After shampooing, apply to damp hair, cover with a cap for 15 minutes and rinse.",
    "images": [
      "local:deep-conditioner",
      "local:deep-conditioner-2"
    ],
    "art": {
      "shape": "jar",
      "body": "#F3EBDD",
      "cap": "#6E8B3D",
      "label": "#FFFFFF",
      "text": "DEEP"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 74,
    "variants": [
      {
        "id": "v-deep-500",
        "label": "500g",
        "price": 7900,
        "inStock": true,
        "compareAtPrice": 11000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-leave-in",
    "slug": "leave-in",
    "name": "Daily Leave-In Cream",
    "nickname": "Leave me soft",
    "category": "moisture",
    "tagline": "All-day moisture, no crunch",
    "description": "A lightweight daily cream that locks in moisture, softens and protects from root to tip.",
    "benefits": [
      "Locks in moisture",
      "Softens",
      "Protects ends"
    ],
    "ingredients": [
      "Shea butter",
      "Aloe vera",
      "Hibiscus oil"
    ],
    "howToUse": "Smooth a small amount through damp or dry hair. Do not rinse.",
    "images": [
      "local:leave-in",
      "local:leave-in-2"
    ],
    "art": {
      "shape": "pump",
      "body": "#FFFFFF",
      "cap": "#9CAF88",
      "label": "#9CAF88",
      "text": "LEAVE-IN"
    },
    "optionName": "Size",
    "badges": [
      "Fan favourite"
    ],
    "rating": 4.9,
    "reviewCount": 268,
    "variants": [
      {
        "id": "v-leave-250",
        "label": "250ml",
        "price": 5800,
        "inStock": true,
        "compareAtPrice": 8000
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-hair-cream",
    "slug": "hair-cream",
    "name": "Shea & Coconut Hair Cream",
    "nickname": "Everyday hair food",
    "category": "moisture",
    "tagline": "Classic daily softness",
    "description": "A rich everyday hair cream that nourishes dry hair and scalp, adds sheen and keeps styles neat.",
    "benefits": [
      "Nourishes dry hair",
      "Adds sheen",
      "Everyday use"
    ],
    "ingredients": [
      "Shea butter",
      "Coconut oil",
      "Lanolin"
    ],
    "howToUse": "Apply a small amount to hair and scalp daily, then style.",
    "images": [
      "local:hair-cream",
      "local:hair-cream-2"
    ],
    "art": {
      "shape": "jar",
      "body": "#FFFFFF",
      "cap": "#7A4E2D",
      "label": "#FFFFFF",
      "text": "CREAM"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 320,
    "variants": [
      {
        "id": "v-cream-300",
        "label": "300g",
        "price": 3800,
        "inStock": true,
        "compareAtPrice": 5000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-hair-lotion",
    "slug": "hair-lotion",
    "name": "Moisturizing Hair Lotion",
    "nickname": "Daily drink of water",
    "category": "moisture",
    "tagline": "Light lotion for relaxed & natural hair",
    "description": "A creamy lotion that rehydrates thirsty strands without weighing them down.",
    "benefits": [
      "Instant hydration",
      "Lightweight",
      "Reduces frizz"
    ],
    "ingredients": [
      "Glycerin",
      "Coconut milk",
      "Vitamin E"
    ],
    "howToUse": "Pump onto palms and smooth through hair. Style as usual.",
    "images": [],
    "art": {
      "shape": "pump",
      "body": "#A9A2B8",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
      "text": "LOTION"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 82,
    "variants": [
      {
        "id": "v-lotion-250",
        "label": "250ml",
        "price": 4200,
        "inStock": true,
        "compareAtPrice": 5500
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-edge-control",
    "slug": "edge-control",
    "name": "Strong Hold Edge Control",
    "nickname": "Laid all day",
    "category": "styling",
    "tagline": "Flake-free 24-hour hold",
    "description": "Sleek, shiny edges that stay put all day — no flakes, no white cast.",
    "benefits": [
      "24-hour hold",
      "No flakes",
      "High shine"
    ],
    "ingredients": [
      "Castor oil",
      "Beeswax",
      "Honey"
    ],
    "howToUse": "Apply a small amount to edges and brush into place.",
    "images": [
      "local:edge-control",
      "local:edge-control-2"
    ],
    "art": {
      "shape": "jar",
      "body": "#DCE3E6",
      "cap": "#1B1B1D",
      "label": "#FFFFFF",
      "text": "EDGES"
    },
    "optionName": "Size",
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 389,
    "variants": [
      {
        "id": "v-edge-100",
        "label": "100g",
        "price": 3200,
        "inStock": true,
        "compareAtPrice": 4500
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-test-sachet",
    "slug": "test-sachet",
    "name": "Leave-In Trial Sachet",
    "nickname": "Try me first",
    "category": "moisture",
    "tagline": "Single-use trial sachet",
    "description": "A single-use sachet of our Daily Leave-In Cream — try the formula before buying the full size.",
    "benefits": [
      "Try before you buy",
      "Single use",
      "Travel friendly"
    ],
    "ingredients": [
      "Shea butter",
      "Aloe vera"
    ],
    "howToUse": "Smooth through damp hair after washing. Do not rinse.",
    "images": [],
    "art": {
      "shape": "tube",
      "body": "#9CAF88",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
      "text": "SACHET"
    },
    "optionName": "Pack",
    "badges": [
      "Test item"
    ],
    "rating": 4.5,
    "reviewCount": 12,
    "variants": [
      {
        "id": "v-test-sachet",
        "label": "15ml",
        "price": 15,
        "inStock": true
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-test-sample",
    "slug": "test-sample",
    "name": "Growth Oil Sample",
    "nickname": "A drop of glow",
    "category": "regrowth",
    "tagline": "5ml sample vial",
    "description": "A 5ml sample of our Rosemary & Chebe Growth Oil.",
    "benefits": [
      "Sample size",
      "Try the scent",
      "Pocket friendly"
    ],
    "ingredients": [
      "Rosemary oil",
      "Chebe powder"
    ],
    "howToUse": "Apply a few drops to the scalp and massage.",
    "images": [
      "local:test-sample"
    ],
    "art": {
      "shape": "dropper",
      "body": "#C8862F",
      "cap": "#1B1B1D",
      "label": "#D2B48C",
      "text": "SAMPLE"
    },
    "optionName": "Size",
    "badges": [
      "Test item"
    ],
    "rating": 4.5,
    "reviewCount": 9,
    "variants": [
      {
        "id": "v-test-sample",
        "label": "5ml",
        "price": 20,
        "inStock": true
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-wash-day-kit",
    "slug": "wash-day-kit",
    "name": "Wash Day Kit",
    "nickname": "The full routine",
    "category": "kits",
    "tagline": "Shampoo, conditioner, deep conditioner & leave-in",
    "description": "Everything for a perfect wash day — at half the price this Black Friday.",
    "benefits": [
      "Full 4-step routine",
      "Best value",
      "Perfect gift"
    ],
    "ingredients": [
      "Hibiscus oil",
      "Amla oil",
      "Shea butter",
      "Avocado oil"
    ],
    "howToUse": "Wash, condition, deep-treat weekly and finish with the leave-in daily.",
    "images": [
      "local:wash-day-kit"
    ],
    "art": {
      "shape": "kit",
      "body": "#C8862F",
      "cap": "#F4EEE2",
      "label": "#F4EEE2",
      "text": "WASH DAY"
    },
    "optionName": "Set",
    "badges": [
      "Black Friday",
      "-50%"
    ],
    "rating": 5.0,
    "reviewCount": 142,
    "variants": [
      {
        "id": "v-kit-full",
        "label": "Full kit",
        "price": 11500,
        "inStock": true,
        "compareAtPrice": 23000
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-relaxer-care-kit",
    "slug": "relaxer-care-kit",
    "name": "Relaxer Aftercare Kit",
    "nickname": "Relax, then glow",
    "category": "kits",
    "tagline": "Neutralizing shampoo, protein mask & leave-in",
    "description": "Everything relaxed hair needs in the weeks after a touch-up to stay strong, soft and shiny.",
    "benefits": [
      "Restores strength",
      "Locks in moisture",
      "Salon-fresh for longer"
    ],
    "ingredients": [
      "Keratin",
      "Shea butter",
      "Panthenol"
    ],
    "howToUse": "Neutralize after relaxing, use the mask weekly and the leave-in daily.",
    "images": [
      "local:relaxer-care-kit"
    ],
    "art": {
      "shape": "kit",
      "body": "#11606B",
      "cap": "#EEF0EF",
      "label": "#FFFFFF",
      "text": "AFTERCARE"
    },
    "optionName": "Set",
    "badges": [
      "Save 30%"
    ],
    "rating": 4.8,
    "reviewCount": 64,
    "variants": [
      {
        "id": "v-care-kit",
        "label": "Kit",
        "price": 12500,
        "inStock": true,
        "compareAtPrice": 18500
      }
    ],
    "isNew": false,
    "featured": false
  }
];

export const deliveryOptions: DeliveryOption[] = [
  { id: 'express', label: 'Express', eta: 'Today, 3 – 6 PM', fee: 5000 },
  { id: 'standard', label: 'Standard', eta: '2 – 3 working days', fee: 2500 },
  { id: 'pickup', label: 'Store pickup', eta: 'Ready in 24 hours', fee: 0 },
];

export const promotions = [
  { code: 'BLACKFRIDAY', description: 'Extra 10% off for Black Friday', percentOff: 10, minSubtotal: 0 },
  { code: 'WASHDAY', description: '15% off orders above ₦25,000', percentOff: 15, minSubtotal: 25000 },
] as const;

export const demoAccount = {
  email: 'demo@vash.ng',
  password: 'vash1234',
  user: {
    id: 'u-demo',
    name: 'Ada Okafor',
    email: 'demo@vash.ng',
    address: { line1: '12 Admiralty Way, Lekki Phase 1', city: 'Lagos', state: 'Lagos', phone: '+234 803 000 4412' },
  },
} as const;
