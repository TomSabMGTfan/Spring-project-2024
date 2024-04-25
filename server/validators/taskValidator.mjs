import { checkSchema } from 'express-validator';

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
        isDate:{
            errorMessage: "Planned end date mus be a valid Date"
        },
        custom:{
            options: (value) => {
                if(value < Date.now()){
                    throw new Error("Planned end date must be greater than current date");
                } 
            }
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
            errorMessage: "Planned end date mus be a valid Date"
        },
        custom:{
            options: (value) => {
                if(value < Date.now()){
                    throw new Error("Planned end date must be greater than current date");
                } 
            }
        }
    }
});