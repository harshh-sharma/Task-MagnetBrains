import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";


export const getTasks = createAsyncThunk("/task/",async() => {
    try {
        const res = axiosInstance.get("/task/");
        toast.promise(res,{
            loading:"Wait !! loading your tasks",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to load tasks"
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const createTask = createAsyncThunk("/task/",async(data) => {
    try {
        const res = axiosInstance.post("/task/",data);
        toast.promise(res,{
            loading:"Wait !! while creating your task",
            success:(data) => {
                console.log("datacreate",data);
                
                return data?.data?.message;
            },
            error:"Failed to create task"
        })
        return (await res).data;
    } catch (error) {
        console.log("craete",error);
        toast.error(error?.response?.data?.message);
    }
})

export const deleteTask = createAsyncThunk("/task/taskId",async(taskId) => {
    try {
        const res = axiosInstance.delete(`/task/${taskId}`);
        toast.promise(res,{
            loading:"Wait !! while deleting your task",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to delete task"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const taskSlice = createSlice({
    name:"task",
    initialState:{
        tasks: localStorage.getItem("tasks") == 'undefined' ? {} : JSON.parse(localStorage.getItem("tasks")),
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getTasks.fulfilled,(state,action) => {
            localStorage.setItem("tasks",JSON.stringify(action?.payload?.tasks));
            state.tasks = JSON.parse(JSON.stringify(action?.payload?.tasks));
        })
        
    }
})


export default taskSlice.reducer;