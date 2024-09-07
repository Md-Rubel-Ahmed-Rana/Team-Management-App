import apiSlice from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/team/create",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),

    getMyTeams: builder.query({
      query: (adminId) => ({
        url: `/team/my-teams/${adminId}`,
      }),
      providesTags: ["team"] as any,
    }),

    getJoinedTeams: builder.query({
      query: (memberId) => ({
        url: `/team/joined-teams/${memberId}`,
      }),
      providesTags: ["team"] as any,
    }),

    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/team/single/${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/team/update/${id}`,
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),

    deleteTeam: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/team/delete/${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    removeTeamMember: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "DELETE",
        url: `/team/remove-member/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team"] as any,
    }),
    sendTeamLeaveRequest: builder.mutation({
      query: ({ teamId, memberId }: { teamId: string; memberId: string }) => ({
        url: `/team/send-leave-request/${teamId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["team"] as any,
    }),
    cancelTeamLeaveRequest: builder.mutation({
      query: ({ teamId, memberId }: { teamId: string; memberId: string }) => ({
        url: `/team/cancel-leave-request/${teamId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["team"] as any,
    }),
    rejectTeamLeaveRequest: builder.mutation({
      query: ({ teamId, memberId }: { teamId: string; memberId: string }) => ({
        url: `/team/reject-leave-request/${teamId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["team"] as any,
    }),
    acceptTeamLeaveRequest: builder.mutation({
      query: ({ teamId, memberId }: { teamId: string; memberId: string }) => ({
        url: `/team/accept-leave-request/${teamId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["team"] as any,
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetMyTeamsQuery,
  useGetJoinedTeamsQuery,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useRemoveTeamMemberMutation,
  useSendTeamLeaveRequestMutation,
  useCancelTeamLeaveRequestMutation,
  useRejectTeamLeaveRequestMutation,
  useAcceptTeamLeaveRequestMutation,
} = teamApi;
