
import projectsModel from '../models/projectsModel.mjs'
import project_workersModel from '../models/project_workersModel.mjs';
import { validationResult } from "express-validator";
import { ADMIN, OWNER } from "../cfg/Roles.mjs";
import tasksModel from '../models/tasksModel.mjs';


const projectsController = {
    createProject: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            if (!req.user) {
                return res.status(401).json("Unauthorized access");
            }

            const { name, description } = req.body;
            const createdProject = await projectsModel.createProject(name, description);

            const pWorker = {
                user_id: req.user.id,
                project_id: createdProject.id,
                role: OWNER
            }

            const result = await project_workersModel.createProjectWorker(pWorker);

            res.status(201).json(createdProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "failed to create a project, an error has occured " })
        }
    },

    deleteProject: async (req, res) => {
        try {
            // testing if user is authenticated
            if (!req.user) {
                return res.status(401).json({ message: "unauthorized acces" })
            }

            const id = req.params.id;

            // retrieving project by id
            const project = await projectsModel.getProjectById(id);

            // checking if the project exists
            if (!project) {
                return res.status(400).json({ message: "Project does not exist" })
            }

            // checking if the authenticated user has permission to delete the project 
            const pWorker = await project_workersModel.getProjectWorker(req.user.id, id);
            if (!pWorker || (pWorker.role !== OWNER)) {
                return res.status(401).json({ message: "You dont have the privileges to delete this project" })
            }

            // delete associated tasks with the project
            // await tasksModel.deleteTask(id);

            // delete associated project workers
            // await project_workersModel.deleteProjectWorker(id);

            // delete the project 
            await projectsModel.deleteProject(id);

            return res.status(200).json({ message: "Project deleted successfully" })

        } catch (error) {
            console.error("error deleting projects", error);
            return res.status(500).json({ message: "Server error " });
        }
    },

    getProjectById: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "unauthorized access" });
            }

            const projectId = req.params.id;

            const project = await projectsModel.getProjectById(projectId);

            // project existence check
            if (!project) {
                return res.status(400).json({ message: "project does not exist" });
            }

            const pWorker = await project_workersModel.getProjectWorker(req.user.id, projectId);
            if (!pWorker) {
                return res.status(401).json({ message: "You dont have access to this project" })
            }

            return res.status(200).json(project);

        } catch (error) {
            console.error("error fetching project details", error);
            return res.status(500).json({ message: "server error" })
        }
    },

    updateProject: async (req, res) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: "you dont have the authorization to update this project" })
            }

            const { id, name, description, status } = req.body;

            const project = await projectsModel.getProjectById(id);
            if (!project) {
                return res.status(400).json({ message: "project does not exist" });
            }

            const pWorker = await project_workersModel.getProjectWorker(req.user.id, id);
            if (!pWorker || (pWorker.role !== OWNER)) {
                res.status(401).json({ message: "you dont have privileges to update this task" })
            }

            await projectsModel.updateProject({ id, name, description, status });
            return res.status(200).json({ message: "project updated successfully" })


        } catch (error) {
            console.error("error updating project", error);
            res.status(500).json({ message: "server error" })

        }
    },

    getMyProjects: async (req, res) => {
        try {
            const projects = await projectsModel.getMyProjects(req.user.id);

            res.status(200).json(projects);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "failed to retrieve projects" })
        }
    },

    searchProjects: async (req, res) => { 
        
        
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { search } = req.query;
            const searchResult =  await projectsModel.searchProjects(id, search);

            return res.status(200).json(searchResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error occured" })
        }
    }
};


export default projectsController;
