// src/components/SearchBox.jsx
import React, { useState, useRef, useEffect } from 'react';

function SearchBox({ onSearch, onClear, searchText }) {
    const [inputValue, setInputValue] = useState(searchText); // Initialize with searchText

    const inputRef = useRef(null);

    useEffect(() => {
        setInputValue(searchText); // Update inputValue when searchText changes (e.g., onClear)
    }, [searchText]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
        onSearch(event.target.value); // Directly call onSearch on input change
    };

    const handleClear = () => {
        setInputValue(''); // Clear the local input value
        onClear(); // Call the onClear function from the parent
        if (inputRef.current) {
            inputRef.current.focus(); // Focus on the input after clearing
        }
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter title, description, or price"
                value={inputValue}
                onChange={handleChange}
                ref={inputRef} // Attach the ref to the input
            />
            {inputValue && (
                <button className="btn btn-outline-secondary" type="button" onClick={handleClear}>
                    Clear
                </button>
            )}
        </div>
    );
}

export default SearchBox;
