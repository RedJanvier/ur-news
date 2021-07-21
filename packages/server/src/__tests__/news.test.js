/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '@babel/polyfill';
import request from 'supertest';
import { signToken } from '../utils';
import News from '../models/news';
import User from '../models/user';
import { app } from '../app';

const { JWT_SECRET } = process.env;
const mockUser = {
  name: 'John Doe',
  regNumber: 219988048,
  password: '$2a$12$Fj7iC47MBKv2lFEqom27Iu0e8Kv8ViUWS3UBbRKtv7j4oR7GwFXfW', // 123456
  campus: 'CST',
  school: 'ENG',
  department: 'EEE',
  class: 'ETE',
};
const mockNews = {
  title: 'test news',
  creator: 'fake'
}

beforeEach(async () => {
  await User.deleteMany();
  await News.deleteMany();
});
afterEach(async () => {
  await News.deleteMany();
  await User.deleteMany();
});
describe('Read News: ', () => {
  it('read all News', async () => {
    const user = await User.create(mockUser);
    const fakeLoginToken = signToken({ ...user, userId: user._id }, JWT_SECRET, 1*60);
    await News.create({...mockNews, creator: user._id});
    const res = await request(app)
      .get('/api/v1/news/')
      .set('Authorization', `Bearer ${fakeLoginToken}`);
    expect.assertions(4);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('count');
    expect(res.body.data.length).toBe(res.body.count);
  });
  it('read single News', async () => {
    const user = await User.create(mockUser);
    const fakeLoginToken = signToken({ ...user, userId: user._id }, JWT_SECRET, 1*60);
    const news = await News.create({...mockNews, creator: user._id});
    const res = await request(app)
      .get(`/api/v1/news/${news._id}`)
      .set('Authorization', `Bearer ${fakeLoginToken}`);
    expect.assertions(4);
    expect(res.body.success).toBe(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('_id');
  });
});
