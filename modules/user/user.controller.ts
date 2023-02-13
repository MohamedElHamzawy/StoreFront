import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user, userModel } from '../../DB/models/user.model';
import { order, orderModel } from '../../DB/models/order.model';
import HttpError from '../../Common/http-error';

const salt: number = parseInt(process.env.SALT as string);
const pepper: string = process.env.PEPPER as string;
const key: string = process.env.TOKEN_KEY as string;
const controller = new userModel();
const orderController = new orderModel();

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await controller.index();
    res.status(200).json({ users });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await controller.show(id);
    res.status(200).json({ user });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const pass_word = bcrypt.hashSync(password + pepper, salt);
    const newUser: user = { firstname, lastname, email, pass_word };
    const u = await controller.create(newUser);
    const o: order = { userID: u, orderStatus: 'active' };
    await orderController.createOrder(o);
    const token = jwt.sign(u.toString(), key);
    res.status(200).json({ msg: 'Signed up successfully !!', token });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const auth = await controller.authenticate(email, password);
    if (auth != 0) {
      await orderController.currentOrder(auth);
      const token = jwt.sign(auth.toString(), key);
      res.status(200).json({ msg: 'Logged in succefully!', token });
    } else {
      res.status(400).json({ error: 'Email or Password is incorrect' });
    }
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};

export { getAllUsers, userSignUp, userLogin, showUser };
