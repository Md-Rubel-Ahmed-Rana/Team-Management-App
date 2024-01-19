import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://little-programmer.vercel.app/",
  }),
  tagTypes: ["team"] as any,
  endpoints: () => ({}),
});

export default apiSlice;
