/** Domain contract shared with the backend API (backend/src/modules/*). */

export type ProductCategory = 'treatment' | 'cleanse' | 'moisture' | 'styling' | 'extensions' | 'kits';

export type ArtShape =
  | 'bottle'
  | 'pump'
  | 'jar'
  | 'tin'
  | 'tube'
  | 'dropper'
  | 'spray'
  | 'box'
  | 'kit'
  | 'hairpack'
  | 'braidpack';

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
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
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
  productId: string;
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address;
}

export interface AuthSession {
  token: string;
  user: User;
}

export type DeliveryOptionId = 'express' | 'standard';

export interface DeliveryOption {
  id: DeliveryOptionId;
  label: string;
  eta: string;
  fee: number;
}

export type PaymentMethod = 'bank_transfer' | 'card' | 'pay_on_delivery';

export type OrderStatus = 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered';

export interface OrderLine {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  image: string;
  art: ProductArt;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export type PaymentInstruction =
  | { type: 'bank_transfer'; bankName: string; accountName: string; accountNumber: string; reference: string; amount: number }
  | { type: 'card'; authorizationUrl?: string; reference: string; sandbox: boolean }
  | { type: 'pay_on_delivery'; amount: number };

export interface Order {
  id: string;
  reference: string;
  lines: OrderLine[];
  totals: OrderTotals;
  promoCode?: string;
  delivery: { option: DeliveryOptionId; eta: string; address: Address; recipient: string };
  payment: { method: PaymentMethod; status: string; instruction: PaymentInstruction };
  status: OrderStatus;
  history: { status: OrderStatus; at: string }[];
  rider?: { name: string; phone: string; rating: number };
  createdAt: string;
}

export interface CreateOrderInput {
  items: { productId: string; variantId: string; quantity: number }[];
  delivery: { option: DeliveryOptionId; recipient: string; address: Address };
  paymentMethod: PaymentMethod;
  promoCode?: string;
}

export interface PromoResult {
  code: string;
  description: string;
  discount: number;
}
