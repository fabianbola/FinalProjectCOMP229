/* 
  File Name: API-user.js
  Description: This file contains functions for interacting with the user-related API endpoints. It includes methods for signing in, signing up, 
               retrieving user info, updating user details, logging out, listing non-admin users, and removing users.
               Each function handles the HTTP requests to the API and returns the appropriate response data or error message.
  Team's name: BOFC 
  Group number: 04
  Date: November 23, 2024
*/

import { getToken } from "../components/auth/auth-helper";
let apiURL = process.env.REACT_APP_APIURL;

// Sign in a user with the provided credentials
const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// Sign up a new user
const signup = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Fetch the current user's information
const getUserInfo = async () => {
    try {
        console.log("Sending request to:", `${apiURL}/users/me`);

        const response = await fetch(`${apiURL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            console.error("Error in response:", response.statusText);
            return {
                success: false,
                message: response.statusText || "Failed to fetch user info",
            };
        }

        const data = await response.json();
        console.log("Response data:", data);

        return data;
    } catch (err) {
        console.error("Error fetching user info:", err);
        return {
            success: false,
            message: "Failed to fetch user info",
        };
    }
};

// Update the details of a specific user
const updateUser = async (userId, userData) => {
    try {
        let response = await fetch(`${apiURL}/users/edit/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Failed to update user."
        };
    }
};

// Log out a user
const logOut = async (idUser) => {
    try {
        let response = await fetch(apiURL + '/myuser/signout/' + idUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

// List non-admin users
const listUsers = async () => {
    try {
        const response = await fetch(`${apiURL}/users/Adminuser/List-non-admin-users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        });

        const result = await response.json();
        console.log("API Response:", result);

        const users = result.data || [];
        if (!Array.isArray(users)) {
            console.error("Expected an array of users but got:", users);
            return [];
        }

        return users;
    } catch (err) {
        console.error("Error fetching users:", err);
        return [];
    }
};

// Remove a user by their ID
const removeUser = async (userId) => {
    try {
        const response = await fetch(`${apiURL}/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
        });

        if (!response.ok) {
            console.error("Failed to delete user:", response.statusText);
            return {
                success: false,
                message: response.statusText || "Failed to delete user",
            };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error deleting user:", err);
        return {
            success: false,
            message: "Failed to delete user.",
        };
    }
};

export { signin, signup, getUserInfo, updateUser, logOut, listUsers, removeUser }
