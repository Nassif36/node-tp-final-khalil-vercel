import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET || 'changeme_replace_in_production';

export const generateToken = (payload, expiresIn = '2h') => {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
}
