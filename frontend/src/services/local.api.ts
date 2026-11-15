import AsyncStorage from '@react-native-async-storage/async-storage';
import { categorySeed, deliveryOptions, demoAccount, productSeed, promotions } from '@/data/catalog';
import { ApiError } from '@/lib/http';
import { cardPaymentsEnabled, payoutAccount } from '@/config/payments';
import type { Order, OrderStatus, Product } from '@/types/domain';
import type { Api } from './api.types';

/**
 * In-app implementation of the API contract, backed by the demo catalogue.
 * It mirrors backend business rules (pricing, promos, validation) so screens
 * behave identically once EXPO_PUBLIC_API_URL points at the real server.
 */

const ORDERS_KEY = 'velora.local.orders';
const latency = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const findProduct = (id: string): Product => {
  const product = productSeed.find((p) => p.id === id || p.slug === id);
  if (!product) throw new ApiError('Product not found', 404);
  return product;
};

const findPromo = (code: string) => {
  const promo = promotions.find((p) => p.code === code.trim().toUpperCase());
  if (!promo) throw new ApiError('This promo code is not valid', 400);
  return promo;
};

const discountFor = (code: string, subtotal: number) => {
  const promo = findPromo(code);
  if (subtotal < promo.minSubtotal) {
    throw new ApiError(`${promo.code} needs a subtotal of ₦${promo.minSubtotal.toLocaleString()}`, 400);
  }
  return { promo, discount: Math.round((subtotal * promo.percentOff) / 100) };
};

/** Demo-only: moves orders along the delivery timeline as time passes. */
const TIMELINE: { status: OrderStatus; afterMinutes: number }[] = [
  { status: 'confirmed', afterMinutes: 0 },
  { status: 'packed', afterMinutes: 1 },
  { status: 'out_for_delivery', afterMinutes: 3 },
  { status: 'delivered', afterMinutes: 45 },
];

const withSimulatedProgress = (order: Order): Order => {
  // Unpaid or unverified transfers wait for the owner — nothing to simulate.
  if (order.status === 'awaiting_payment' || order.status === 'payment_review') return order;
  const placed = new Date(order.createdAt).getTime();
  const elapsed = (Date.now() - placed) / 60000;
  const history = TIMELINE.filter((t) => elapsed >= t.afterMinutes).map((t) => ({
    status: t.status,
    at: new Date(placed + t.afterMinutes * 60000).toISOString(),
  }));
  return { ...order, history, status: history[history.length - 1]?.status ?? 'confirmed' };
};

const readOrders = async (): Promise<Order[]> =>
  JSON.parse((await AsyncStorage.getItem(ORDERS_KEY)) ?? '[]') as Order[];

const writeOrders = (orders: Order[]) => AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

export const localApi: Api = {
  auth: {
    async login(email, password) {
      await latency(700);
      const matchesDemo = email.trim().toLowerCase() === demoAccount.email && password === demoAccount.password;
      if (!matchesDemo && password.length < 8) throw new ApiError('Email or password is incorrect', 401);
      const user = matchesDemo
        ? demoAccount.user
        : { id: `u-${email}`, name: email.split('@')[0] ?? 'Gorgeous', email, address: demoAccount.user.address };
      return { token: `local.${user.id}`, user: { ...user } };
    },
    async register(name, email, password) {
      await latency(700);
      if (password.length < 8) throw new ApiError('Use at least 8 characters', 400);
      return { token: `local.${email}`, user: { id: `u-${email}`, name, email } };
    },
  },

  catalog: {
    async products(query) {
      await latency(250);
      const term = query?.q?.toLowerCase();
      return productSeed.filter(
        (p) =>
          (!query?.category || p.category === query.category) &&
          (!term || `${p.name} ${p.nickname} ${p.tagline}`.toLowerCase().includes(term)),
      );
    },
    async product(id) {
      await latency(150);
      return findProduct(id);
    },
    async categories() {
      return categorySeed;
    },
  },

  promotions: {
    async validate(code, subtotal) {
      await latency(500);
      const { promo, discount } = discountFor(code, subtotal);
      return { code: promo.code, description: promo.description, discount };
    },
  },

  orders: {
    async create(input) {
      await latency(1400);
      if (!input.items.length) throw new ApiError('Your bag is empty', 400);
      if (input.paymentMethod === 'card' && !cardPaymentsEnabled) {
        throw new ApiError('Card payments are not available yet. Please choose bank transfer.', 400);
      }

      const lines = input.items.map(({ productId, variantId, quantity }) => {
        const product = findProduct(productId);
        const variant = product.variants.find((v) => v.id === variantId);
        if (!variant) throw new ApiError('Product variant not found', 404);
        return {
          productId,
          variantId,
          name: product.name,
          variantLabel: variant.label,
          image: product.images[0] ?? '',
          art: product.art,
          unitPrice: variant.price,
          quantity,
          lineTotal: variant.price * quantity,
        };
      });

      const delivery = deliveryOptions.find((d) => d.id === input.delivery.option) ?? deliveryOptions[0]!;
      const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
      const promo = input.promoCode ? discountFor(input.promoCode, subtotal) : undefined;
      const discount = Math.min(promo?.discount ?? 0, subtotal);
      const total = subtotal - discount + delivery.fee;
      const reference = `LH-${Math.floor(10000 + Math.random() * 89999)}`;
      const now = new Date().toISOString();

      const instruction: Order['payment']['instruction'] =
        input.paymentMethod === 'bank_transfer'
          ? { type: 'bank_transfer', ...payoutAccount, reference, amount: total }
          : input.paymentMethod === 'card'
            ? { type: 'card', reference, sandbox: true }
            : { type: 'pay_on_delivery', amount: total };

      const order: Order = {
        id: reference,
        reference,
        lines,
        totals: { subtotal, discount, deliveryFee: delivery.fee, total },
        promoCode: promo?.promo.code,
        delivery: { option: delivery.id, eta: delivery.eta, address: input.delivery.address, recipient: input.delivery.recipient },
        payment: { method: input.paymentMethod, status: 'pending', instruction },
        status: input.paymentMethod === 'pay_on_delivery' ? 'confirmed' : 'awaiting_payment',
        history: [{ status: input.paymentMethod === 'pay_on_delivery' ? 'confirmed' : 'awaiting_payment', at: now }],
        rider: { name: 'Tunde A.', phone: '+2348030000000', rating: 4.9 },
        createdAt: now,
      };
      await writeOrders([order, ...(await readOrders())]);
      return order;
    },

    async list() {
      return (await readOrders()).map(withSimulatedProgress);
    },

    async reportTransfer(id) {
      await latency(700);
      const orders = await readOrders();
      const order = orders.find((o) => o.id === id);
      if (!order) throw new ApiError('Order not found', 404);
      const updated: Order = {
        ...order,
        status: 'payment_review',
        payment: { ...order.payment, status: 'transfer_reported' },
        history: [...order.history, { status: 'payment_review', at: new Date().toISOString() }],
      };
      await writeOrders(orders.map((o) => (o.id === id ? updated : o)));
      return updated;
    },

    async get(id) {
      const order = (await readOrders()).find((o) => o.id === id);
      if (!order) throw new ApiError('Order not found', 404);
      return withSimulatedProgress(order);
    },
  },
};
