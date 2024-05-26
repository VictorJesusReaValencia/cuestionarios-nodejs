import { Request, Response } from 'express';
import User from '../../models/User';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos en la solicitud' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const newUser = await User.create({ username, password });

        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser.id });
    } catch (error) {
        console.error('Error de registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
