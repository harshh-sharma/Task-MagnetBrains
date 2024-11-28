import { Router } from "express";
import {getProfile, login, logout, register, updateProfile} from '../controller/user.controller.js'
import isAuthenticated from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/profile',isAuthenticated,getProfile);
userRouter.put('/update',updateProfile);
userRouter.get('/logout',logout);


export default userRouter;