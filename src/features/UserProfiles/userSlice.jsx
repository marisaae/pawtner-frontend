import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {
    profile: null,
    petPreferences: null,
    savedPets: null
  },
  signupStatus: {
    error: [],
    success: false,
  },
  updateUserProfileStatus: {
    error: [],
    success: false,
  }
};

//signup, get pet preferences, update petPreference, get user profile, update user profile

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

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async(id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/users/${id}`);
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.errors);
      } else {
        return rejectWithValue(["An unexpected error occurred"]);
      }
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ id, firstName, lastName, bio }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`api/users/${id}`, {
        firstName,
        lastName,
        bio,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user.profile = null;
      state.user.petPreferences = null;
      state.user.savedPets = null;
      state.signupStatus = {
        error: [],
        success: false,
      };
      state.updateUserProfileStatus = {
        error: [],
        success: false,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user.profile = action.payload;
        state.signupStatus.error = [];
        state.signupStatus.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStatus.error = action.payload;
        state.signupStatus.success = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user.profile = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.profile = action.payload;
        state.updateUserProfileStatus.error = [];
        state.updateUserProfileStatus.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateUserProfileStatus.error = action.payload;
        state.updateUserProfileStatus.success = false;
      })

  },
});

export const getSignupStatus = (state) => state.user.signupStatus;
export const getUserProfileState = (state) => state.user.profile;

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
