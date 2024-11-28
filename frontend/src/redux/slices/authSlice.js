import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";


export const register = createAsyncThunk("/user/register",async(data) => {
    try {
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait !! creating your account",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to create account"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        data: localStorage.getItem("data") == 'undefined' ? {} : JSON.parse(localStorage.getItem("data")),
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(register.fulfilled,(state,action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
           
            state.isLoggedIn = true,
            state.data = JSON.parse(JSON.stringify(action?.payload?.user));
        })
        
    }
})


export default authSlice.reducer;