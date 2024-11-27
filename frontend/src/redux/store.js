import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";

const appStore = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default appStore;