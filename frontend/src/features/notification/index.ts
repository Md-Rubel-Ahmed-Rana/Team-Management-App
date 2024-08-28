import apiSlice from "../api/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: ({ userId, limit }) => ({
        url: `/notification/my-notifications/${userId}?limit=${limit}`,
      }),
      providesTags: ["notification"] as any,
    }),
    getUnreadNotificationsCount: builder.query({
      query: (userId) => ({
        url: `/notification/unread/count/${userId}`,
      }),
      providesTags: ["notification"] as any,
    }),
    readNotification: builder.mutation({
      query: (messageId) => ({
        method: "PATCH",
        url: `/notification/status/read/${messageId}`,
      }),
      invalidatesTags: ["notification"] as any,
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: (userId) => ({
        method: "PATCH",
        url: `/notification/mark-all-as-read/${userId}`,
      }),
      invalidatesTags: ["notification"] as any,
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useReadNotificationMutation,
  useGetUnreadNotificationsCountQuery,
  useMarkAllNotificationsAsReadMutation,
} = notificationApi;
