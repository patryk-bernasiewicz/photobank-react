import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginCredentials, RegisterPayload, User } from './types';
import { BaseQueryFn } from 'src/types/BaseQuery';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/auth` }) as BaseQueryFn,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
    }),
    register: builder.mutation<User, RegisterPayload>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    confirmEmail: builder.mutation<void, string>({
      query: (token: string) => ({
        url: '/confirm-email/' + token,
        method: 'POST',
      }),
    }),
    me: builder.query<void, void>({
      query: () => ({
        url: '/me',
        credentials: 'include',
      }),
    }),
    requestResetPassword: builder.mutation<void, string>({
      query: (email: string) => ({
        url: '/reset-password',
        method: 'POST',
        body: { email },
      }),
    }),
    validateResetPasswordToken: builder.query<User, string>({
      query: (token: string) => ({
        url: '/reset-password/' + token,
        method: 'GET',
      }),
    }),
    confirmResetPassword: builder.mutation<void, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: '/reset-password/' + token,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useConfirmEmailMutation,
  useMeQuery,
  useLazyMeQuery,
  useRequestResetPasswordMutation,
  useLazyValidateResetPasswordTokenQuery,
  useConfirmResetPasswordMutation,
} = authApi;
