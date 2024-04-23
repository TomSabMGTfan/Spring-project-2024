import projectsModel from '../models/projectsModel.mjs'





const projectsController = {
    createProject: async(name, description) => {
        try {
            const createdProject = await projectsModel.createProject(name, description)
            return createdProject;
        } catch (error) {
            throw new Error('Failed to create a project')
        }
    }
};


export default projectsController;
