import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const secretKey = '969364vR$';

export const login = async (req: Request, res: Response) => {
    console.log('Request body:', req.body); // Agregar este log para depuración
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos en la solicitud' });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña en texto plano
        if (password !== user.password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
