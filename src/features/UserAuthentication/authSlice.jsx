//login, logout, restore session, sign up
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
            return response.data.user;
    } catch (err) {
        if(err.response) {
            return rejectWithValue(err.response.data.errors);
        } else {
            return rejectWithValue(['An unexpected error occurred'])
        }
    }
    }
);


export const logout = createAsyncThunk(
    'session/logout',
    async() => {
        const response = await axios.delete("api/session")
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
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;