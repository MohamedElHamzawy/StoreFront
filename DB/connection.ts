import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let dbname: string;
if (process.env.ENV == 'dev') {
  dbname = process.env.DB_NAME as string;
} else {
  dbname = process.env.DB_NAME_TEST as string;
}
const client = new Pool({
  host: process.env.DB_HOST,
  database: dbname,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default client;
