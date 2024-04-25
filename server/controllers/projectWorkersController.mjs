import project_workersModel from "../models/project_workersModel.mjs";

import { ADMIN, OWNER, USER } from "../cfg/Roles.mjs";

const projectWorkersController = {
    getPWorkersByUserId: async (req, res) => {
        try{
            const id = req.params.user_id;

            const result = await project_workersModel.getProjectWorkersByUserId(id);

            return res.status(200).json(result);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to get a project worker, an error has occured"});
        }
    },

    updatePWorker: async (req,res) => {
        try{
            
            const {role, user_id, project_id} = req.body;

            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }

            const currentUserRole = await project_workersModel.getProjectWorker(req.user.id, project_id);
            const otherUserRole = await project_workersModel.getProjectWorker(user_id, project_id);

            if(otherUserRole === OWNER){
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if(currentUserRole == USER){
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const pWorker = {
                role, user_id, project_id
            };

            const result = await project_workersModel.updateProjectWorkerRole(pWorker);

            return res.status(200).json(result);

        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to update a project worker, an error has occured"});
        }
    },

    deletePWorker: async (req,res) => {
        try{
            const {user_id, project_id} = req.body;

            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }

            const currentUserRole = await project_workersModel.getProjectWorker(req.user.id, project_id);
            const otherUserRole = await project_workersModel.getProjectWorker(user_id, project_id);

            if(otherUserRole === OWNER){
                return res.status(401).json("You dont have privileges to perform this action");
            }

            if(currentUserRole == USER){
                return res.status(401).json("You dont have privileges to perform this action");
            }
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await project_workersModel.deleteProjectWorker(user_id, project_id);

            return res.status(200);

        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to delete a project worker, an error has occured"});
        }
    }
}

export default projectWorkersController;