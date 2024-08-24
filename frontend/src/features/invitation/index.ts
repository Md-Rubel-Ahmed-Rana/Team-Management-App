import apiSlice from "../api/apiSlice";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/send/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    acceptInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/accept/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    rejectInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "POST",
        url: `/invitation/reject/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    pendingInvitations: builder.query({
      query: (memberId) => ({
        url: `/invitation/pending/${memberId}`,
      }),
      providesTags: ["team", "invitation"] as any,
    }),
    cancelPendingInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        url: `/invitation/cancel/${teamId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["team"] as any,
    }),
  }),
});

export const {
  useSendInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  usePendingInvitationsQuery,
  useCancelPendingInvitationMutation,
} = invitationApi;
