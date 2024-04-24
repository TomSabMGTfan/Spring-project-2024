import project_workersModel from "../models/project_workersModel.mjs";

import { ADMIN, OWNER } from "../cfg/Roles.mjs";

const projectWorkersController = {
    getPWorkersByUser: async (req, res) => {
        try{
            const id = req.params.user_id;

            const result = await project_workersModel.getProjectWorkersById(id);

            return res.status(200).json(result);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to get a project worker, an error has occured"});
        }
    }
}

export default projectWorkersController;