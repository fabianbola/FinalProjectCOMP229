/* 
  File Name: config.js
  Description: Database configuration file for the backend application.
               This file exports the MongoDB Atlas connection string and a secret key for secure operations, 
               allowing the application to connect to the remote database and manage authentication.   
  Team's name: BOFC 
  Group number: 04
  Date: November 9, 2024
*/


// Configuration file exporting connection details for MongoDB Atlas and a secret key.

// Connection string to MongoDB Atlas. This URL includes credentials and path 
// for connecting to the remote MongoDB database.
module.exports = {
    "ATLASDB": "mongodb+srv://dbadmin:YVr3YKLvmAZjDlPF@express.oh34o.mongodb.net/project2?retryWrites=true&w=majority",
    "SECRETKEY": "e-zcC)&Tm?xhp2[@{nGgF3"
}