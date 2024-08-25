import React, { useState } from 'react';
import '../components/BfhlForm.css';

const BfhlForm = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = inputData.split(',');
        const response = await fetch('https://backend-2-6w2q.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
        const result = await response.json();
        setResponse(result);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>API Input</label>
                <input
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='{"data":["M","1","334","4","B"]}'
                />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div className="response">
                    <h3>Filtered Response</h3>
                    <p>Numbers: {response.numbers.join(', ')}</p>
                    <p>Alphabets: {response.alphabets.join(', ')}</p>
                    <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default BfhlForm;
