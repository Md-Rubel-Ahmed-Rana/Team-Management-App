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
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        method: "DELETE",
        url: `/project/delete/${id}`,
      }),
      invalidatesTags: ["project"] as any,
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/single/${id}`,
      }),
      providesTags: ["project", "task"] as any,
      invalidatesTags: ["task"] as any,
    }),
    addMember: builder.mutation({
      query: ({ projectId, memberId }) => ({
        url: `/project/add-member/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
    removeMember: builder.mutation({
      query: ({ projectId, memberId }) => ({
        url: `/project/remove-member/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
    sendProjectLeaveRequest: builder.mutation({
      query: ({
        projectId,
        memberId,
      }: {
        projectId: string;
        memberId: string;
      }) => ({
        url: `/project/send-leave-request/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
    cancelProjectLeaveRequest: builder.mutation({
      query: ({
        projectId,
        memberId,
      }: {
        projectId: string;
        memberId: string;
      }) => ({
        url: `/project/cancel-leave-request/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
    rejectProjectLeaveRequest: builder.mutation({
      query: ({
        projectId,
        memberId,
      }: {
        projectId: string;
        memberId: string;
      }) => ({
        url: `/project/reject-leave-request/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
    acceptProjectLeaveRequest: builder.mutation({
      query: ({
        projectId,
        memberId,
      }: {
        projectId: string;
        memberId: string;
      }) => ({
        url: `/project/accept-leave-request/${projectId}/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: ["project"] as any,
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useMyProjectsQuery,
  useAssignedProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetSingleProjectQuery,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useSendProjectLeaveRequestMutation,
  useCancelProjectLeaveRequestMutation,
  useRejectProjectLeaveRequestMutation,
  useAcceptProjectLeaveRequestMutation,
} = projectApi;
