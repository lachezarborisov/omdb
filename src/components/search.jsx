import React from 'react';

const Search = (props) => {
    return (
        <div className=''>
            <input 
                className=''
                value={props.searchValue}
                onChange={(e) => props.setSearchValue(e.target.value)}
                placeholder='Search' 
                type="text" />
        </div>
    )
}

export default Search;