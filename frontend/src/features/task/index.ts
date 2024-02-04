import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["task"] as any,
    }),

    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/task/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["task"] as any,
    }),

    updateTask: builder.mutation({
      query: ({ id, name }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/task/task-update/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["task"] as any,
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/task/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"] as any,
    }),

    getTasksByProject: builder.query({
      query: (id) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/task/by-project/${id}`,
      }),
      providesTags: ["task"] as any,
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
