import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../core/middleware/validate.js';
import { promotionService } from './promotion.service.js';

const ValidateBody = z.object({ code: z.string().min(1), subtotal: z.number().nonnegative() });

export const promotionRoutes = () =>
  Router().post('/promotions/validate', validate(ValidateBody), (req, res) => {
    const { code, subtotal } = req.body as z.infer<typeof ValidateBody>;
    const promo = promotionService.find(code);
    res.json({ data: { ...promo, discount: promotionService.discountFor(promo, subtotal) } });
  });
