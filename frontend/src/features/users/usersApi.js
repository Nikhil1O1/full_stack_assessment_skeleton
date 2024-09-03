import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query({
      query: () => '/user/find-all',
    }),
  }),
});

export const { useFetchAllUsersQuery } = usersApi;
