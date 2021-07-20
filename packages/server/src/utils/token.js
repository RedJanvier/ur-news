import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export function signToken(data, secret = JWT_SECRET, duration = null) {
  const tokenOptions = duration ? { expiresIn: duration } : undefined;
  const token = sign(data, secret, tokenOptions);
  return token;
}

export function verifyToken(token, secret = JWT_SECRET) {
  const data = verify(token, secret);
  return data;
}
