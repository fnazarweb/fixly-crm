import express from 'express';
import authenticateMiddleware from '../middleware/authenticate.js';
import { validate } from '../middleware/validate.js';
import customerController from '../controllers/customerController.js';
import { customerSchema } from '../validation/customerSchema.js';

const router = express.Router();

router.get('/', authenticateMiddleware, customerController.getCustomers);

router.get('/:id', authenticateMiddleware, customerController.getCustomerById);

router.post(
    '/',
    authenticateMiddleware,
    validate(customerSchema),
    customerController.createCustomer
);

router.put(
    '/:id',
    authenticateMiddleware,
    validate(customerSchema),
    customerController.updateCustomer
);

router.delete(
    '/:id',
    authenticateMiddleware,
    customerController.deleteCustomer
);

export default router;
