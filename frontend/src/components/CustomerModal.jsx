import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCutomerMutation } from '../store/customersApi';
import { setServerFormErrors } from '../utils/utils';
import { customerSchema } from '../validation/customerSchema';

const CustomerModal = ({ closeModal }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(customerSchema) });

    const [addCustomer, { isSuccess }] = useAddCutomerMutation();

    const onSubmit = async (customerData) => {
        try {
            const customer = await addCustomer(customerData).unwrap();
            console.log(customer);
        } catch (err) {
            if (err.status === 409) {
                setError('phone', {
                    type: 'server',
                    message: err.data.message,
                });
            }

            if (err.status === 400 && err.data?.errors) {
                const errors = err.data.errors;
                setServerFormErrors(errors, setError);
                setError('root', { type: 'server', message: err.data.message });
            }

            console.error('Error: ', err.data.message);
        }
    };

    return (
        <div>
            <button onClick={closeModal}>Close</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="phone">Phone</label>
                <input id="phone" {...register('phone')} />
                {errors.phone && <p>{errors.phone.message}</p>}

                <label htmlFor="email">Email</label>
                <input id="email" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}

                {errors.root?.message && <p>{errors.root.message}</p>}

                <button type="submit" disabled={isSubmitting}>
                    Add Customer
                </button>
            </form>
            {isSuccess && <p>New customer added successfully!</p>}
        </div>
    );
};

export default CustomerModal;
