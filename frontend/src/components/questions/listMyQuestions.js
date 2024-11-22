import React, { useEffect, useState } from 'react';
import { listByOwner } from '../../datasource/API-question';

function ListMyQuestions() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await listByOwner();
            setQuestions(result.questions || []);
        };

        fetchQuestions();
    }, []);

    return (
        <div>
            <h2>My Questions</h2>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>
                        <p>Question: {q.question}</p>
                        <p>Answer: {q.answer || 'Not answered yet'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListMyQuestions;
