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

    myTeams: builder.query({
      query: (id) => ({
        url: `/team/my-teams/${id}`,
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

    getTeams: builder.query({
      query: (id) => ({
        url: `/api/team/my-team?admin=${id}`,
      }),
      providesTags: ["team"] as any,
    }),

    leaveTeamRequest: builder.mutation({
      query: (data) => ({
        url: "/leave-team/sent-request",
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
  useGetTeamsQuery,
  useMyTeamsQuery,
  useSingleTeamQuery,
  useJoinedTeamsQuery,
  useGetActiveMembersQuery,
  useRemoveTeamMemberMutation,
  useLeaveTeamRequestMutation,
  useGetLeaveTeamRequestsByAdminQuery,
  useIgnoreTeamLeaveRequestMutation,
  useGetMemberLeaveTeamRequestQuery,
  useUpdateTeamMutation,
} = teamApi;
