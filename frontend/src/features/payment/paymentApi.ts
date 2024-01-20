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
  }),
});

export const { useCheckoutMutation } = paymentApi;
