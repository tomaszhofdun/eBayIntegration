import React from "react";

function SearchForm() {
    return (
        <div className="search-form">
            <input
                type="search"
                name="search"
                id="search"
                placeholder="ENTER TEXT TO SEARCH..."
            />
        </div>
    );
}

export default SearchForm;
