import projectsModel from '../models/projectsModel.mjs'





const projectsController = {
    createProject: async (req, res) => {
        try {
            const {name, description} = req.body;
            const createdProject = await projectsController.createProject(name, description);
            res.status(201).json(createdProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "failed to create a project, an error has occured "})
        }
    }
};


export default projectsController;
