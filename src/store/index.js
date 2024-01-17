import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from '../features/UserAuthentication/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
    //check if in production, if not apply logger middleware
    process.env.NODE_ENV !== 'production'
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware()
})

export default store;