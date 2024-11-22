import React, { useState } from 'react';
import { create, answer } from '../../datasource/API-question';

function CreateQuestion({ adID, ownerAdID, signedInUser }) {
    const [question, setQuestion] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        question: '',
        adID,
        ownerAdID,
    });

    const [showAnswerBox, setShowAnswerBox] = useState(false);
    const [answerText, setAnswerText] = useState('');

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        const result = await create(question);
        alert(result.message || 'Question submitted successfully');
    };

    const handleSubmitAnswer = async () => {
        const result = await answer(question.adID, answerText);
        alert(result.message || 'Answer submitted successfully');
        setShowAnswerBox(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmitQuestion}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={question.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={question.lastName}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={question.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={question.phoneNumber}
                    onChange={handleChange}
                />
                <textarea
                    name="question"
                    placeholder="Your Question"
                    value={question.question}
                    onChange={handleChange}
                />
                <button type="submit">Submit Question</button>
            </form>

            {signedInUser === ownerAdID && (
                <div>
                    <button onClick={() => setShowAnswerBox(!showAnswerBox)}>
                        Answer Question
                    </button>
                    {showAnswerBox && (
                        <div>
                            <textarea
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                placeholder="Your Answer"
                            />
                            <button onClick={handleSubmitAnswer}>Submit Answer</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateQuestion;
