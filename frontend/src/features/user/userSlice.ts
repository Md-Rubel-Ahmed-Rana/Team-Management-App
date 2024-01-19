import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string }) => {
    const result = await axios.post(
      "https://little-programmer.vercel.app/api/auth/login",
      userData
    );
    return result;
  }
);

export const loggedinUser = createAsyncThunk<AxiosResponse<any, any>, void>(
  "auth/loggedinUser",
  async () => {
    const user = await axios.get(
      "https://little-programmer.vercel.app/api/auth/loggedinUser",
      {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    return user;
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action?.payload?.data;
        JSON.stringify(localStorage.setItem("accessToken", data?.accessToken));
        state.user = data.data;
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(loggedinUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loggedinUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        const data = action?.payload?.data;
        state.user = data?.data;
        state.loading = false;
      }
    );
    builder.addCase(loggedinUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
