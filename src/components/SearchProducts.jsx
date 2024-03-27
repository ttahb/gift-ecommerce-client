import { useState } from "react";

function SearchProducts({ handleTags, handleSearch }) {

    const [ searchInput , setSearchInput ] = useState('');
    // const [ sortBtn , setSortBtn ] = useState(false)

    const hangleClick = (e) => {
        handleTags(e.target.value);
    }

    // const handleClick = () => {
    //     setSortBtn(!sortBtn)
    // }

    const handleSearchPass = (e) => {
        setSearchInput(e.target.value);
        handleSearch(e.target.value);
    }

    return(
        <div>
            <div className="label-div">
                <label className="search-label-container">
                    <input 
                        type="search" 
                        name="search" 
                        value={searchInput} 
                        onChange={handleSearchPass} 
                        placeholder="Search...                                                                                                 &#128270;"
                    />
                </label>
                {/* <button onClick={handleClick}>Sort by</button> */}
            </div>
            <div className="search-btns">
                <button className="secondary option-btn-search" value="wine" onClick={hangleClick}>wine</button>
                <button className="secondary option-btn-search" value="jams" onClick={hangleClick}>jams</button>
                <button className="secondary option-btn-search" value="chocolates" onClick={hangleClick}>chocolates</button>
                <button className="secondary option-btn-search" value="cookies" onClick={hangleClick}>cookies</button>
                <button className="secondary option-btn-search" value="cakes" onClick={hangleClick}>cakes</button>
                <button className="secondary option-btn-search" value="" onClick={hangleClick}>X</button>
            </div>
        </div>
    )
}

export default SearchProducts;