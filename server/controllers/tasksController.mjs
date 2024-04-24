import { validationResult } from "express-validator";

import tasksModel from "../models/tasksModel.mjs";

const tasksController = {

    createTask: async (req, res) => {
        try{
            const {name, description, project_id} = req.body;

            const task = {
                name,
                description,
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