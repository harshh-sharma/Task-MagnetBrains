import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true 
    },
    email:{
        type: String,
        required:true
    },
    password: { 
        type: String, 
        required: true 
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task', 
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User',userSchema);
export default User;