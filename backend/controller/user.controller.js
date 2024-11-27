import User from "../models/user.model.js";
import sendJwtToken from "../utils/sendJwtToken.js";

const register = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const user = await User.create({username,email,password});
        sendJwtToken('Something went wrong !! Please try again',200,user,res);

    } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })  
    }
}

export {
    register
}