import React, { useState } from 'react';

const DataInputForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setResponseData(null); // Reset response state

        try {
            const jsonInput = JSON.parse(inputValue); // Parse the JSON input

            const response = await fetch('http://localhost:6060/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonInput),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResponseData(data); // Set the response data to state
        } catch (error) {
            setError('Invalid input or server error'); // Set error message
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <h1>RA2111003010709</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Enter JSON data here...'
                    rows='4'
                    cols='50'
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DataInputForm;
