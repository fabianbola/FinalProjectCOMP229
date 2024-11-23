import { getToken } from "../components/auth/auth-helper";
let apiURL = process.env.REACT_APP_APIURL;


const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

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



export { signin, signup, getUserInfo, updateUser }