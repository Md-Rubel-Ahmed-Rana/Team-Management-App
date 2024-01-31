import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleImage: builder.mutation({
      query: (image) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: "/cloudinary/single-image",
        method: "POST",
        body: image,
      }),
    }),

    uploadMultipleImage: builder.mutation({
      query: (images) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: "/cloudinary/multiple-image",
        method: "POST",
        body: images,
      }),
    }),

    uploadSingleFile: builder.mutation({
      query: (file) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: "/cloudinary/single-file",
        method: "POST",
        body: file,
      }),
    }),

    uploadMultipleFile: builder.mutation({
      query: (files) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
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
