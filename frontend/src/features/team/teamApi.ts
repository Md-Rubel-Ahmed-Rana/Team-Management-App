import apiSlice from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/team/create-team",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    getTeams: builder.query({
      query: (id) => ({
        url: `/api/team/my-team?admin=${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    getActiveMembers: builder.query({
      query: (id) => ({
        url: `/api/team/active-members/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    getPendingMembers: builder.query({
      query: (id) => ({
        url: `/api/team/pending-members/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsQuery,
  useGetActiveMembersQuery,
  useGetPendingMembersQuery,
} = teamApi;
