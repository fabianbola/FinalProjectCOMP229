/* 
  File Name: users.js
  Description: Provides functionalities for user management, including creating, updating,
               deleting users, and handling user sign-out.
  Team's name: BOFC 
  Group number: 04
  Date: November 9, 2024
*/

// Import the User model
let UserModel = require('../models/users');

// Function to create a new user
module.exports.create = async function (req, res, next) {
    try {
        console.log(req.body); 
        let newUser = new UserModel(req.body); 

        await UserModel.create(newUser); 
        res.json({
            success: true,
            message: 'User created successfully.'
        });
    } catch (error) {
        console.log(error); 
        next(error); 
    }
}

// Function to update an existing user
module.exports.update = async function (req, res, next) {
    try {
        let uID = req.params.userID;

        let updateUser = new UserModel(req.body); 
        updateUser._id = uID; 

        // Update the user's information in the database
        let result = await UserModel.updateOne(
            { _id: uID },
            {
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                email: updateUser.email,
                password: updateUser.password,
                updated: Date.now() 
            }
        );
        console.log(result); // Log the result of the update operation

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: 'User updated successfully.'
            });
        } else {
            // If no document was modified, throw an error
            throw new Error('User not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error); 
        next(error); 
    }
}

// Function to delete an existing user
module.exports.remove = async function (req, res, next) {
    try {
        let uID = req.params.userID; 

        // Delete the user from the database
        let result = await UserModel.deleteOne({ _id: uID });
        console.log(result); 

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: 'User deleted successfully.'
            });
        } else {
            // If no document was deleted, throw an error
            throw new Error('User not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Function to handle user sign-out
module.exports.signout = async function (req, res, next) {
    try {
        const uID = req.params.userID; 

        // Respond with a successful sign-out message
        res.json({
            success: true,
            message: `User with ID ${uID} signed out successfully.`
        });
    } catch (error) {
        console.log(error);
        next(error); 
    }
};
