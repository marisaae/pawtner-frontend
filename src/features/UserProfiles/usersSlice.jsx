import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  signupStatus: {
    error: [],
    success: false,
  } 
};

//signup, petPreference, userProfile

export const signup = createAsyncThunk(
  "users/signup",
  async (
    { firstName, lastName, username, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("api/users", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      return response.data.user;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.errors);
      } else {
        return rejectWithValue(["An unexpected error occurred"]);
      }
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.signupStatus.error = [];
        state.signupStatus.success = true
    })
    .addCase(signup.rejected, (state, action) => {
        state.signupStatus.error = action.payload;
        state.signupStatus.success = false;
    })
  },
});

export const getSignupStatus = (state) => state.users.signupStatus;

export default usersSlice.reducer;
