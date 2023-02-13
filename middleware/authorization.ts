/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../Common/http-error';
import { user, userModel } from '../DB/models/user.model';

const key: string = process.env.TOKEN_KEY as string;
const controller = new userModel();

const authorizationer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer')) {
    return new HttpError(`There is no token`, 401);
  } else {
    // @ts-ignore
    const token = header.split(' ')[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = jwt.verify(token, key) as string;
    controller
      .show(id)
      .then((u: user | HttpError) => {
        // @ts-ignore
        req.user = u;
        next();
      })
      .catch((err) => res.json({ error: 'Invalid token', err }));
  }
};
export default authorizationer;
