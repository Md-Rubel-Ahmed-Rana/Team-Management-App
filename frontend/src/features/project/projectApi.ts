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
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/single/${id}`,
      }),
      providesTags: ["project"] as any,
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: "/project/add-member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"] as any,
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useMyProjectsQuery,
  useAddMemberMutation,
  useGetSingleProjectQuery,
} = projectApi;
