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
  }),
});

export const { useCheckoutMutation, useMyPaymentsQuery } = paymentApi;
