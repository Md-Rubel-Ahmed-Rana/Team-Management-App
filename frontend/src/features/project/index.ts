import apiSlice from "../api/apiSlice";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/project/delete/${id}`,
      }),
      providesTags: ["project"] as any,
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    myProjects: builder.query({
      query: (userId) => ({
        url: `/project/my-projects/${userId}`,
      }),
      providesTags: ["project"] as any,
    }),
    assignedProjects: builder.query({
      query: (memberId) => ({
        url: `/project/assigned-projects/${memberId}`,
      }),
      providesTags: ["project"] as any,
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/single/${id}`,
      }),
      providesTags: ["project", "task"] as any,
      invalidatesTags: ["task"] as any,
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: "/project/add-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    removeMember: builder.mutation({
      query: (data) => ({
        url: "/project/remove-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    leaveProjectRequest: builder.mutation({
      query: (data) => ({
        url: "/leave-project/sent-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    ignoreProjectLeaveRequest: builder.mutation({
      query: (requestId) => ({
        url: `/leave-project/ignore/${requestId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["project"] as any,
    }),
    getLeaveProjectRequestsByAdmin: builder.query({
      query: (adminId) => ({
        url: `/leave-project/all/${adminId}`,
      }),
      providesTags: ["project"] as any,
    }),
    getMemberLeaveProjectRequest: builder.query({
      query: (memberId) => ({
        url: `/leave-project/member-request/${memberId}`,
      }),
      providesTags: ["project"] as any,
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useMyProjectsQuery,
  useAddMemberMutation,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useAssignedProjectsQuery,
  useRemoveMemberMutation,
  useLeaveProjectRequestMutation,
  useGetLeaveProjectRequestsByAdminQuery,
  useIgnoreProjectLeaveRequestMutation,
  useGetMemberLeaveProjectRequestQuery,
  useDeleteProjectMutation,
} = projectApi;
