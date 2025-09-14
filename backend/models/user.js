import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    phoneNumber : {
        type: String,
        required: true,
        unique: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    address : {
        type: String,
        required: true
    },
    identity :{
        type: String,
        required: true
    },
    dob : {
        type: Date,
        required: true,
        default : new Date()
    },
    role: {
        type: String,
        enum: ["ADMIN", "STUDENT","TEACHER"],
        // default: "user"
    },
    isDeleted :{
        type: Boolean,
        default: false
    }
    
})
export const UserModel = mongoose.model('user',userSchema)