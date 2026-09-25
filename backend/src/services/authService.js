import { prisma } from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (data) => {
    const { businessName, name, email, password: pwd, role } = data;

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
                role,
                businessId: business.id,
            },
        });

        const { password: _, ...userData } = user;
        return { business, userData };
    });
};

const login = async (data) => {
    const { email, password } = data;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw Error('Incorrect login data');
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const { password: _, ...userData } = user;

    return { userData, token };
};

export default { register, login };
