import apiSlice from "../api/apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/send/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team"] as any,
    }),
    acceptInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/accept/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team"] as any,
    }),
    rejectInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/reject/${teamId}/${memberId}`,
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
