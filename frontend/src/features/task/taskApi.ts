import apiSlice from "../api/apiSlice";

const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project", "task"] as any,
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/task/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["project", "task"] as any,
    }),

    getTasksByProject: builder.query({
      query: (id) => ({
        url: `/task/by-project/${id}`,
      }),
      providesTags: ["project", "task"] as any,
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksByProjectQuery,
  useUpdateStatusMutation,
} = taskApi;
