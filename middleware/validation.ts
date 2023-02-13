/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import HttpError from '../Common/http-error';

const headers = ['body', 'params'];
// @ts-ignore
const validationer = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    headers.forEach((key) => {
      if (schema[key]) {
        // @ts-ignore
        const val = schema[key].validate(req[key]);
        if (val.error) {
          return new HttpError(`${val.error.details[0].message}`, 400);
        }
      }
    });
    next();
  };
};
export default validationer;
