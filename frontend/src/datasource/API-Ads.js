//Everyone base on the back-end method that the front-end is calling

//import { getToken } from "../components/auth/auth-helper";

const apiURL = process.env.REACT_APP_APIURL;

// List all active ads in a category (publicly accessible)
const list = async (category) => {
    try {
      // Avoid empty category in the URL
      const fetchCategory = category ? category : "all";  // Default to "all"
      let response = await fetch(apiURL + '/ads/list/' +fetchCategory, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };

// List all ads by a specific owner (requires login)
const listByOwner = async (category) => {
    try {
        let response = await fetch(`${apiURL}/ads/myUser/list/${category}`, { 
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Create a new ad (requires login)
const create = async (ad) => {
    try {
        let response = await fetch(`${apiURL}/ads/myUser/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(ad)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Update an ad (requires login)
const update = async (id, ad) => {
    try {
        let response = await fetch(`${apiURL}/ads/myUser/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(ad)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Disable an ad (requires login)
const disable = async (id) => {
    try {
        let response = await fetch(`${apiURL}/ads/myUser/disable/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Get an ad by ID (publicly accessible)
const read = async (id) => {
    try {
        let response = await fetch(`${apiURL}/ads/get/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Delete an ad by ID (Admin only)
const remove = async (id) => {
    try {
        let response = await fetch(`${apiURL}/ads/myAdminUser/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

export { list, listByOwner, create, update, disable, read, remove };
