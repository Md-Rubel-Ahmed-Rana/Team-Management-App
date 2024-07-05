import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-team-manager.onrender.com",
    credentials: "include",
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
