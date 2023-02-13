import { Router } from 'express';
import authorizationer from '../../middleware/authorization';
import validationer from '../../middleware/validation';
import {
  getAllUsers,
  userLogin,
  userSignUp,
  showUser,
} from './user.controller';
import {
  showUserValidation,
  userLoginValidation,
  userSignUpValidation,
} from './user.validation';

export const router = Router();
router.get('/', authorizationer, getAllUsers);
router.get('/:id', validationer(showUserValidation), authorizationer, showUser);
router.post('/', validationer(userSignUpValidation), userSignUp);
router.post('/login', validationer(userLoginValidation), userLogin);
