import { config } from "dotenv";
import app from "./app.js";

config();

const PORT = process.env.PORT || 3500;

app.listen(PORT,() => {
    console.log(`server successfully running on ${PORT}`);
    
})

