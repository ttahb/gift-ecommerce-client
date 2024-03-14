import { useState } from "react";

function SearchProducts({ handleTags, handleSearch }) {

    const [ searchInput , setSearchInput ] = useState('');

    const hangleClick = (e) => {
        handleTags(e.target.value);
    }

    const handleSearchPass = (e) => {
        setSearchInput(e.target.value);
        handleSearch(e.target.value);
    }

    return(
        <div>
            <br />
            <div>
                <button value="wine" onClick={hangleClick}>wine</button>
                <button value="jams" onClick={hangleClick}>jams</button>
                <button value="chocolates" onClick={hangleClick}>chocolates</button>
                <button value="cookies" onClick={hangleClick}>cookies</button>
                <button value="cakes" onClick={hangleClick}>cakes</button>
                <button value="" onClick={hangleClick}>X</button>
            </div>
            <div>
                <label>
                    <input type="search" name="search" value={searchInput} onChange={handleSearchPass} placeholder="Search..."/>
                </label>
            </div>
            <br />
        </div>
    )
}

export default SearchProducts;