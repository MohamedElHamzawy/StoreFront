import { Router } from 'express';
import authorizationer from '../../middleware/authorization';
import validationer from '../../middleware/validation';
import { addProduct, getAllProduct, showProduct } from './product.controller';
import {
  addProductValidation,
  showProductValidation,
} from './product.validation';

export const router = Router();

router.get('/', getAllProduct);
router.get('/:id', validationer(showProductValidation), showProduct);
router.post(
  '/',
  validationer(addProductValidation),
  authorizationer,
  addProduct
);
