/* eslint-disable no-undef */
import '@babel/polyfill';
import request from 'supertest';
import { verifyToken } from '../utils';
import { app } from '../app';
import User from '../models/user';

const { JWT_SECRET } = process.env;
const mockUserLogin = { regNumber: 219988048, password: '123456' };
const mockUser = {
  name: 'John Doe',
  regNumber: 219988048,
  password: '$2a$12$Fj7iC47MBKv2lFEqom27Iu0e8Kv8ViUWS3UBbRKtv7j4oR7GwFXfW', // 123456
  campus: 'CST',
  school: 'ENG',
  department: 'EEE',
  class: 'ETE',
};

beforeEach(async () => {
  await User.deleteMany();
});
afterEach(async () => {
  await User.deleteMany();
});
describe('Read: ', () => {
  it('read all', async () => {
    const res = await request(app).get('/api/v1/users/');
    expect.assertions(3);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('count');
  });
  it('read single', async () => {
    const user = await User.create(mockUser);
    const res = await request(app).get(`/api/v1/users/${user._id}`);
    expect.assertions(4);
    expect(res.body.success).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('_id');
  });
});
describe('Auth: ', () => {
  it('login', async () => {
      await User.create(mockUser);
      const res = await request(app)
        .post('/api/v1/users/login')
        .send(mockUserLogin);
      expect.assertions(6);
      expect(res.body.success).toBe(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      const decoded = verifyToken(res.body.token, JWT_SECRET);
      expect(decoded).toHaveProperty('regNumber');
      expect(decoded).toHaveProperty('name');
      expect(decoded.regNumber).toBe(mockUser.regNumber);
  });
});
