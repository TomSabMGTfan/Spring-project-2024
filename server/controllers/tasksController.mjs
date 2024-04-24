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

            const role = await project_workersModel.getProjectWorker(req.user.id, project_id);

            if(role != ADMIN && role != OWNER){
                return res.status(401).json("You dont have privileges to perform this action");
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
    },

    getTasksByProjectId: async (req, res) => {
        try{
            const id = req.params.project_id;

            const result = await tasksModel.getTaskByProjectId(id);

            return res.status(200).json(result);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to get a task, an error has occured"});
        }
    },

    updateTask: async(req, res) => {
        try{
            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }

            const role = await project_workersModel.getProjectWorker(req.user.id, project_id);

            if(role != ADMIN && role != OWNER){
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const {id, name, description, created_on, planned_end_date, worker_id} = req.body;

            const task = {
                id, name, description, created_on, planned_end_date, worker_id
            }

            const result = await tasksModel.updateTask(task);

            return res.status(200).json(result);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to update a task, an error has occured"});
        }
    },
    
    deleteTask: async(req, res) => {
        try{
            if(!req.user){
                return res.status(401).json("Unauthorized access");
            }

            const role = await project_workersModel.getProjectWorker(req.user.id, project_id);

            if(role != ADMIN && role != OWNER){
                return res.status(401).json("You dont have privileges to perform this action");
            }

            const id = req.params.id;

            await tasksModel.deleteTask(id);

            return res.status(200);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({message: "Failed to delete a task, an error has occured"});
        }
    }
};

export default tasksController;