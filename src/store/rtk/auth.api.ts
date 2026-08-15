import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ApiResponse } from '../../schemas/interface';
import { type RootState } from '../store';
import { config } from '../../../config';
import { logout as authLogout, setCredentials } from '../slices/authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.app.host}/api`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Authentication'],
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    if (result?.status === 200 && result.data?.token && result.data?.user) {
                        dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
                    }
                } catch {
                    // no-op
                }
            },
        }),
        register: builder.mutation<ApiResponse, { name: string; email: string; password: string }>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginWithToken: builder.query<ApiResponse, void>({
            query: () => '/auth/login-token',
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    if (result?.status === 200 && result.data?.token && result.data?.user) {
                        dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
                    }
                } catch {
                    // no-op
                }
            },
        }),
        logout: builder.mutation<ApiResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    if (result?.status === 200) {
                        dispatch(authLogout());
                        dispatch(authApi.util.resetApiState());
                    }
                } catch {
                    // no-op
                }
            },
        }),
        updateProfile: builder.mutation<ApiResponse, Blob>({
            query: (blob) => {
                return {
                    url: '/auth',
                    method: 'PATCH',
                    body: blob,
                };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    if (result?.status === 200 && result.data?.token && result.data?.user) {
                        dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
                    }
                } catch {
                    // no-op
                }
            }
        })
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useLoginWithTokenQuery,
    useUpdateProfileMutation,
} = authApi;