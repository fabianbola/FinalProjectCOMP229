/* 
  File Name: listMyQuestions.js
  Description: This component allows users to view a list of their previously submitted questions. 
               It displays the questions along with any answers, and provides functionality for 
               users to navigate to the answer form. The page also handles admin users differently 
               by showing a "Questions History" title and marking unanswered questions as "Pending".
               If a user is not authenticated, they are redirected to the sign-in page.
               Admin users can see all questions with their answers, while regular users can only 
               see their own questions and answers. 
  Team's name: BOFC 
  Group number: 04
  Date: November 23, 2024
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listMyQuestions } from "../../datasource/API-question";
import { getToken } from "../../components/auth/auth-helper";

const ListMyQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // Convert to boolean
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
                } finally {
                    setLoading(false); // Set loading to false once the data is fetched
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
            <h1>{isAdmin ? "Questions History" : "My Questions"}</h1>
            {loading ? (
                <p>Loading...</p> // Show loading text while fetching questions
            ) : questions.length === 0 ? (
                <p>No questions found.</p> // Display no questions if the list is empty
            ) : (
                <ul className="list-group">
                    {questions.map((question) => (
                        <li className="list-group-item" key={question.id}>
                            <p><strong>Question:</strong> {question.question}</p>
                            {question.answer ? (
                                <div>
                                    <p><strong>Answer:</strong> {question.answer}</p>
                                    {!isAdmin && (
                                    <button
                                        className="btn btn-secondary"
                                        disabled // Disable the button if already answered
                                    >
                                        Answered
                                    </button>
                                    )}
                                </div>
                            ) : (

                                isAdmin ? (
                                    <p><strong>Answer:</strong> Pending</p> // Show "Pending" only for admin
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAnswer(question.id)} // Redirect to answer page
                                    >
                                        Answer
                                    </button>
                                )
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

// Export the component
export default ListMyQuestions;
