import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import type { User, UserListState } from "src/types/user";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3000/api/users/list"
      );
      return response.data;
    } catch (error: any) {
      console.log("reducer error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserListState = {
  users: [],
  isLoading: false,
  error: null,
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || null;
        state.isLoading = false;
      });
  },
});

export default userListSlice.reducer;
