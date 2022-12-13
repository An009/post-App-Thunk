import { configureStore } from "@reduxjs/toolkit";
import postReducer from './postSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        "posts": postReducer,
        "users": userReducer
    }
})
export default store;