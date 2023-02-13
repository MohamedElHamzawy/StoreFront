import express, { Application } from 'express';
import dotenv from 'dotenv';
import { orderRoutes, productRoutes, userRoutes } from './routes/allRoutes';

export const app: Application = express();

dotenv.config();
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.listen(process.env.PORT, (): void => console.log('Server is Running...'));
