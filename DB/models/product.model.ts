import HttpError from '../../Common/http-error';
import client from '../connection';

export type product = {
  name: string;
  price: number;
};

export class productModel {
  async index(): Promise<product[] | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async show(id: string): Promise<product | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async create(p: product): Promise<product | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products(pname,price) VALUES ($1,$2)`;
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
}
