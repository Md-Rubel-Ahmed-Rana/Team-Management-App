import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/auth/register",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/api/auth/users",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/api/auth/users/${id}`,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery, useGetUserQuery } =
  userApi;
