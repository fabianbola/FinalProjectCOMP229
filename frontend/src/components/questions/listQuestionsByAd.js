/* 
  File Name: listQuestionsByAd.js
  Description: This component is responsible for displaying a list of questions submitted 
               for a specific advertisement. The ad's unique ID is extracted from the URL 
               parameters, and the component fetches the associated questions from the API. 
               It presents these questions in a table format, showing their creation date, 
               content, and answer. Additionally, it provides options for users to ask new 
               questions or navigate back to the advertisements page. The component manages 
               the loading state, ensuring a smooth user experience while fetching the data.
  Team's name: BOFC 
  Group number: 04
  Date: November 23, 2024
*/

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listQuestionsByAd } from "../../datasource/API-question";

const ListQuestionsByAd = () => {
    const { adID } = useParams(); // Get the adID from the URL params
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Use navigate for routing
    const [listQuestions, setListQuestions] = useState([]); // Store questions

    useEffect(() => {
        // Fetch the list of questions for the specific ad
        const fetchQuestions = async () => {
            try {
                const data = await listQuestionsByAd(adID); // Await the response
                if (data) {
                    setListQuestions(data); // Store the fetched questions
                }
            } catch (err) {
                alert(err.message);
                console.error(err);
            } finally {
                setIsLoading(false); // Ensure loading state is updated
            }
        };
        fetchQuestions(); // Call the function
    }, [adID]); // Dependency array to re-fetch if adID changes

    return (
        <main className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="container" style={{ paddingTop: 10 }}>
                    <h1>Questions</h1>
                    <button
                        className="btn btn-primary my-3"
                        onClick={() => navigate(`/questions/create/${adID}`)} // Navigate to CreateQuestion form
                    >
                        Ask a Question
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => navigate(-1)}
                    >
                        Back to Ads
                    </button>
                    <div className="table-responsive mt-4"> 
                        {isLoading && <div>Loading...</div>}
                        {!isLoading && listQuestions.length === 0 && (
                            <div>No questions were found for this product.</div>
                        )}
                        {!isLoading && listQuestions.length > 0 && (
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Created Date</th>
                                        <th>Question</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listQuestions.map((question) => (
                                        <tr key={question._id}>
                                            <td>{new Date(question.createdDate).toLocaleDateString()}</td>
                                            <td>{question.question}</td>
                                            <td>{question.answer}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>  
                </div>
            </div>
        </main>
    );
};

// Export the component
export default ListQuestionsByAd;
