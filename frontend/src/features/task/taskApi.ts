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

    updateTask: builder.mutation({
      query: ({ id, name }) => ({
        url: `/task/task-update/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["project", "task"] as any,
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/delete/${id}`,
        method: "DELETE",
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
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
