import React, { useCallback, useState } from "react";
import "../css/ExplorePage.css";
import { useSearch } from "./hooks/useSearch";
import { Spinner } from "../Spinner";
import { SearchResult } from "./SearchResult";
import { IoSearchSharp } from "react-icons/io5";

function ExplorePage() {
    const { searchProjects, searchResults, setSearchResults } = useSearch();
    const [pageIndex, setPageIndex] = useState(1);
    const [query, setQuery] = useState("");
    const [endOfPages, setEndOfPages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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
            setIsLoading(true);
            timerId = setTimeout(async () => {
                const arr = await FetchProjects(query);
                setSearchResults(arr);
                setIsLoading(false);
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
        setIsLoading(true);
        const arr = await FetchProjects(query);
        if (!arr || arr.length === 0) {
            setEndOfPages(true);
        }
        setSearchResults(a => [...a, ...arr]);
        setIsLoading(false);
    }

    return (
        <div className="explore">
            <div className="search">
                <h2 className="explore-serach-header">Explore projects</h2>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search.."
                        name="search"
                        value={query}
                        onChange={handleSearchInputChange}
                    />
                    <IoSearchSharp className="icon" />
                </div>
            </div>
            <div className="results">
                {searchResults && searchResults.length > 0 ?
                    (<div>
                        <div className="search-list">
                            {searchResults.map((result) => (
                                <SearchResult {...result} />
                            ))}
                            {

                                isLoading && <div><Spinner /></div>
                            }
                        </div>
                        {
                            !endOfPages &&
                            <div>
                                <button className="load-more-btn" onClick={async () => await HandleLoadMore()}>Load more</button>
                            </div>
                        }
                        {endOfPages && <p>End of pages</p>}
                    </div>) :

                    <>
                        {/*
                        Not working properly
                        query && query.length > 0 ? <p>No result</p> : <></>
                        */}

                        {

                            isLoading && <div className="spinner-main"><Spinner /></div>
                        }
                    </>
                }

            </div>
        </div>
    );
}

export default ExplorePage;