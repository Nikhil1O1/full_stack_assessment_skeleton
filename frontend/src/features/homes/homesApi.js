import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homesApi = createApi({
  reducerPath: 'homesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000` }),
  endpoints: (builder) => ({
    fetchHomesByUser: builder.query({
      query: ({ userId, page = 1, limit = 50 }) => 
        `/home/find-by-user?userId=${userId}&page=${page}&limit=${limit}`,
    }),
    fetchUsersByHome: builder.query({
      query: ({ homeId }) => `/user/find-by-home?homeId=${homeId}`,
    }),
    updateHomeUsers: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: `/home/update-users`,
        method: 'PUT',
        body: { homeId, userIds },
      }),
    }),
  }),
});

export const { 
  useFetchHomesByUserQuery, 
  useFetchUsersByHomeQuery,
  useUpdateHomeUsersMutation 
} = homesApi;
