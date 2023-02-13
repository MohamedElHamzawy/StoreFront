import { NextFunction, Request, Response } from 'express';
import HttpError from '../../Common/http-error';
import { orderModel, order_products } from '../../DB/models/order.model';

const controller = new orderModel();
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await controller.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order_id = parseInt(req.params.id);
    const { product_id, quantity } = req.body;
    const p: order_products = { order_id, product_id, quantity };
    await controller.addProduct(p);
    const products = await controller.showProducts(order_id);
    res.status(200).json({ products });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
export const showProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order_id = parseInt(req.params.id);
    const products = await controller.showProducts(order_id);
    res.status(200).json({ products });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
