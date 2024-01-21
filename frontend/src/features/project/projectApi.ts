import apiSlice from "../api/apiSlice";

const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
    }),
    myProjects: builder.query({
      query: (userId) => ({
        url: `/project/my-projects/${userId}`,
      }),
    }),
  }),
});

export const { useCreateProjectMutation, useMyProjectsQuery } = projectApi;
