import React from 'react'
import { Link } from "react-router-dom";
import "../css/ExplorePage.css";

export const SearchResult = ({ id, name, description }) => {
    return (
        <Link to={`/projects/${id}`} className='search-item'>
            <div>
                <p className='search-item-name' title={name}>
                    {name.substr(0, 15)}
                </p>

                <p className='search-item-description' title={description}>
                    {description.substr(0, 10)}...
                </p>
            </div>
        </Link >
    )
}
