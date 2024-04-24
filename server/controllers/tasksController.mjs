import { validationResult } from "express-validator";

import tasksModel from "../models/tasksModel.mjs";
import project_workersModel from "../models/project_workersModel.mjs";

import { ADMIN, OWNER } from "../cfg/Roles.mjs";

const tasksController = {

    createTask: async (req, res) => {
        try{
            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }

            const {name, description, project_id, planned_end_date} = req.body;

            const role = await project_workersModel.getProjectWorker(user_id, project_id);

            if(role != ADMIN && role != OWNER){
                return res.status(401).json("Unauthorized access");
            }

            const task = {
                name,
                description,
                created_on: new Date(),
                planned_end_date,
                project_id
            };

            const result = await tasksModel.createTask(task);

            return res.status(201).json(result);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to create a task, an error has occured"});
        }
    }

};

export default tasksController;