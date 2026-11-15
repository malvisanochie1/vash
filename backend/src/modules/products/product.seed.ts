import type { Category, Product } from './product.types.js';

/**
 * Catalogue seed. Prices are placeholders until final pricing is confirmed.
 */
export const categorySeed: Category[] = [
  {
    "id": "treatment",
    "name": "Treatment",
    "productId": "p-relaxer-kit"
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
    "id": "extensions",
    "name": "Weavon",
    "productId": "p-silky-weavon"
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
    "howToUse": "Base the scalp and hairline. Mix activator into crème, apply to dry unwashed hair from roots, smooth and rinse within the recommended time. Finish with the neutralizing shampoo.",
    "images": [],
    "art": {
      "shape": "box",
      "body": "#E0217A",
      "cap": "#3A1027",
      "label": "#FFFFFF",
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
    "howToUse": "Patch test 48 hours before. Apply a protective base, then follow the kit steps carefully. Not for use on children under 6.",
    "images": [],
    "art": {
      "shape": "box",
      "body": "#F7B8D2",
      "cap": "#E0217A",
      "label": "#FFFFFF",
      "text": "KIDDIES"
    },
    "optionName": "Kit",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 138,
    "variants": [
      {
        "id": "v-kids-std",
        "label": "Standard",
        "price": 4800,
        "inStock": true,
        "compareAtPrice": 6000
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
    "images": [],
    "art": {
      "shape": "jar",
      "body": "#FFFFFF",
      "cap": "#E0217A",
      "label": "#FADDE9",
      "text": "REPAIR"
    },
    "optionName": "Size",
    "badges": [
      "New"
    ],
    "rating": 4.9,
    "reviewCount": 96,
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
      "body": "#E0217A",
      "cap": "#FFFFFF",
      "label": "#FFFFFF",
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
    "id": "p-scalp-treatment",
    "slug": "scaltreatment",
    "name": "Anti-Dandruff Scalp Treatment",
    "nickname": "Calm, clear scalp",
    "category": "treatment",
    "tagline": "Tea tree & peppermint scalp relief",
    "description": "A soothing scalp serum that lifts flakes, calms itch and keeps your scalp balanced under braids, weaves and wigs.",
    "benefits": [
      "Lifts flakes",
      "Soothes itch",
      "Great under protective styles"
    ],
    "ingredients": [
      "Tea tree oil",
      "Peppermint oil",
      "Salicylic acid"
    ],
    "howToUse": "Part hair and apply directly to the scalp 2–3 times a week. Massage gently.",
    "images": [],
    "art": {
      "shape": "dropper",
      "body": "#7BC8A4",
      "cap": "#3A1027",
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
    "description": "Single-use hot oil tubes that melt into the hair shaft for deep softness and mirror shine.",
    "benefits": [
      "Deep softness",
      "Mirror shine",
      "Pre-measured tubes"
    ],
    "ingredients": [
      "Coconut oil",
      "Jojoba oil",
      "Vitamin E"
    ],
    "howToUse": "Warm a tube in hot water for 1 minute, apply to damp hair, cover for 10 minutes and rinse.",
    "images": [],
    "art": {
      "shape": "tube",
      "body": "#E8B04B",
      "cap": "#3A1027",
      "label": "#FFFFFF",
      "text": "HOT OIL"
    },
    "optionName": "Pack",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 54,
    "variants": [
      {
        "id": "v-hotoil-3",
        "label": "3 tubes",
        "price": 3500,
        "inStock": true,
        "compareAtPrice": 4500
      },
      {
        "id": "v-hotoil-6",
        "label": "6 tubes",
        "price": 6500,
        "inStock": true,
        "compareAtPrice": 8500
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
    "tagline": "Hibiscus, Amla & Rooibos oils",
    "description": "A sulphate-conscious cleanse that lifts build-up without stripping moisture. Hibiscus supports the scalp while Amla helps prevent breakage.",
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
    "images": [],
    "art": {
      "shape": "bottle",
      "body": "#E0217A",
      "cap": "#E0217A",
      "label": "#FFFFFF",
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
        "id": "v-sham-250",
        "label": "250ml",
        "price": 4500,
        "inStock": true,
        "compareAtPrice": 6500
      },
      {
        "id": "v-sham-400",
        "label": "400ml",
        "price": 6900,
        "inStock": true,
        "compareAtPrice": 9500
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-conditioner",
    "slug": "conditioner",
    "name": "Hibiscus Detangling Conditioner",
    "nickname": "Rinse me smooth",
    "category": "cleanse",
    "tagline": "Slip-rich, knot-melting formula",
    "description": "Melts knots away, hydrates every strand and leaves curls soft and easy to style.",
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
    "images": [],
    "art": {
      "shape": "bottle",
      "body": "#FFF4E8",
      "cap": "#FFFFFF",
      "label": "#E0217A",
      "text": "CONDITIONER"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.9,
    "reviewCount": 187,
    "variants": [
      {
        "id": "v-cond-250",
        "label": "250ml",
        "price": 4500,
        "inStock": true,
        "compareAtPrice": 6500
      },
      {
        "id": "v-cond-400",
        "label": "400ml",
        "price": 6900,
        "inStock": true,
        "compareAtPrice": 9500
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-neutralizing",
    "slug": "neutralizing",
    "name": "Neutralizing Shampoo",
    "nickname": "Relaxer's best friend",
    "category": "cleanse",
    "tagline": "Colour-signal formula restores pH after relaxing",
    "description": "Stops the relaxer process and restores your hair's natural pH. The pink lather turns white when all relaxer is gone.",
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
    "images": [],
    "art": {
      "shape": "bottle",
      "body": "#F7B8D2",
      "cap": "#3A1027",
      "label": "#FFFFFF",
      "text": "NEUTRAL"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 93,
    "variants": [
      {
        "id": "v-neut-250",
        "label": "250ml",
        "price": 3900,
        "inStock": true,
        "compareAtPrice": 5000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-deep-conditioner",
    "slug": "deeconditioner",
    "name": "Deep Repair Conditioner",
    "nickname": "Weekly reset",
    "category": "cleanse",
    "tagline": "Avocado & shea intensive conditioner",
    "description": "Restores softness and strength to dry, dull hair. Your wash-day reset in a jar.",
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
    "images": [],
    "art": {
      "shape": "jar",
      "body": "#E0217A",
      "cap": "#E0217A",
      "label": "#FFFFFF",
      "text": "DEEP"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 74,
    "variants": [
      {
        "id": "v-deep-250",
        "label": "250g",
        "price": 6500,
        "inStock": true,
        "compareAtPrice": 9000
      },
      {
        "id": "v-deep-500",
        "label": "500g",
        "price": 10900,
        "inStock": true,
        "compareAtPrice": 15000
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
      "Hibiscus oil",
      "Aloe vera"
    ],
    "howToUse": "Smooth a small amount through damp or dry hair. Do not rinse.",
    "images": [],
    "art": {
      "shape": "jar",
      "body": "#F7B8D2",
      "cap": "#E0217A",
      "label": "#FFFFFF",
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
        "label": "250g",
        "price": 5800,
        "inStock": true,
        "compareAtPrice": 8000
      },
      {
        "id": "v-leave-500",
        "label": "500g",
        "price": 9800,
        "inStock": true,
        "compareAtPrice": 13500
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-hair-cream",
    "slug": "hair-cream",
    "name": "Shea & Coconut Hair Cream",
    "nickname": "Everyday nourishment",
    "category": "moisture",
    "tagline": "Classic hair food for daily softness",
    "description": "A rich, everyday hair cream that nourishes dry hair and scalp, adds sheen and keeps styles neat.",
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
    "images": [],
    "art": {
      "shape": "jar",
      "body": "#FFF4E8",
      "cap": "#6B3E2E",
      "label": "#FFFFFF",
      "text": "CREAM"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 320,
    "variants": [
      {
        "id": "v-cream-150",
        "label": "150g",
        "price": 2800,
        "inStock": true,
        "compareAtPrice": 3800
      },
      {
        "id": "v-cream-300",
        "label": "300g",
        "price": 4800,
        "inStock": true,
        "compareAtPrice": 6500
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
    "category": "moisture",
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
    "howToUse": "Apply a few drops to the scalp, massage for 2 minutes. Use 3–4 times a week.",
    "images": [],
    "art": {
      "shape": "dropper",
      "body": "#E8B04B",
      "cap": "#6B3E2E",
      "label": "#FFFFFF",
      "text": "GROWTH"
    },
    "optionName": "Size",
    "badges": [
      "New",
      "Trending"
    ],
    "rating": 4.9,
    "reviewCount": 156,
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
    "isNew": true,
    "featured": true
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
      "body": "#FFFFFF",
      "cap": "#E0217A",
      "label": "#F7B8D2",
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
    "images": [],
    "art": {
      "shape": "tin",
      "body": "#E0217A",
      "cap": "#3A1027",
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
        "id": "v-edge-50",
        "label": "50g",
        "price": 2500,
        "inStock": true,
        "compareAtPrice": 3500
      },
      {
        "id": "v-edge-100",
        "label": "100g",
        "price": 4200,
        "inStock": true,
        "compareAtPrice": 5800
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-curl-activator",
    "slug": "curl-activator",
    "name": "Curl Defining Activator",
    "nickname": "Bounce on demand",
    "category": "styling",
    "tagline": "Defines curls & coils without crunch",
    "description": "A curl cream-gel that defines, separates and holds curls with soft touchable bounce.",
    "benefits": [
      "Defines curls",
      "Soft hold",
      "Anti-frizz"
    ],
    "ingredients": [
      "Flaxseed gel",
      "Aloe vera",
      "Glycerin"
    ],
    "howToUse": "Apply to soaking-wet hair in sections, rake through and air-dry or diffuse.",
    "images": [],
    "art": {
      "shape": "pump",
      "body": "#E0217A",
      "cap": "#3A1027",
      "label": "#FFFFFF",
      "text": "CURL"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 110,
    "variants": [
      {
        "id": "v-curl-250",
        "label": "250ml",
        "price": 5200,
        "inStock": true,
        "compareAtPrice": 7000
      }
    ],
    "isNew": true,
    "featured": false
  },
  {
    "id": "p-setting-lotion",
    "slug": "setting-lotion",
    "name": "Wrap & Set Lotion",
    "nickname": "Salon-smooth sets",
    "category": "styling",
    "tagline": "For roller sets, wraps and silk presses",
    "description": "Gives roller sets and wraps lasting body and shine while protecting from heat.",
    "benefits": [
      "Heat protection",
      "Long-lasting body",
      "Brilliant shine"
    ],
    "ingredients": [
      "Silk amino acids",
      "Panthenol",
      "Argan oil"
    ],
    "howToUse": "Apply to damp hair before setting, wrapping or blow-drying.",
    "images": [],
    "art": {
      "shape": "bottle",
      "body": "#F7B8D2",
      "cap": "#E0217A",
      "label": "#FFFFFF",
      "text": "SETTING"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.5,
    "reviewCount": 47,
    "variants": [
      {
        "id": "v-set-250",
        "label": "250ml",
        "price": 3800,
        "inStock": true,
        "compareAtPrice": 5000
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-braid-spray",
    "slug": "braid-spray",
    "name": "Braid & Scalp Refresh Spray",
    "nickname": "Fresh under braids",
    "category": "styling",
    "tagline": "Itch relief & shine for protective styles",
    "description": "A cooling spray that relieves itch, refreshes the scalp and adds shine to braids, twists and weaves.",
    "benefits": [
      "Cools & relieves itch",
      "Adds shine",
      "Light mist"
    ],
    "ingredients": [
      "Peppermint oil",
      "Witch hazel",
      "Aloe vera"
    ],
    "howToUse": "Spray directly onto scalp and braids as needed.",
    "images": [],
    "art": {
      "shape": "spray",
      "body": "#7BC8A4",
      "cap": "#E0217A",
      "label": "#FFFFFF",
      "text": "BRAID"
    },
    "optionName": "Size",
    "badges": [],
    "rating": 4.7,
    "reviewCount": 128,
    "variants": [
      {
        "id": "v-spray-250",
        "label": "250ml",
        "price": 3900,
        "inStock": true,
        "compareAtPrice": 5200
      }
    ],
    "isNew": false,
    "featured": false
  },
  {
    "id": "p-silky-weavon",
    "slug": "silky-weavon",
    "name": "Silky Straight Weavon",
    "nickname": "Sleek & swingy",
    "category": "extensions",
    "tagline": "Soft, tangle-free bundles",
    "description": "Silky straight bundles with natural movement and a soft, tangle-free finish. Holds curls and blends easily.",
    "benefits": [
      "Tangle-free",
      "Natural movement",
      "Heat friendly"
    ],
    "ingredients": [
      "Premium fibre blend"
    ],
    "howToUse": "Wash gently with diluted shampoo, condition and air-dry. Store in a hairnet.",
    "images": [],
    "art": {
      "shape": "hairpack",
      "body": "#3A1027",
      "cap": "#E0217A",
      "label": "#1C0F14",
      "text": "STRAIGHT"
    },
    "optionName": "Length",
    "badges": [
      "Weavon"
    ],
    "rating": 4.7,
    "reviewCount": 203,
    "variants": [
      {
        "id": "v-silky-12",
        "label": "12\"",
        "price": 9500,
        "inStock": true,
        "compareAtPrice": 13000
      },
      {
        "id": "v-silky-16",
        "label": "16\"",
        "price": 12500,
        "inStock": true,
        "compareAtPrice": 17000
      },
      {
        "id": "v-silky-20",
        "label": "20\"",
        "price": 15500,
        "inStock": true,
        "compareAtPrice": 21000
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-body-wave",
    "slug": "body-wave",
    "name": "Body Wave Weavon",
    "nickname": "Soft glam waves",
    "category": "extensions",
    "tagline": "Bouncy, voluminous waves",
    "description": "Glamorous body waves with lasting bounce and volume — red-carpet ready from day one.",
    "benefits": [
      "Bouncy waves",
      "Full volume",
      "Low shedding"
    ],
    "ingredients": [
      "Premium fibre blend"
    ],
    "howToUse": "Finger-detangle, wash with diluted shampoo and scrunch while damp.",
    "images": [],
    "art": {
      "shape": "hairpack",
      "body": "#E0217A",
      "cap": "#3A1027",
      "label": "#3B1E14",
      "text": "BODY WAVE"
    },
    "optionName": "Length",
    "badges": [],
    "rating": 4.8,
    "reviewCount": 167,
    "variants": [
      {
        "id": "v-wave-14",
        "label": "14\"",
        "price": 11000,
        "inStock": true,
        "compareAtPrice": 15000
      },
      {
        "id": "v-wave-18",
        "label": "18\"",
        "price": 14500,
        "inStock": true,
        "compareAtPrice": 19500
      }
    ],
    "isNew": true,
    "featured": false
  },
  {
    "id": "p-braid-extension",
    "slug": "braid-extension",
    "name": "Super Pre-Stretched Braid",
    "nickname": "Quick, light braids",
    "category": "extensions",
    "tagline": "Pre-stretched, itch-free braiding hair",
    "description": "Lightweight, pre-stretched braiding hair with tapered ends — faster installs and a natural finish.",
    "benefits": [
      "Pre-stretched",
      "Itch-free",
      "Lightweight"
    ],
    "ingredients": [
      "Hot-water-set fibre"
    ],
    "howToUse": "Separate strands and braid as usual. Dip ends in hot water to seal.",
    "images": [],
    "art": {
      "shape": "braidpack",
      "body": "#F7B8D2",
      "cap": "#E0217A",
      "label": "#1C0F14",
      "text": "BRAID"
    },
    "optionName": "Colour",
    "badges": [
      "Bestseller"
    ],
    "rating": 4.8,
    "reviewCount": 541,
    "variants": [
      {
        "id": "v-braid-1b",
        "label": "1B Black",
        "price": 2200,
        "inStock": true,
        "compareAtPrice": 3000
      },
      {
        "id": "v-braid-30",
        "label": "30 Auburn",
        "price": 2200,
        "inStock": true,
        "compareAtPrice": 3000
      },
      {
        "id": "v-braid-613",
        "label": "613 Blonde",
        "price": 2400,
        "inStock": true,
        "compareAtPrice": 3200
      },
      {
        "id": "v-braid-pink",
        "label": "Pink",
        "price": 2400,
        "inStock": true,
        "compareAtPrice": 3200
      }
    ],
    "isNew": false,
    "featured": true
  },
  {
    "id": "p-kinky-twist",
    "slug": "kinky-twist",
    "name": "Kinky Twist Crochet",
    "nickname": "Effortless twists",
    "category": "extensions",
    "tagline": "Ready-twisted crochet in minutes",
    "description": "Pre-twisted crochet hair with a natural kinky texture — a protective style in under two hours.",
    "benefits": [
      "Pre-twisted",
      "Natural texture",
      "Quick install"
    ],
    "ingredients": [
      "Soft kanekalon blend"
    ],
    "howToUse": "Install on cornrows with a crochet needle. Trim and dip ends to finish.",
    "images": [],
    "art": {
      "shape": "braidpack",
      "body": "#3A1027",
      "cap": "#F7B8D2",
      "label": "#2A1810",
      "text": "TWIST"
    },
    "optionName": "Colour",
    "badges": [],
    "rating": 4.6,
    "reviewCount": 98,
    "variants": [
      {
        "id": "v-kinky-1b",
        "label": "1B Black",
        "price": 3500,
        "inStock": true,
        "compareAtPrice": 4500
      },
      {
        "id": "v-kinky-350",
        "label": "350 Copper",
        "price": 3500,
        "inStock": true,
        "compareAtPrice": 4500
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
    "images": [],
    "art": {
      "shape": "kit",
      "body": "#E0217A",
      "cap": "#3A1027",
      "label": "#FFFFFF",
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
        "id": "v-kit-duo",
        "label": "Duo",
        "price": 8500,
        "inStock": true,
        "compareAtPrice": 13000
      },
      {
        "id": "v-kit-full",
        "label": "Full kit",
        "price": 19500,
        "inStock": true,
        "compareAtPrice": 39000
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
    "images": [],
    "art": {
      "shape": "kit",
      "body": "#F7B8D2",
      "cap": "#E0217A",
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
        "price": 14500,
        "inStock": true,
        "compareAtPrice": 21000
      }
    ],
    "isNew": false,
    "featured": false
  }
];
