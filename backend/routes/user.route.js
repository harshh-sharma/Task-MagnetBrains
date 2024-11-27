import { Router } from "express";
import {getProfile, login, register, updateProfile} from '../controller/user.controller.js'

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/profile',getProfile);
userRouter.put('/update',updateProfile);


export default userRouter;