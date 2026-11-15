import { BadRequest, Forbidden, NotFound } from '../../core/errors.js';
import { newId, newOrderRef } from '../../shared/ids.js';
import type { AuthService } from '../auth/auth.service.js';
import { paymentService } from '../payments/payment.service.js';
import type { ProductService } from '../products/product.service.js';
import { promotionService } from '../promotions/promotion.service.js';
import { priceOrder } from './order.pricing.js';
import type { OrderRepository } from './order.repository.js';
import type { CreateOrderBody } from './order.schema.js';
import { DELIVERY_OPTIONS, type Order, type OrderLine, type OrderStatus } from './order.types.js';

const DEFAULT_RIDER = { name: 'Tunde A.', phone: '+2348030000000', rating: 4.9 };

interface Deps {
  orders: OrderRepository;
  products: ProductService;
  auth: AuthService;
}

export const createOrderService = ({ orders, products, auth }: Deps) => {
  const ownedOrder = async (userId: string, id: string) => {
    const order = await orders.findById(id);
    if (!order) throw NotFound('Order');
    if (order.userId !== userId) throw Forbidden();
    return order;
  };

  return {
    async create(userId: string, body: CreateOrderBody): Promise<Order> {
      const user = await auth.me(userId);

      const lines: OrderLine[] = await Promise.all(
        body.items.map(async ({ productId, variantId, quantity }) => {
          const { product, variant } = await products.resolveVariant(productId, variantId);
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
        }),
      );

      const delivery = DELIVERY_OPTIONS[body.delivery.option];
      const subtotal = priceOrder(lines, 0).subtotal;
      const promo = body.promoCode ? promotionService.find(body.promoCode) : undefined;
      const discount = promo ? promotionService.discountFor(promo, subtotal) : 0;
      const totals = priceOrder(lines, delivery.fee, discount);

      const reference = newOrderRef();
      const provider = paymentService.provider(body.paymentMethod);
      const instruction = await provider.initiate({ reference, amount: totals.total, email: user.email });
      const now = new Date().toISOString();

      return orders.save({
        id: newId(),
        reference,
        userId,
        lines,
        totals,
        promoCode: promo?.code,
        delivery: { option: delivery.id, eta: delivery.eta, address: body.delivery.address, recipient: body.delivery.recipient },
        payment: { method: body.paymentMethod, status: provider.initialStatus, instruction },
        status: provider.requiresPayment ? 'awaiting_payment' : 'confirmed',
        history: [{ status: provider.requiresPayment ? 'awaiting_payment' : 'confirmed', at: now }],
        rider: DEFAULT_RIDER,
        createdAt: now,
      });
    },

    list: (userId: string) => orders.listByUser(userId),

    get: ownedOrder,

    /** Customer says the bank transfer is done; the owner now verifies it. */
    async reportTransfer(userId: string, id: string): Promise<Order> {
      const order = await ownedOrder(userId, id);
      if (order.payment.method !== 'bank_transfer') throw BadRequest('This order is not paid by transfer');
      if (order.status !== 'awaiting_payment') return order;
      return orders.save({
        ...order,
        status: 'payment_review',
        payment: { ...order.payment, status: 'transfer_reported' },
        history: [...order.history, { status: 'payment_review', at: new Date().toISOString() }],
      });
    },

    /** Owner action: the money arrived — the order is now confirmed. */
    async confirmPayment(id: string): Promise<Order> {
      const order = await orders.findById(id);
      if (!order) throw NotFound('Order');
      return orders.save({
        ...order,
        status: 'confirmed',
        payment: { ...order.payment, status: 'paid' },
        history: [...order.history, { status: 'confirmed', at: new Date().toISOString() }],
      });
    },

    /** Admin/ops action: move an order along its delivery timeline. */
    async updateStatus(id: string, status: OrderStatus): Promise<Order> {
      const order = await orders.findById(id);
      if (!order) throw NotFound('Order');
      return orders.save({
        ...order,
        status,
        history: [...order.history, { status, at: new Date().toISOString() }],
      });
    },
  };
};

export type OrderService = ReturnType<typeof createOrderService>;
