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

    removeTeamMember: builder.mutation({
      query: ({ teamId, memberId }) => ({
        method: "PATCH",
        url: `/team/remove-member/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team"] as any,
    }),

    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        method: "PATCH",
        url: `/team/update/${id}`,
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    getMyTeamsForDropdown: builder.query({
      query: (adminId) => ({
        url: `/team/my-teams/dropdown/${adminId}`,
      }),
      providesTags: ["team"] as any,
    }),

    getMyTeamsCard: builder.query({
      query: (adminId: string) => ({
        url: `/team/cards/my-teams/${adminId}`,
      }),
      providesTags: ["team"] as any,
    }),

    getJoinedTeamsCard: builder.query({
      query: (memberId: string) => ({
        url: `/team/cards/joined-teams/${memberId}`,
      }),
      providesTags: ["team"] as any,
    }),

    getTeamDetails: builder.query({
      query: (teamId: string) => ({
        url: `/team/details/${teamId}`,
      }),
      providesTags: ["team"] as any,
    }),

    joinedTeams: builder.query({
      query: (id) => ({
        url: `/team/joined-teams/${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    getActiveMembers: builder.query({
      query: (id) => ({
        url: `/team/active-members/${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    singleTeam: builder.query({
      query: (id) => ({
        url: `/team/single/${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    deleteTeam: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/team/delete/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    getTeams: builder.query({
      query: (id) => ({
        url: `/api/team/my-team?admin=${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    leaveTeamRequest: builder.mutation({
      query: (data) => ({
        url: "/leave-team/send-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),

    ignoreTeamLeaveRequest: builder.mutation({
      query: (requestId) => ({
        url: `/leave-team/ignore/${requestId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["team"] as any,
    }),
    acceptTeamLeaveRequest: builder.mutation({
      query: ({ teamId, memberId }) => ({
        url: `/leave-team/accept/${teamId}/${memberId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["team"] as any,
    }),

    getLeaveTeamRequestsByAdmin: builder.query({
      query: (adminId) => ({
        url: `/leave-team/all/${adminId}`,
      }),
      providesTags: ["team"] as any,
    }),
    getMemberLeaveTeamRequest: builder.query({
      query: (memberId) => ({
        url: `/leave-team/member-request/${memberId}`,
      }),
      providesTags: ["team"] as any,
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetMyTeamsForDropdownQuery,
  useGetTeamsQuery,
  useSingleTeamQuery,
  useJoinedTeamsQuery,
  useGetActiveMembersQuery,
  useRemoveTeamMemberMutation,
  useLeaveTeamRequestMutation,
  useGetLeaveTeamRequestsByAdminQuery,
  useIgnoreTeamLeaveRequestMutation,
  useGetMemberLeaveTeamRequestQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetMyTeamsCardQuery,
  useGetJoinedTeamsCardQuery,
  useGetTeamDetailsQuery,
  useAcceptTeamLeaveRequestMutation,
} = teamApi;
