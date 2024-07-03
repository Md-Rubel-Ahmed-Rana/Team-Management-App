import apiSlice from "../api/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (userId) => ({
        url: `/notification/single/${userId}`,
      }),
      providesTags: ["notification"] as any,
    }),
    updateNotification: builder.mutation({
      query: ({ userId, ids }) => ({
        method: "PATCH",
        url: `/notification/update/${userId}`,
        body: ids,
      }),
      invalidatesTags: ["notification"] as any,
    }),
  }),
});

export const { useGetNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;
