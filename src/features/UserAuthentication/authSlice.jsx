//login, logout, restore session, sign up
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { csrfFetch } from '../../store/csrf';

const initialState = { user: null };

// export const login = createAsyncThunk(
//     'session/login',
//     async({ credential, password }) => {
// const response = await csrfFetch("api/session", {
//             method: "POST",
//             body: JSON.stringify({ credential, password }),
//         })
//         const data = await response.json();
//         return data.user
//     }
// );
export const login = createAsyncThunk(
    'session/login',
    async ({ credential, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/session", { credential, password });
            return response.data.user; // Adjust based on your API response structure
        } catch (error) {
            // Check if error response is available and has data
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.errors || ['Login failed']);
            } else {
                return rejectWithValue(['An unexpected error occurred']);
            }
        }
    }
);



export const logout = createAsyncThunk(
    'session/logout',
    async() => {
        const response = await csrfFetch("api/session", {
            method: "DELETE",
        })
        return response.ok;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                // Handle rejected case
                console.log('hello')
                state.user = null;
                state.error = action.error; // Store the error
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;