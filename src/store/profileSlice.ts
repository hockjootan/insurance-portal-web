import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import type {
  ProfileState,
  ProfileDetailsApiResponse,
} from "src/types/profile";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProfileDetailsApiResponse>(
        "http://localhost:3000/api/oauth2/profile"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileInitialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileState["profile"]>) => {
          state.profile = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchProfile.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
