import { checkSchema } from 'express-validator';
import { TODO, INPROGRESS, DONE } from '../cfg/Task_Status.mjs';

export const createTaskValidationSchema = checkSchema({
    name: {
        notEmpty:{
            errorMessage: "Name cannot be empty"
        },
        isString:{
            errorMessage: "Name must be a valid String"
        },
        isLength:{
            options: {min:3, max:100},
            errorMessage: "Name must be at least 2 characters with a max of 50 characters"
        }
    },
    description:{
        notEmpty:{
            errorMessage: "Description cannot be empty"
        },
        isString:{
            errorMessage: "Description must be a valid String"
        },
        isLength:{
            options: {min:10, max:2000},
            errorMessage: "Description must be at least 10 characters with a max of 5000 characters"
        }
    },
    project_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    },
    planned_end_date:{
        matches:{
            options: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            errorMessage: "Planned end date mus be a valid Date"
        },
        custom:{
            options: (value) => {
                if((new Date(value)) < Date.now()){
                    return false;
                } 
                return true;
            },
            errorMessage: "Planned end date must be greater than current date"
        }
    }
});

export const updateTaskValidationSchema = checkSchema({
    id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    },
    name: {
        notEmpty:{
            errorMessage: "Name cannot be empty"
        },
        isString:{
            errorMessage: "Name must be a valid String"
        },
        isLength:{
            options: {min:3, max:100},
            errorMessage: "Name must be at least 2 characters with a max of 50 characters"
        }
    },
    description:{
        notEmpty:{
            errorMessage: "Description cannot be empty"
        },
        isString:{
            errorMessage: "Description must be a valid String"
        },
        isLength:{
            options: {min:10, max:2000},
            errorMessage: "Description must be at least 10 characters with a max of 5000 characters"
        }
    },
    status:{
        notEmpty:{
            errorMessage: "Status cannot be empty"
        },
        isString:{
            errorMessage: "Status must be a valid String"
        },
        custom:{
            options: (value) => {
                if(value != TODO && value != INPROGRESS && value != DONE){
                    return false;
                }
                return true;
            },
            errorMessage: "Invalid status provided"
        }
    },
    project_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    },
    created_on:{
        isDate:{
            errorMessage: "Created on mus be a valid Date"
        }
    },
    planned_end_date:{
        isDate:{
            format: "DD-MM-YYYY",
            errorMessage: "Planned end date mus be a valid Date"
        },
        custom:{
            options: (value) => {
                if((new Date(value)) < Date.now()){
                    return false;
                } 
                return true;
            },
            errorMessage: "Planned end date must be greater than current date"
        }
    },
    worker_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "worker_id must be a valid positive integer"
        }
    }
});

export const updateTaskStatusValidationSchema = checkSchema({
    id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    },
    status:{
        notEmpty:{
            errorMessage: "Status cannot be empty"
        },
        isString:{
            errorMessage: "Status must be a valid String"
        },
        custom:{
            options: (value) => {
                if(value != TODO && value != INPROGRESS && value != DONE){
                    return false;
                }
                return true;
            },
            errorMessage: "Invalid status provided"
        }
    }
});

export const updateTaskWorkerValidationSchema = checkSchema({
    id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    },
    worker_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "worker_id must be a valid positive integer"
        }
    },
});