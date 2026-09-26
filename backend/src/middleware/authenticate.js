import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';

export default async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unathorized' });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });

        const { password, ...userData } = user;
        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
