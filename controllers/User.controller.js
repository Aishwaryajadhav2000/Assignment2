import usersModel from "../models/Users.model.js";


//Fetch all users from the MongoDB collection.
export async function fetchUsers(req, res) {
    try {
        let data = await usersModel.find();

        // If no users exist
        if (data.length === 0) {
            return res.status(400).json({ message: "No data to display" });
        } else {
             // Return all user data
            return res.status(200).json({ message: "users fetch successfully", totalUsers: data.length, users: data });

        }

    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

//Fetch details of a specific user by MongoDB ObjectId
export async function fetchUserById(req, res) {

    try {
        const id = req.params.id;
        
        // Find user by ID
        const findUser = await usersModel.findById(id, req.body);

        //If user not exist
        if (!findUser) {
            return res.status(400).json({ message: `User not found with id : ${id} ` });
        }

        // Return specific user data
        return res.status(200).json({ message: "User data fetch successfully", user: findUser })
    } catch (err) {

        return res.status(401).json({ error: err });

    }

}

//Add a new user and save it in MongoDB
export async function createUsers(req, res) {
    try {

         // Destructure user input from request body
        let { fullName, age, isAdult, profession, experience, location, skills, email, isWorking } = req.body;

        // Create new user
        const newUser = await usersModel.create({ fullName, age, isAdult, profession, experience, location, skills, email, isWorking });

        // Return response with created user
        return res.status(200).json({ message: "USer created successfully", "newUser": newUser });

    } catch (err) {
        return res.status(400).json({ error: err });
    }
}


// Update details of an existing user. (Name and email cannot update as it immutable: true)
export async function updateUser(req, res) {
    try {
        const id = req.params.id;

        //Find user by ID and update the allowed fields
        const updatedUser = await usersModel.findByIdAndUpdate(id, req.body, { new: true });

        //IF user not found with id
        if (!updatedUser) {
            return res.status(400).json({ message: `Cannot update..No user found with ID : ${id} ` })
        }

        // Return the updated user
        return res.status(200).json({ message: "User updated successfully", updatedUser: updatedUser });
    } catch (err) {
        return res.status(401).json({ error: err });
    }
}


//Delete a user by MongoDB ObjectId
export async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        // Find and delete user by ID
        const deletedUser = await usersModel.findByIdAndDelete(id, req.body)

        //If id not exist
        if (!deletedUser) {
            return res.status(400).json({ message: `Cannot Delete..No user found with ID : ${id} ` });
        }

        // Return deleted user info
        return res.status(200).json({ message: "USer Deleted successfully", deletedUser: deleteUser });

    } catch (err) {
        return res.status(401).json({ error: err })
    }
}


//Delete all users
export async function deleteAll(req, res) {
    try {
        let data = await usersModel.find();

         // Delete all user documents
         await usersModel.deleteMany({});

         //log if userlist is empty
        if (data.length === 0) {
            return res.status(400).json({ message: "User List is already empty" })
        } else {
            //delete and return statement
            return res.status(200).json({ message: "All users deleted successfully" })

        }

    } catch (err) {
        return res.status(401).json({ error: err });
    }

}
