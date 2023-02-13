import supertest from 'supertest';
import { app } from '../../app';

const request = supertest(app);

describe('user routes', () => {
  it('tests GET /', () => {
    request.get('/api/user/').expect(200);
  });
  it('tests POST /', () => {
    request.post('/api/user/').expect(200);
  });
  it('tests GET /:id', () => {
    request.get('/api/user/1').expect(200);
  });
  it('tests POST /login', () => {
    request.post('/api/user/login').expect(200);
  });
});
describe('product routes', () => {
  it('tests GET /', () => {
    request.get('/api/product/').expect(200);
  });
  it('test POST /', () => {
    request.post('/api/product/').expect(200);
  });
  it('test GET /:id', () => {
    request.get('/api/product/1').expect(200);
  });
});
describe('order routes', () => {
  it('tests GET /', () => {
    request.get('/api/order/').expect(200);
  });
  it('tests POST /:id/prodect', () => {
    request.post('/api/order/1/product').expect(200);
  });
  it('tests GET /:id/prodect', () => {
    request.get('/api/order/1/product').expect(200);
  });
});
