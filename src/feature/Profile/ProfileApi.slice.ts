import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn } from 'src/types/BaseQuery';
import { Profile } from './types';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export enum ProfileApiTags {
  Profile = 'Profile',
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api` }) as BaseQueryFn,
  tagTypes: [ProfileApiTags.Profile],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [ProfileApiTags.Profile],
    }),
    updateProfile: builder.mutation<Profile, Profile>({
      query: (body) => ({
        url: '/profile',
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      invalidatesTags: [ProfileApiTags.Profile],
    }),
    getAllProfiles: builder.query<Profile[], void>({
      query: () => ({
        url: '/profiles',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useGetAllProfilesQuery } = profileApi;
