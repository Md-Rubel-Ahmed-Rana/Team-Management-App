import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (userId) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `https://team-management-app-server-with-redis.onrender.com/notification/single/${userId}`,
      }),
      providesTags: ["notification"] as any,
    }),
    updateNotification: builder.mutation({
      query: ({ userId, ids }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "PATCH",
        url: `https://team-management-app-server-with-redis.onrender.com/notification/update/${userId}`,
        body: ids,
      }),
      invalidatesTags: ["notification"] as any,
    }),
  }),
});

export const { useGetNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;
