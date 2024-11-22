import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'asad12345';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.trimStart() && authHeader.trimEnd();

  if (!token) {
    return res.status(401).json({ status: false, message: 'Token is missing' });
  }

  try {

    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; companyId: string };

    //@ts-ignore
    req.user = payload; // Attach the payload to the request object
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(403).json({ status: false, message: 'Invalid or expired token', err });
  }
};
