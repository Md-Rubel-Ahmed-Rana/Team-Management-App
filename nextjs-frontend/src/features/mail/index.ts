import apiSlice from "../api/apiSlice";

const mailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactEmail: builder.mutation({
      query: (data) => ({
        url: "/mail/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendContactEmailMutation } = mailApi;
