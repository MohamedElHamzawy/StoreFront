import client from '../../DB/connection';
import { order, order_products } from '../../DB/models/order.model';
import { product } from '../../DB/models/product.model';
import { user } from '../../DB/models/user.model';

describe('CRUD operations on users table', () => {
  it('tests create query', async () => {
    const u: user = {
      firstname: 'mohamed',
      lastname: 'elhamzawy',
      email: 'mohamed.f.elhamzawy',
      pass_word: 'udacity_',
    };
    const role = 'user';
    const conn = await client.connect();
    const sql = `INSERT INTO users(firstname,lastname,email,pass_word,user_role) VALUES 
              ($1,$2,$3,$4,$5) RETURNING id`;
    const result = await conn.query(sql, [
      u.firstname,
      u.lastname,
      u.email,
      u.pass_word,
      role,
    ]);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests index query', async () => {
    const conn = await client.connect();
    const sql = `SELECT * FROM users`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests show query', async () => {
    const conn = await client.connect();
    const sql = `SELECT * FROM users WHERE id=1`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests authenticate query', async () => {
    const email = 'mohamed.f.elhamzawy'
    const pass_word = 'udacity_'
    const conn = await client.connect();
    const sql = `SELECT * FROM users WHERE users.email=($1) AND users.pass_word=($2)`;
    const result = await conn.query(sql,[email,pass_word]);
    expect(result).toBeDefined();
    conn.release();
  });
});
describe('CRUD operations on products table', () => {
  it('tests create query', async () => {
    const p: product = {
      name: 'book',
      price: 100,
    };
    const conn = await client.connect();
    const sql = `INSERT INTO products(pname,price) VALUES ($1,$2)`;
    const result = await conn.query(sql, [p.name, p.price]);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests index query', async () => {
    const conn = await client.connect();
    const sql = `SELECT * FROM products`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests show query', async () => {
    const conn = await client.connect();
    const sql = `SELECT * FROM products WHERE id=1`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
});
describe('CRUD operations on orders table', () => {
  it('tests createOrder(create) query', async () => {
    const o: order = {
      userID: 1,
      orderStatus: "active",
    };
    const conn = await client.connect();
    const sql = `INSERT INTO orders(user_id,orderStatus) VALUES ($1,$2)`;
    const result = await conn.query(sql, [o.userID, o.orderStatus]);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests getAllOrders(index) query', async () => {
    const conn = await client.connect();
    const sql = `SELECT * FROM orders`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests currentOrder(show) query', async () => {
    const o: order = {
      userID: 1,
      orderStatus: "active",
    };
    const conn = await client.connect();
    const sql = `INSERT INTO orders(user_id,orderStatus) VALUES ($1,$2)`;
    const result = await conn.query(sql, [o.userID, o.orderStatus]);
    expect(result).toBeDefined();
    conn.release();
  });
});
describe('CRUD operations on order_products table', () => {
  it('tests addProduct(create) query', async () => {
    const op: order_products = {
      order_id: 1,
      product_id: 1,
      quantity: 4,
    };
    const conn = await client.connect();
    const sql = `INSERT INTO order_products (order_id,product_id,quantity) VALUES ($1,$2,$3)`;
    const result = await conn.query(sql, [
      op.order_id,
      op.product_id,
      op.quantity,
    ]);
    expect(result).toBeDefined();
    conn.release();
  });
  it('tests showProducts(show) query', async () => {
    const conn = await client.connect();
    const sql = `SELECT pname,price,quantity FROM products p INNER JOIN order_products op ON p.id=op.product_id WHERE op.order_id=1`;
    const result = await conn.query(sql);
    expect(result).toBeDefined();
    conn.release();
  });
});