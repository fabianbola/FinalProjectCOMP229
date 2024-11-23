//LOGIC 1 (Anonimus users) CREATE QUESTION and listquestionbyId

//Here is the logic to brin all the questions that are in an ad. 
// Home page (page 1) --> select an ad --> Questions  Button --> List all the questions of that Ad (page2)
// page 1 is: an example http://localhost:3000/ 
// Page 2 is http://localhost:3000/Home/Ads/Details/672e5a124332f8d119130b76/Questions
// In second page created the table with the information (Question / Answer) at the end 2 buttons: create question and back
// the logic of back button is the same that is in Ads 
// create question button will direct me to Page 3 with the form. Something like:
//Question: Why is so expensive (user input)
//In that page antoher 2 buttons: clear (clear que form) and submit 
// When is click the submit button alert 1: Are you sure you want to create this questions?
// alert 2:--> Question created suscessfully (ID : XXXXXXX)
// alert 3 --> An error ocurred. Try again. 
// After that the user will be sent it to  Page 2. (Ads same logic?)
// In Page 2 it would be updated automatically so the new question appears. 

//LOGIC 2 
// User sig in to the systems.
// Go to My ads // Ads history (if is admin)
// now see details of add 
// click button questions
//page 2: http://localhost:3000/Ads/Details/672e5a7a4332f8d119130b81
// here: 
// In second page created the table with the information at the end 1 buttons:  back
// In each question a button Answer (Disable if there is an anwser arleady)
// the logic of back button is the same that is in Ads 
// Answer button will direct me to Page 3 with the form to reply the questions. Something like:
//Question: Why is so expensive 
// Answer: Because the high quality (user input)
//In that page antoher 2 buttons: clear (clear que form) and submit 
// When is click the submit button alert 1: Are you sure you want to create this answer?
// alert 2:--> Answer created suscessfully. 
// alert 3 --> An error ocurred. Try again. 
// After that the user will be sent it to  Page 2. (Ads same logic?)
// In Page 2 it would be updated automatically so the new answer appears in the question.

// Question                     // Answer
// Why is so expensive          // Because the high quality


// Logic 3 (mY QUESTIONS)
// User click on MyQuestions
//SIMILAR TO MY ADDS BUT NO FILTERS


//qUESTION  // Answer // Action 

// Actions you have details  click open a new page
// that shows the specifi information of the question. 

//Buttons: Back, and Answer: ( Answer is disabled if there is an answer arleady).
//How to do it? look ads code


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
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="container" style={{ paddingTop: 80 }}>
                <h1>Questions</h1>
                <button
                    className="btn btn-primary my-3"
                    onClick={() => navigate(`/questions/create/${adID}`)} // Navigate to CreateQuestion form
                >Ask a Question
                </button>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => navigate(-1)}
                >Back to Ads
                </button>
                <div className="table-responsive mt-4"> 
                {isLoading && <div>Loading...</div>}
                    {!isLoading && (!listQuestionsByAd || listQuestionsByAd.length === 0) && <div>No ads found.</div>}
                    {!isLoading && listQuestionsByAd.length > 0 && (
                    <table className="table table-bordered table-striped table-hover">
                            <tread>
                                <tr>
                                    <th>Created Date</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                </tr>
                            </tread>
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
export default ListQuestionsByAd;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listQuestionsByAd } from "../../datasource/API-question";

const ListQuestionsByAd = () => {
    const { adID } = useParams(); // Get the adID from the URL params
    const navigate = useNavigate(); // Use navigate for routing
    const [questions, setQuestions] = useState([]); // Store questions

    useEffect(() => {
        // Fetch the list of questions for the specific ad
        const fetchQuestions = async () => {
            try {
                const data = await listQuestionsByAd(adID);
                setQuestions(data); // Store the fetched questions
            } catch (error) {
                alert("Failed to load questions. Please try again.");
            }
        };
        fetchQuestions();
    }, [adID]);

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Questions</h1>
            <ul className="list-group">
                {questions.map((q) => (
                    <li key={q._id} className="list-group-item">
                        <p><strong>Question:</strong> {q.question}</p>
                        {q.answer && <p><strong>Answer:</strong> {q.answer}</p>}
                    </li>
                ))}
            </ul>
            <button
                className="btn btn-primary my-3"
                onClick={() => navigate(`/questions/create/${adID}`)} // Navigate to CreateQuestion form
            >
                Ask a Question
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default ListQuestionsByAd;


