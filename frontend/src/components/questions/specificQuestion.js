// vamos a probar los cambios de brandy

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpecificQuestion, answerQuestion } from "../../datasource/API-question";
import { getToken } from "../../components/auth/auth-helper"; 

const SpecificQuestion = () => {
    const { questionID } = useParams(); // Retrieve question ID from the URL
    const navigate = useNavigate(); // Use navigate for redirects
    const [question, setQuestion] = useState(null); // Store the question details
    const [answer, setAnswer] = useState(""); // Store the user's answer
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if the user is authenticated
    console.log("=========================1========================");
    console.log(questionID);
    // Fetch the question details when the component loads
    useEffect(() => {
        console.log("=========================2a========================");

        const fetchQuestion = async () => {
            try {
                const data = await getSpecificQuestion(questionID);
                setQuestion(data);
                console.log("=========================2========================");

            } catch (error) {
                alert("Failed to load the question details.");
                console.log("=========================3========================");

            }
        };
        fetchQuestion();
        console.log("=========================4========================");


        // Check if the user is authenticated
        const token = getToken();
        setIsAuthenticated(!!token); // User is authenticated if a token is found
        console.log("=========================5========================");

    }, [questionID]);

    // Handle answer submission
    const handleAnswerSubmit = async () => {
        if (!answer.trim()) {
            alert("Please provide an answer.");
            return;
        }

        if (window.confirm("Are you sure you want to submit this answer?")) {
            try {
                // Update the question with the answer in the backend
                await answerQuestion(questionID, { answer });
                alert("Answer submitted successfully!");

                // Refresh the question data to include the new answer
                const updatedQuestion = { ...question, answer };
                setQuestion(updatedQuestion); // Update the local state with the new answer

                // Navigate back to the previous page 
                navigate(-1); // Go back to the previous page
            } catch (error) {
                alert("Failed to submit the answer. Please try again.");
            }
        }
    };

    // Handle clearing the answer input
    const handleClear = () => {
        setAnswer(""); // Reset the answer field
    };

    // If no question is loaded, show loading message
    if (!question) {
        return <div>Loading question details...</div>;
    }

    // Disable the Submit Answer button if the question already has an answer
    const isAnswered = question.answer && question.answer.trim() !== "";

    return (
        <div className="container mt-5">
            <h1>Question Details</h1>
            <p><strong>Question:</strong> {question.question}</p>
            
            {isAnswered ? (
                <p><strong>Answer:</strong> {question.answer}</p>
            ) : (
                <div>
                    {!isAuthenticated ? (
                        <p>Please <a href="/signin">sign in</a> to answer this question.</p>
                    ) : (
                        <textarea
                            className="form-control mb-3"
                            placeholder="Enter your answer here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    )}
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleAnswerSubmit}
                        disabled={isAnswered || !isAuthenticated} 
                    >
                        Submit Answer
                    </button>
                    <button
                        className="btn btn-warning me-2"
                        onClick={handleClear}
                        disabled={!isAuthenticated} 
                    >
                        Clear
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)} 
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpecificQuestion;
