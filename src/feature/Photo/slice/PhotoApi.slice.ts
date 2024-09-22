import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BaseQueryFn } from 'src/types/BaseQuery';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

type GetMyPhotoParams = {
  photoId: number;
  size: string;
};

type GetMyPhotoResponse = {
  url: string;
};

export enum PhotoApiTags {
  Photo = 'Photo',
}

export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/photo` }) as BaseQueryFn,
  tagTypes: [PhotoApiTags.Photo],
  endpoints: (builder) => ({
    getMyPhoto: builder.query<GetMyPhotoResponse, GetMyPhotoParams>({
      query: ({ photoId, size }) => ({
        url: `/my-photos/${photoId}/${size}`,
        method: 'GET',
        credentials: 'include',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return { url };
        },
        transformResponse: (response: GetMyPhotoResponse) => response,
        onCacheEntryRemoved: async (
          _: { id: string },
          { cachedDataLoaded }: { cachedDataLoaded: Promise<{ url: string }> },
        ) => {
          const { url } = await cachedDataLoaded;
          URL.revokeObjectURL(url);
        },
      }),
      providesTags: [PhotoApiTags.Photo],
    }),
  }),
});

export const { useGetMyPhotoQuery } = photoApi;
