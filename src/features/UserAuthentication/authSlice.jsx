//login, logout, restore session, sign up
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from '../../store/csrf';

const initialState = { user: null };

export const login = createAsyncThunk(
    'session/login',
    async({ credential, password }) => {
        const response = await csrfFetch("api/session", {
            method: "POST",
            body: JSON.stringify({ credential, password }),
        })
        const data = await response.json();
        return data.user
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
)

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

export default authSlice.reducer;