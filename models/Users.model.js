
//Schema for storing user data

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    //Once name added , cannot update name
    fullName: {
        type: String,
        required: true,
        immutable: true,
        minlength : 2,
        maxlength : 50
    },
    age:
    {
        type: Number,
        required: true,
        min : 18 ,
        max : 60
    },
    isAdult:
    {
        type: Boolean,
        default: true
    },
    profession:
    {
        type: String,
        required: true
    },
    experience:
    {
        type: Number,
        required: true,
        min : 0, 
        max : 50
    },
    location:
    {
        type: String ,
        // required: true
        default: "Not specified"
    },
    skills:
    {
        type: Array,
        required: true
    },
    
    //Once email added , cannot update email
    email:
    {
        type: String,
        required: true,
        immutable: true,
        lowercase: true,
    },
    isWorking:
    {
        type: Boolean , 
        required: true
    }

});

//Create a collection name Assignment2_user
const userModel = mongoose.model("Assignment2_User", userSchema);

export default userModel;

