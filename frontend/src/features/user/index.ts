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
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useLoginUserMutation,
  useLoggedInUserQuery,
  useUpdateUserMutation,
} = userApi;
