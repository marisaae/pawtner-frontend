//login, logout, restore session
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authError: null,
};

export const login = createAsyncThunk(
  "session/login",
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/session", {
        credential,
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

export const logout = createAsyncThunk("session/logout", async () => {
  const response = await axios.delete("api/session");
  return response.ok;
});

export const restoreSession = createAsyncThunk("session/restore", async () => {
  const response = await axios.get("api/session");
  return response.data.user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authError = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authError = action.payload;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.authError = action.payload;
      });
  },
});

export const getAuthenticatedUser = (state) => state.auth.user;
export const getAuthErrors = (state) => state.auth.authError;

export default authSlice.reducer;
