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

const login = async (req,res) => {
    try {
       const {email,password} = req.body;
       
       if(!email || !password){
         return res.status(400).json({
            success:false,
            message:'All fields are required'
         });
       }

      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({
            success:false,
            message:'User are not registered'
        })
      }

      sendJwtToken('user successfully loggedIn !!',200,user,res);

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
          })  
    }
}

const getProfile = async (req,res) => {
  try {
    const user = req.user;
    console.log("uswr",user);
    
    if(!user){
      return res.status(400).json({
        success:false,
        message:'user not found'
      })
    }

    const findUserDetail = await User.findById(user.id);


    res.status(200).json({
      success:true,
      message:'user profile successfully get',
      user:findUserDetail
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

const updateProfile = async () => {
 
}

export {
    register,
    login,
    getProfile,
    updateProfile
}