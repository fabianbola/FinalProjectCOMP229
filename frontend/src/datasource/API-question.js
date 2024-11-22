//Everyone base on the back-end method that the front-end is calling
const apiURL = process.env.REACT_APP_APIURL;

// Create a new question (requires login)
const create = async (question) => {
    try {
        let response = await fetch(`${apiURL}/questions/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question),
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// List all questions by a signed-in user (requires login)
const listByOwner = async () => {
    try {
        let response = await fetch(`${apiURL}/questions/myUser/list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Get a specific question by ID (requires login)
const read = async (id) => {
    try {
        let response = await fetch(`${apiURL}/questions/get/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

// Answer a question (requires login)
const answer = async (id, answer) => {
    try {
        let response = await fetch(`${apiURL}/questions/answer/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer }),
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
};

export { create, listByOwner, read, answer };
