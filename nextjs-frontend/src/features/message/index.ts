import apiSlice from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message/send",
        method: "POST",
        body: data,
      }),
    }),

    getMessagesByType: builder.query({
      query: ({ type, conversationId }) => ({
        url: `/message//by-type/${type}/${conversationId}`,
      }),
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesByTypeQuery } = messageApi;
