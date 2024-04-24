import { SUPERUSER } from '../cfg/Roles.mjs';
import projectsModel from '../models/projectsModel.mjs'
import project_workersModel from '../models/project_workersModel.mjs';




const projectsController = {
    createProject: async (req, res) => {
        try {
            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }
            
            const {name, description} = req.body;
            const createdProject = await projectsModel.createProject(name, description);

            const pWorker = {
                user_id: req.user.id,
                project_id: createdProject.id,
                role: SUPERUSER
            }

            const result = await project_workersModel.createProjectWorker(pWorker);

            res.status(201).json(createdProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "failed to create a project, an error has occured "})
        }
    }
};


export default projectsController;
