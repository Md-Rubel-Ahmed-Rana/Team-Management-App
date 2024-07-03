import apiSlice from "../api/apiSlice";

const pricingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPricing: builder.query({
      query: () => ({
        url: "/plan",
      }),
    }),
    getSinglePricing: builder.query({
      query: (id) => ({
        url: `/plan/single/${id}`,
      }),
    }),
  }),
});

export const { useGetPricingQuery, useGetSinglePricingQuery } = pricingApi;
