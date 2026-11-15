import type {
  AuthSession,
  Category,
  CreateOrderInput,
  Order,
  Product,
  ProductCategory,
  PromoResult,
} from '@/types/domain';

export interface ProductQuery {
  category?: ProductCategory;
  q?: string;
}

/** The app talks to this contract only — never to fetch or demo data directly. */
export interface Api {
  auth: {
    login(email: string, password: string): Promise<AuthSession>;
    register(name: string, email: string, password: string): Promise<AuthSession>;
  };
  catalog: {
    products(query?: ProductQuery): Promise<Product[]>;
    product(id: string): Promise<Product>;
    categories(): Promise<Category[]>;
  };
  promotions: {
    validate(code: string, subtotal: number): Promise<PromoResult>;
  };
  orders: {
    create(input: CreateOrderInput): Promise<Order>;
    list(): Promise<Order[]>;
    get(id: string): Promise<Order>;
    /** Customer confirms the bank transfer has been sent. */
    reportTransfer(id: string): Promise<Order>;
  };
}
