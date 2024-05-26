import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = '969364vR$';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }
        // @ts-ignore
        req.user = user; // Guarda la información del usuario en la solicitud
        next();
    });
};
