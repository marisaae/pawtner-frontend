import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from '../features/UserAuthentication/authSlice'
import usersReducer from '../features/UserProfiles/usersSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => 
    //check if in production, if not apply logger middleware
    process.env.NODE_ENV !== 'production'
    ? getDefaultMiddleware().concat(logger)
    : getDefaultMiddleware()
})

export default store;