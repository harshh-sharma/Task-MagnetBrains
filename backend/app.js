import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './routes/user.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/ping',(req,res) => {
   res.send('/pong')
})

app.use('/api/v1/user',userRouter);


export default app;