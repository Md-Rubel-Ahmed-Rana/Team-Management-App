import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://team-management-app-server-with-redis.onrender.com",
    headers: {
      authorization: Cookies.get("tmAccessToken") as string,
    },
  }),
  tagTypes: [
    "user",
    "team",
    "project",
    "task",
    "invitation",
    "message",
    "notification",
  ] as any,
  endpoints: () => ({}),
});

export default apiSlice;
