
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listMyQuestions } from "../../datasource/API-question";
import { getToken } from "../../components/auth/auth-helper"; 

const ListMyQuestions = () => {
    const [questions, setQuestions] = useState([]); 
    const navigate = useNavigate(); 

    // Check if the user is authenticated
    useEffect(() => {
        const token = getToken();
        if (!token) {
            // If not authenticated, redirect to the sign-in page
            navigate("/signin"); // Replace with your actual sign-in route
        } else {
            // If authenticated, fetch the user's questions
            const fetchMyQuestions = async () => {
                try {
                    const data = await listMyQuestions();
                    setQuestions(data);
                } catch (error) {
                    alert("Failed to load your questions. Please try again.");
                }
            };
            fetchMyQuestions();
        }
    }, [navigate]);

    // Handle navigating to the answer form
    const handleAnswer = (questionID) => {
        navigate(`/questions/Answer/${questionID}`);
    };

    return (
        <div className="container mt-5">
            <h1>My Questions</h1>
            {questions.length === 0 ? (
                <p>No questions found.</p>
            ) : (
                <ul className="list-group">
                    {questions.map((question) => (
                        <li className="list-group-item" key={question._id}>
                            <p><strong>Question:</strong> {question.question}</p>
                            {question.answer ? (
                                <div>
                                    <p><strong>Answer:</strong> {question.answer}</p>
                                    <button
                                        className="btn btn-secondary"
                                        disabled // Disable the button if already answered
                                    >
                                        Answered
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleAnswer(question._id)} // Redirect to answer page
                                >
                                    Answer
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default ListMyQuestions;

