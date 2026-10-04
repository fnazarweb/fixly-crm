import customerService from '../services/customersService.js';

const getCustomers = async (req, res) => {
    const businessId = req.user.businessId;
    const customers = await customerService.getCustomers(businessId);
    res.status(200).json(customers);
};

const getCustomerById = async (req, res) => {
    const id = req.params.id;
    const businessId = req.user.businessId;
    const customer = await customerService.getCustomerById(id, businessId);
    res.status(200).json(customer);
};

const createCustomer = async (req, res) => {
    const businessId = req.user.businessId;
    const customer = await customerService.createCustomer(req.body, businessId);
    res.status(201).json(customer);
};

const updateCustomer = async (req, res) => {
    const id = req.params.id;
    const businessId = req.user.businessId;
    const payload = req.body;
    const customer = await customerService.updateCustomer(
        id,
        businessId,
        payload
    );
    res.status(200).json(customer);
};

const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    const businessId = req.user.businessId;
    await customerService.deleteCustomer(id, businessId);
    res.status(204).end();
};

export default {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
