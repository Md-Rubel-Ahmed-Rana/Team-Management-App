import apiSlice from "../api/apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/team/invite-member",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    acceptInvitation: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/team/accept-invitation",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    rejectInvitation: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/team/reject-invitation",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/api/auth/users",
      }),
    }),
  }),
});

export const {
  useSendInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = invitationApi;
