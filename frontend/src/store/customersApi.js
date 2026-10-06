import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './authApi';

export const customersApi = createApi({
    reducerPath: 'customersApi',
    tagTypes: ['Customers'],
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => 'customers/',
            providesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
        getCustomerById: builder.mutation({
            query: (id) => `customers/${id}`,
            // provide tags depends on id from query to prevent unnecessary request
            providesTags: (result, error, id) => [{ type: 'Customers', id }],
        }),
        addCutomer: builder.mutation({
            query: (payload) => ({
                url: 'customers/',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
        updateCustomer: builder.mutation({
            query: (id, payload) => ({
                url: 'customers/${id}',
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Customers', id },
                { type: 'Customers', id: 'LIST' },
            ],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCustomersQuery,
    useGetCustomerByIdMutation,
    useAddCutomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customersApi;
