import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user/register",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user/login",
        body: data,
      }),
      invalidatesTags: ["user"] as any,
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/user",
      }),
    }),
    loggedInUser: builder.query({
      query: () => ({
        url: "/user/auth",
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
      }),
      providesTags: ["user"] as any,
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/api/auth/users/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/user/update/${id}`,
        body: data,
      }),
      invalidatesTags: ["user", "team"] as any,
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useLoginUserMutation,
  useLoggedInUserQuery,
  useUpdateUserMutation,
} = userApi;
