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

)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})