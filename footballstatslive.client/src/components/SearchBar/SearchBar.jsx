import React, { useState } from 'react';
import './SearchBar.css'; 
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function SearchBar(props) {
    // setup and init state values
    const [searchTerm, setSearchTerm] = useState('');
    const [columnTerm, setColumnTerm] = useState('All');

    // handler for when the search input text is changed
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // handler for sending back the search parameters to the parent
    // used on button click and press of Enter key
    const handleSearch = () => {
        const searchObj = { searchTerm: searchTerm, columnTerm: columnTerm };
        props.onSearch(searchObj);
    };

    // handler for resetting the search filters
    // used on button click of the reset button
    const resetSearch = () => {
        setColumnTerm('All');
        setSearchTerm('');
        props.onReset();
    };

    // keyboard handler for when enter is pressed instead of button click
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // handler for processing the drop down change event
    const handleSelectChange = (event) => {
        setColumnTerm(event.value);
    };

    // create the options from the columns already defined for use on the table
    //  strip out the spaces on the value as this will match the property name
    let options = props.cols.map(item => ({
        value: item.name.replace(/\s/g, ''),
        label: item.name
    }));

    // push in the All Columns option so users can select to search all columns again.
    const allOption = {
        value: 'All',
        label: '-- All Columns --'
    }
    // and make it the first option
    options.unshift(allOption);


    // return the search bar component
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} aria-label="Search"><i className="search-icon" aria-hidden="true"></i></button>
            <button onClick={resetSearch} aria-label="Reset Data"><i className="reset-icon" aria-hidden="true"></i></button>
            <div className="column-search">
                <span>Search By Column:</span>
                <Dropdown options={options} onChange={handleSelectChange} value={columnTerm} placeholder="Select a column" />
            </div>
        </div>
    );
}

export default SearchBar;