//API's Routing

import { createUsers , fetchUsers , fetchUserById , updateUser , deleteUser, deleteAll} from "../controllers/User.controller.js";
import { userValidation } from "../middleware/middleware.js";

export function restRoutes(app){

    //Fetch all users from the MongoDB collection.
    app.get('/users' , fetchUsers)

    //Fetch details of a specific user by MongoDB ObjectId
    app.get('/users/:id' , fetchUserById)

    //Add a new user and save it in MongoDB
    app.post('/user' , userValidation, createUsers);
    
    // Update details of an existing user.
    app.put('/user/:id' , userValidation , updateUser)

    //Delete a user by MongoDB ObjectId
    app.delete('/user/:id' , deleteUser)

    //Delete All users
    app.delete('/users' , deleteAll)
}



