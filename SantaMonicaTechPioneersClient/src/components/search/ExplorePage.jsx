import React from "react";
import "../css/ExplorePage.css"
import { useState } from "react";
import { useSearch } from "./hooks/useSearch";


function ExplorePage() {

    const {searchProjects} = useSearch();

    const [searchQuery, setSearchQuery] = useState('');

    const [searchResults, setSearchResults] = useState();

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async(event) => {
        event.preventDefault();
            const [status, data] = await searchProjects(1, searchQuery);
            if(status === 200) {
                setSearchResults(data);
            } else {
                console.log('Failed to search projects');
            }
    }
// atskiras mygtukas su onclick, load more t.t

// page index state, start 1 , onclick load more -- page index + 1 , request await search projects  (page index), prie senu pridet naujus indexus. 

    return (
        // fix as Create user form 
        <div className="pataisome">
            <h1>Explore projects</h1>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search.."
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {searchResults && searchResults.map((result) => (
                    <div key={result.id}>
                        <h3>{result.name}</h3>
                        <p>{result.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;