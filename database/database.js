import mongoose from "mongoose";

// Use Mongoose to connect your Node.js application to a MongoDB database
export async function connectDatabase() {

    try {
        await mongoose.connect("mongodb://localhost:27017/assignment2");

        console.log(`Database connected successfully `);

    } catch (err) {
        console.log("Error while connecting to the database", err.message);
        
        process.exit(1);
    }

    mongoose.connection.on("disconnected" , ()=>{
        console.log("MongoDB disconnected ")
    })

}

export default connectDatabase;