import HttpError from '../../Common/http-error';
import client from '../connection';

export type order = {
  userID: number | HttpError;
  orderStatus: string;
};
export type order_products = {
  order_id: number;
  product_id: number;
  quantity: number;
};
export class orderModel {
  async getAllOrders(): Promise<order[] | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async currentOrder(userID: number | HttpError): Promise<order | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=${userID}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async createOrder(o: order): Promise<order | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders(user_id,orderStatus) VALUES ($1,$2)`;
      const result = await conn.query(sql, [o.userID, o.orderStatus]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async addProduct(op: order_products): Promise<order_products | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3)`;
      const result = await conn.query(sql, [
        op.order_id,
        op.product_id,
        op.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async showProducts(orderID: number) {
    try {
      const conn = await client.connect();
      const sql = `SELECT pname,price,quantity FROM products p INNER JOIN order_products op ON p.id=op.product_id WHERE op.order_id=${orderID}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
}
