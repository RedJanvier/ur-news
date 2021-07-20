import { genSalt, hash as _hash, compare } from 'bcryptjs';
import ErrorResponse from './errorRespones';

export async function encryptPassword(password) {
  const salt = await genSalt(12);
  const hash = await _hash(password, salt);
  if (!hash) throw new ErrorResponse('Failed to encrypt password', 500);
  return hash;
}
export async function decryptPassword(password, hash) {
  const isValid = await compare(password, hash);
  if (!isValid) throw new ErrorResponse('Password Incorrect', 401);
  return isValid;
}
