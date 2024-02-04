import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: "/message/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"] as any,
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/message/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"] as any,
    }),

    editMessage: builder.mutation({
      query: ({ id, text }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/message/update/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: ["message"] as any,
    }),

    getMessagesByType: builder.query({
      query: ({ type, conversationId }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/message//by-type/${type}/${conversationId}`,
      }),
      providesTags: ["message"] as any,
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesByTypeQuery,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messageApi;
