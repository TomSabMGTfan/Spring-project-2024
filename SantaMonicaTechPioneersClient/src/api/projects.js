import { apiClient } from "./apis";

const ProjectModel = {
    createProject: async (project) => {
        // project needs to have: name, description
        try{
            const response = await apiClient.post("/projects", project);
            return response;
        }
        catch(error){
            console.log(error);
            return error.response;
        }
    },
    getProjectById: async (id) => {
        try{
            const response = await apiClient.get(`/projects/${id}`);
            return response;
        }
        catch(error){
            console.log(error);
            return error.response;
        }
    },
    deleteProject: async (id) => {
        try{
            const response = await apiClient.delete(`/projects/${id}`);
            return response;
        }
        catch(error){
            console.log(error);
            return error.response;
        }
    },
    updateProject: async (project) => {
        // project needs to have: id, name, description, status
        try{
            const response = await apiClient.put("/projects", project);
            return response;
        }
        catch(error){
            console.log(error);
            return error.response;
        }
    },
    getMyProjects: async () => {
        try{
            const response = await apiClient.get("/projects");
            return response;
        }
        catch(error){
            console.log(error);
            return error.response;
        }
    },
};

export default ProjectModel;