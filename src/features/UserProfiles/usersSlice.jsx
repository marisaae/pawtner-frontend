import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { user: null }



export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {

    }
})