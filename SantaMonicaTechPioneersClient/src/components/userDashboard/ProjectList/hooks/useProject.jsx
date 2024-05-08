import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import ProjectModel from "../../../../api/projects";

const ProjectContext = createContext();

 export const useProjects = () => useContext(ProjectContext);

 export const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);

    const [fetchProjects, setFetchProjects] = useState(false);

    // boolean show form 

    const FetchProjects = useCallback(() => {setFetchProjects(v => !v), [fetchProjects]})



    const fetchProjectData = async () => {
            const response = await ProjectModel.getMyProjects()
            if(response.status === 200) {
                setProjects(response.data);
            }
    };

    const createProject = useCallback(async (project) => {
        const response = await ProjectModel.createProject(project);
        return [response.status, response.data];
    });


    const updateProject = useCallback(async(project) => {
        const response = await ProjectModel.updateProject(project);
        return [response.status, response.data]
    });

    const deleteProject = useCallback(async(id) => {
        const response = await ProjectModel.deleteProject(id);
        return [response.status, response.data]
    });

    useEffect(() => {
        fetchProjectData();
    }, [fetchProjects]);

    return (
        <ProjectContext.Provider value={ {projects, createProject, 
        updateProject, deleteProject, FetchProjects, fetchProjects  }}>
        {projects && children}
        </ProjectContext.Provider>
    );

 };

