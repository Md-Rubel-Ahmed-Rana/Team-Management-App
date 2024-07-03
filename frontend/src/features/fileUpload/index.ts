import apiSlice from "../api/apiSlice";

const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleImage: builder.mutation({
      query: (image) => ({
        url: "/cloudinary/single-image",
        method: "POST",
        body: image,
      }),
    }),

    uploadMultipleImage: builder.mutation({
      query: (images) => ({
        url: "/cloudinary/multiple-image",
        method: "POST",
        body: images,
      }),
    }),

    uploadSingleFile: builder.mutation({
      query: (file) => ({
        url: "/cloudinary/single-file",
        method: "POST",
        body: file,
      }),
    }),

    uploadMultipleFile: builder.mutation({
      query: (files) => ({
        url: "/cloudinary/multiple-files",
        method: "POST",
        body: files,
      }),
    }),
  }),
});

export const {
  useUploadMultipleFileMutation,
  useUploadMultipleImageMutation,
  useUploadSingleFileMutation,
  useUploadSingleImageMutation,
} = fileUploadApi;
