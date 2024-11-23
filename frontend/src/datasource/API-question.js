import { getToken } from "../components/auth/auth-helper";

const apiURL = process.env.REACT_APP_APIURL;

// Create a question for an ad
const createQuestion = async (adID, questionData) => {
    try {
        let response = await fetch(`${apiURL}/questions/create/${adID}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(questionData),
        });
        return await response.json();
    } catch (err) {
        console.error("Error creating question:", err);
    }
};

// List questions for an ad (publicly accessible)
const listQuestionsByAd = async (adID) => {
    try {
        let response = await fetch(`${apiURL}/questions/list/${adID}`, {
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

// List all questions for a signed-in user
const listMyQuestions = async () => {
    try {
        let response = await fetch(`${apiURL}/questions/list`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        return await response.json();
    } catch (err) {
        console.error("Error fetching my questions:", err);
    }
};

// Get specific question details (requires login)
const getSpecificQuestion = async (questionID) => {
    try {
        let response = await fetch(`${apiURL}/questions/get/${questionID}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        return await response.json();
    } catch (err) {
        console.error("Error fetching specific question:", err);
    }
};

// Answer a  question (requires login)
const answerQuestion = async (questionID, answerData) => {
    try {
        let response = await fetch(`${apiURL}/questions/answer/${questionID}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify(answerData),
        });
        return await response.json();
    } catch (err) {
        console.error("Error answering question:", err);
    }
};

export {createQuestion, listQuestionsByAd, listMyQuestions, getSpecificQuestion, answerQuestion};
