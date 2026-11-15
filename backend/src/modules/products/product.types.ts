export const PRODUCT_CATEGORIES = ['treatment', 'regrowth', 'cleanse', 'moisture', 'styling', 'kits'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const ART_SHAPES = ['bottle', 'pump', 'jar', 'tin', 'tube', 'dropper', 'spray', 'box', 'kit'] as const;
export type ArtShape = (typeof ART_SHAPES)[number];

/** Illustrated packshot spec, used until real product photography is uploaded. */
export interface ProductArt {
  shape: ArtShape;
  body: string;
  cap: string;
  label: string;
  text: string | null;
}

export interface ProductVariant {
  id: string;
  label: string;
  /** Prices are stored in kobo-free whole Naira. */
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Short playful line printed on the pack. */
  nickname: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  /** Absolute photo URLs; when empty the app renders `art`. */
  images: string[];
  art: ProductArt;
  /** What the variants represent: Size, Strength, Length, Colour… */
  optionName: string;
  badges: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  isNew: boolean;
  featured: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  /** Product whose art represents the category. */
  productId: string;
}
