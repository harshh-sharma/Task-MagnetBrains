import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";

export const register = createAsyncThunk('/register',async (data) => {
    try {
        const response = await axiosInstance.post('/user/register',data);
        toast.promise(response,{
            loading:"Wait !! creating your account",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        return (await res).data
    } catch (error) {
        console.log("register",error);
        toast(error?.message);
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        userData: localStorage.getItem("userData") == 'undefined' ? {} : JSON.parse(localStorage.getItem("userData")),
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(register.fulfilled,(state,action) => {
            localStorage.setItem("userData",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            state.isLoggedIn = true,
            state.userData = JSON.parse(JSON.stringify(action?.payload?.user));
        })
    }
})

export default authSlice.reducer;