import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

const register = async (data) => {
    const { businessName, name, email, password: pwd } = data;
    const existingUser = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });

    // Сreate and throw own error if email already used
    if (existingUser) {
        throw new AppError('This email is already registered', 409);
    }

    return prisma.$transaction(async (tx) => {
        const business = await tx.business.create({
            data: {
                name: businessName,
            },
        });

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(pwd, salt);

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
