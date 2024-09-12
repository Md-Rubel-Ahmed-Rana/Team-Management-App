import apiSlice from "../api/apiSlice";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/payment/checkout",
        body: data,
      }),
      invalidatesTags: ["package"] as any,
    }),
    renewPackage: builder.mutation({
      query: ({
        userId,
        planId,
        packageId,
      }: {
        userId: string;
        packageId: string;
        planId: string;
      }) => ({
        method: "PATCH",
        url: `/package/renew/${userId}/${planId}/${packageId}`,
      }),
      invalidatesTags: ["package"] as any,
    }),
    myPackage: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/package/my-package/${userId}`,
      }),
      providesTags: ["package"] as any,
    }),
  }),
});

export const {
  useCheckoutMutation,
  useMyPackageQuery,
  useRenewPackageMutation,
} = paymentApi;
