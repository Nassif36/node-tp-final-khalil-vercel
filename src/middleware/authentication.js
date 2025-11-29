import { verifyToken } from '../data/token.js';

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    // Esperamos formato: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido. Use: Bearer <token>' });
    }

    // Verifica el token
    const user = verifyToken(token);
    req.user = user; // Adjunta el usuario al request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido' });
    }
    res.status(500).json({ error: err.message });
  }
}
