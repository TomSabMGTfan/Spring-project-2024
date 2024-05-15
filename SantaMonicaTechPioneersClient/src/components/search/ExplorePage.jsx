import React, { useState, useEffect } from "react";
import "../css/ExplorePage.css";
import { useSearch } from "./hooks/useSearch";

function ExplorePage() {
    const { searchProjects } = useSearch();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() !== '') {
                const [status, data] = await searchProjects(1, searchQuery);
                if (status === 200) {
                    setSearchResults(data);
                } else {
                    console.log('Failed to search projects');
                }
            } else {
                setSearchResults([]);
            }
        };

        // Fetch search results only if searchQuery is not empty
        fetchSearchResults();
    }, [searchProjects, searchQuery]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="pataisome">
            <h1>Explore projects</h1>
            <form>
                <input
                    type="text"
                    placeholder="Search.."
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
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