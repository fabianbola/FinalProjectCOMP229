import React, { useEffect, useState } from 'react';
import { read } from '../../datasource/API-question';

function SpecificQuestion({ questionID }) {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            const result = await read(questionID);
            setQuestion(result.question || null);
        };

        fetchQuestion();
    }, [questionID]);

    if (!question) return <p>Loading...</p>;

    return (
        <div>
            <h2>Question Details</h2>
            <p>Question: {question.question}</p>
            <p>Answer: {question.answer || 'Not answered yet'}</p>
        </div>
    );
}

export default SpecificQuestion;

