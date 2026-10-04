import { Prisma } from '../../generated/prisma/client.ts';
import { prisma } from '../config/prisma.js';
import AppError from '../errors/AppError.js';

const getCustomers = async (businessId) => {
    const customers = await prisma.customer.findMany({
        where: {
            businessId,
        },
    });

    return customers;
};

const getCustomerById = async (id, businessId) => {
    const customer = await prisma.customer.findUniqueOrThrow({
        where: { id, businessId },
    });

    return customer;
};

const createCustomer = async (data, businessId) => {
    const { name, email, phone } = data;
    try {
        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                businessId,
            },
        });

        return customer;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            throw new AppError('Customer already exist', 409);
        }

        throw err;
    }
};

const updateCustomer = async (id, businessId, payload) => {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: {
                id,
                businessId,
            },
            data: payload,
        });

        return updatedCustomer;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            throw new AppError('This phone is already exist', 409);
        }

        throw err;
    }
};

const deleteCustomer = async (id, businessId) => {
    const result = await prisma.customer.delete({
        where: {
            id,
            businessId,
        },
    });

    return result;
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
