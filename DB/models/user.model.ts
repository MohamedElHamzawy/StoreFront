import client from '../connection';
import bcrybt from 'bcrypt';
import dotenv from 'dotenv';
import HttpError from '../../Common/http-error';
dotenv.config();

export type user = {
  firstname: string;
  lastname: string;
  email: string;
  pass_word: string;
};

export class userModel {
  async index(): Promise<user[] | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async create(u: user): Promise<number | HttpError> {
    try {
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
      conn.release();
      return result.rows[0].id;
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async show(id: string): Promise<user | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
  async authenticate(
    email: string,
    password: string
  ): Promise<number | HttpError> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE users.email=($1)`;
      const result = await conn.query(sql, [email]);
      conn.release;
      const check = bcrybt.compareSync(
        password + (process.env.PEPPER as string),
        result.rows[0].pass_word
      );
      if (check) {
        return result.rows[0].id;
      } else {
        return 0;
      }
    } catch (error) {
      return new HttpError(`${error}`, 404);
    }
  }
}
