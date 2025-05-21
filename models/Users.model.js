
//Schema for storing user data

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    //fullName : Once name added cannot update name , required , 
    fullName: {
        type: String,
        required: true,
        immutable: true,
        minlength : [2 , "fullName must be atleast 2 characters"],
        maxlength : 50
    },

    //Age : required , age between 18 to 60
    age:
    {
        type: Number,
        required: true,
         min: [18, "Minimum age is 18"],
        max: [60, "Maximum age is 60"]
    },

    //isAdult : manually set true
    isAdult:
    {
        type: Boolean,
        default: true
    },

    //profession : required
    profession:
    {
        type: String,
        required: [true, "Profession is required"],
    },

    //experience : required , between 0 to 50
    experience:
    {
        type: Number,
        required: true,
        min : 0, 
        max : 50
    },

    //location : default value set as "Not specified"
    location:
    {
        type: String ,
        // required: true
        default: "Not specified",
        trim : true
    },

    //skills : required
    skills:
    {
        type: Array,
        required: true
    },
    
    //email : Once email added cannot update email , required , lowercase , (more validation added in middleware)
    email:
    {
        type: String,
        required: true,
        immutable: true,
        lowercase: true,
    },

    //isWorking : required
    isWorking:
    {
        type: Boolean , 
        required: [true, "isWorking is required"]
    }

});

//Create a collection name Assignment2_user
const userModel = mongoose.model("Assignment2_User", userSchema);

export default userModel;

