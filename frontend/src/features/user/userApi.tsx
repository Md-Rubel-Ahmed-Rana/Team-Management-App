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
      invalidatesTags: ["user", "team"] as any,
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
      providesTags: ["user", "team"] as any,
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/api/auth/users/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useLoginUserMutation,
  useLoggedInUserQuery,
} = userApi;
