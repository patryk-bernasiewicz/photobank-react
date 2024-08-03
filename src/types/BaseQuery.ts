import { FetchArgs, FetchBaseQueryError, BaseQueryFn as ReduxBaseQueryFn } from '@reduxjs/toolkit/query';

export type BaseQueryFn = ReduxBaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown>;
