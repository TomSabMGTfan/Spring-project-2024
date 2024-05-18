import React, { useCallback, useState } from "react";
import "../css/ExplorePage.css";
import { useSearch } from "./hooks/useSearch";
import { Link } from "react-router-dom";

function ExplorePage() {
    const { searchProjects, searchResults, setSearchResults } = useSearch();
    const [pageIndex, setPageIndex] = useState(1);
    const [query, setQuery] = useState("");
    const [endOfPages, setEndOfPages] = useState(false);

    const FetchProjects = async (query) => {
        const [status, data] = await searchProjects(pageIndex, query);
        if (status === 200) {
            setPageIndex(pageIndex + 1);
            return data;
        }
    }

    const DebounceFetch = useCallback((query) => {
        let timerId;
        return function () {
            clearTimeout(timerId);
            timerId = setTimeout(async () => {
                const arr = await FetchProjects(query);
                setSearchResults(arr);
            }, 300);
        }
    });

    const handleSearchInputChange = (event) => {
        setQuery(event.target.value);
        setSearchResults([]);
        setPageIndex(1);
        setEndOfPages(false);
        if (event.target.value.trim().length > 0) {
            const fetch = DebounceFetch(event.target.value);
            fetch();
        }
    };

    const HandleLoadMore = async () => {
        const arr = await FetchProjects(query);
        if (!arr || arr.length === 0) {
            setEndOfPages(true);
        }
        setSearchResults(a => [...a, ...arr]);
    }

    return (
        <div className="pataisome">
            <div>
                <h1>Explore projects</h1>
                <input
                    type="text"
                    placeholder="Search.."
                    name="search"
                    value={query}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div>
                {searchResults && searchResults.length > 0 ?
                    (<div>
                        {searchResults.map((result) => (
                            <div key={result.id}>
                                <h3>{result.id}</h3>
                                <h3>{result.name}</h3>
                                <p>{result.description}</p>
                                <Link to={`/projects/${result.id}`}>Go to project</Link>
                            </div>

                        ))}
                        {!endOfPages && <button onClick={async () => await HandleLoadMore()}>Load more</button>}
                        {endOfPages && <p>End of pages</p>}
                    </div>) :

                    <>
                        {/*
                        Not working properly
                        query && query.length > 0 ? <p>No result</p> : <></>
                        */}
                    </>


                }
            </div>
        </div>
    );
}

export default ExplorePage;