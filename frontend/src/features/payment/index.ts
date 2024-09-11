import apiSlice from "../api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/payment/checkout",
        body: data,
      }),
    }),
    myPayments: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/payment/${userId}`,
      }),
    }),
    myPackage: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/package/my-package/${userId}`,
      }),
    }),
  }),
});

export const { useCheckoutMutation, useMyPaymentsQuery, useMyPackageQuery } =
  paymentApi;
