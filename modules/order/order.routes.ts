import { Router } from 'express';
import authorizationer from '../../middleware/authorization';
import validationer from '../../middleware/validation';
import { addProduct, getAllOrders, showProducts } from './order.controller';
import {
  addProductValidation,
  showProductsValidation,
} from './order.validation';

export const router = Router();
router.get('/', getAllOrders);
router.get(
  '/:id/product',
  validationer(showProductsValidation),
  authorizationer,
  showProducts
);
router.post(
  '/:id/product',
  validationer(addProductValidation),
  authorizationer,
  addProduct
);
