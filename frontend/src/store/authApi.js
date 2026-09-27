import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Me'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        me: builder.query({
            query: () => 'auth/me',
            providesTags: ['Me'],
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: 'auth/login',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Me'],
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: 'auth/register',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Me'],
        }),
        logout: builder.mutation({
            query: (payload) => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApi;
