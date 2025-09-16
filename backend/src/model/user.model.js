import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  name: {
    type:String
},
  email: { 
    type: String, 
    unique: true,
    required:[true,"Email must be required"]
},
  password: {
    type:String,
    required:[true,"Password must be required"]
}
});




export const User = mongoose.model('User', userSchema);