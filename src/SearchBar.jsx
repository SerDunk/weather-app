import { useState } from "react";

function SearchBar({term,setTerm,onSubmit}){
    

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        onSubmit(term);
    }

    const handleChange=(event)=>{
        setTerm(event.target.value);
    }
    return(
        <div>
            <form onSubmit={handleFormSubmit}>
              <input value={term} onChange={handleChange} type="text" placeholder="Search for a city" />
            </form>
            
        </div>
    )
}

export default SearchBar