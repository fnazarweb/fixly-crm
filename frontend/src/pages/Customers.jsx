import React, { useState } from 'react';
import { useGetCustomersQuery } from '../store/customersApi';
import { useNavigate } from 'react-router-dom';
import CustomerModal from '../components/CustomerModal';

const Customers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');

    const {
        data: customers,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCustomersQuery();

    const navigate = useNavigate();

    const filteredCustomers = customers?.filter(
        (customer) =>
            !search ||
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone.toLowerCase().includes(search.toLowerCase()) ||
            customer.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <p>Loading...</p>;
    if (isError)
        return <p>{error?.data?.message || 'Failed to load customers'}</p>;

    return (
        <section>
            <h1>Customers</h1>

            <label htmlFor="search">Search</label>
            <input
                type="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={() => setIsModalOpen(true)}>New customer</button>

            <ul>
                {filteredCustomers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name + ' '} {customer.phone}
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <CustomerModal closeModal={() => setIsModalOpen(false)} />
            )}
        </section>
    );
};

export default Customers;
