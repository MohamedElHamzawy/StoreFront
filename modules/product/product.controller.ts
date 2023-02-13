import { NextFunction, Request, Response } from 'express';
import HttpError from '../../Common/http-error';
import { product, productModel } from '../../DB/models/product.model';

const controller = new productModel();
const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await controller.index();
    res.status(200).json({ products });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
const showProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await controller.show(id);
    res.status(200).json({ product });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};
const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price } = req.body;
    const p: product = { name, price };
    const added = await controller.create(p);
    res.status(200).json({ msg: 'product added successfully', added });
  } catch (error) {
    return next(new HttpError(`${error}`, 401));
  }
};

export { getAllProduct, showProduct, addProduct };
