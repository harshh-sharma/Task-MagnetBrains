import User from "../models/user.model.js";

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

        if(!user){
            return res.status(400).json({
                success:false,
                message:'Something went wrong !! Please try again'
            })
        }

        return res.status(200).json({
            success:true,
            message:'user successfully registered !!'
        })
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