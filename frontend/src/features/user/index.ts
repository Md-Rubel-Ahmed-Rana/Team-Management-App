import apiSlice from "../api/apiSlice";

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
        url: "/auth/login",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"] as any,
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/user",
      }),
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/user/single/${userId}`,
      }),
    }),
    getMyChatFriends: builder.query({
      query: (userId) => ({
        url: `/user/my-chat-friends/${userId}`,
      }),
      providesTags: ["message", "user"] as any,
    }),
    loggedInUser: builder.query({
      query: () => ({
        url: "/auth",
        credentials: "include",
      }),
      providesTags: ["user"] as any,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/user/update/${id}`,
        body: data,
      }),
      invalidatesTags: ["user", "team"] as any,
    }),
    logoutUser: builder.mutation({
      query: () => ({
        method: "DELETE",
        url: `/auth/logout`,
        credentials: "include",
      }),
      invalidatesTags: ["user"] as any,
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/user/forget-password`,
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"] as any,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/user/reset-password`,
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"] as any,
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/user/change-password`,
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["user"] as any,
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useLoginUserMutation,
  useLoggedInUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetSingleUserQuery,
  useGetMyChatFriendsQuery,
} = userApi;
