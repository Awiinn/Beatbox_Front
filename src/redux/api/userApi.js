import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/users",
    }),
    getUserById: builder.query({
      query: (id) => `/api/users/${id}`,
    }),
  }),
});

export const { 
  useGetUserByIdQuery, 
  useGetUsersQuery
 } = userApi;
