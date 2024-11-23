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

        
        //setTimeout( async () => {

        //}, 2000);
       
        setTimeout( async () => {
            console.log(req.body); 
            let newUser = new UserModel(req.body); 
    
            await UserModel.create(newUser); 
            res.json({
                success: true,
                message: 'User created successfully.'
            });
        }, 2000);

    } catch (error) {
        console.log(error); 
        next(error); 
    }
}

// Function to update an existing user
module.exports.update = async function (req, res, next) {
    try {


        setTimeout( async () => {
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
        }, 2000);

        
    } catch (error) {
        console.log(error); 
        next(error); 
    }
}

// Function to delete an existing user
module.exports.remove = async function (req, res, next) {
    try {

        setTimeout( async () => {
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
        }, 2000);
   
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Function to handle user sign-out
module.exports.signout = async function (req, res, next) {
    try {

        setTimeout( async () => {
            const uID = req.params.userID; 

            // Respond with a successful sign-out message
            res.json({
                success: true,
                message: `User with ID ${uID} signed out successfully.`
            });
        }, 2000);
        
    } catch (error) {
        console.log(error);
        next(error); 
    }
};

// Function to retrieve user information
module.exports.getUserInfo = async function (req, res, next) {
    try {
        console.log("Decoded token:", req.auth); 

        const userID = req.auth?.id; 
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in token.',
            });
        }

        const user = await UserModel.findById(userID).select('-hashed_password -salt');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user info:', error);
        next(error);
    }
};





