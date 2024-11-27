import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/user.route.js';
import taskRouter from './routes/task.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/ping',(req,res) => {
   res.send('/pong')
})

app.use('/api/v1/user',userRouter);
app.use('/api/v1/task',taskRouter);


export default app;