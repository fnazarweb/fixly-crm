import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
});

// base query which check auth session is actually ok
export const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    const url = typeof args === 'string' ? args : args.url;
    const isAuthEndpoint = url === 'auth/me' || url === 'auth/login';

    if (result.error?.status === 401 && !isAuthEndpoint) {
        api.dispatch(authApi.util.invalidateTags(['Me']));
    }
    return result;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Me'],
    baseQuery: baseQueryWithAuth,
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
            // invalidatesTags: ['Me'], -> commented because already reset Cache manually in Logout.jsx
        }),
    }),
});

export const {
    useMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApi;
