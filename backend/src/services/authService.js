import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';
import { Prisma } from '../../generated/prisma/client.ts';

const register = async (data) => {
    const { businessName, name, email, password: pwd } = data;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(pwd, salt);

    try {
        return await prisma.$transaction(async (tx) => {
            const business = await tx.business.create({
                data: {
                    name: businessName,
                },
            });

            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password,
                    businessId: business.id,
                },
            });

            const { password: _, ...userData } = user;
            return { business, userData };
        });
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            // Сreate and throw own error if email was already used
            throw new AppError('This email is already registered', 409);
        }
        throw err;
    }
};

const login = async (data) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    const { password: _, ...userData } = user;

    return { userData, token };
};

const me = (data) => {
    if (!data.user) throw new AppError('Unauthorized');
    return data.user;
};

export default { register, login, me };
