import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const pricingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPricing: builder.query({
      query: () => ({
        url: "/plan",
      }),
    }),
    getSinglePricing: builder.query({
      query: (id) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/plan/single/${id}`,
      }),
    }),
  }),
});

export const { useGetPricingQuery, useGetSinglePricingQuery } = pricingApi;
