import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "POST",
        url: "/payment/checkout",
        body: data,
      }),
    }),
    myPayments: builder.query({
      query: (userId) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "GET",
        url: `/payment/${userId}`,
      }),
    }),
  }),
});

export const { useCheckoutMutation, useMyPaymentsQuery } = paymentApi;
