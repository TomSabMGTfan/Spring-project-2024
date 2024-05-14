import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ProjectModel from '../../../api/projects';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const searchProjects = useCallback(async (id, word) => {
    const response = await ProjectModel.searchProjects(id ,word);
    return [response.status, response.data];
  });

  return (
    <SearchContext.Provider value={{ searchProjects, searchResults }}>
      {children}
    </SearchContext.Provider>
  );
};