import { checkSchema } from 'express-validator';

export const createProjectValidationSchema = checkSchema({
    name: {
        notEmpty:{
            errorMessage:"Name cannot be empty"
        },
        isString:{
            errorMessage: "Name must be a valid String"
        },
        isLength: {
            options: {min: 2, max:255},
            errorMessage:"Name must be at least 2 characters with a max of 20 characters"
        }
    },
    description: {
        notEmpty:{
            errorMessage:"Description cannot be empty"
        },
        isString:{
            errorMessage: "Description must be a valid String"
        },
        isLength: {
            options: {min: 10, max:500},
            errorMessage:"Description must be at least 10 characters with a max of 500 characters"
        }
    },

});

export const updateProjectValidationSchema = checkSchema({
        id: {
            isInt:{
                options: {min: 1},
                errorMessage: "Id must be a valid positive integer"
            }
        },
        name: {
            notEmpty: {
                errorMessage: "name cannot be empty"
            },
            isString: {
                errorMessage: "Name must be a valid string"
            },
            isLength: {
                options: {min: 3, max: 100},
                errorMessage: "Name must be at least 3 characters with a max of 100 characters"
            }
        },
      description: {
        notEmpty: {
            errorMessage: "Description cannot be empty"
        },
        isString:{
            errorMessage: "Description must be a valid String"
        },
        isLength:{
            options: {min:10, max:2000},
            errorMessage: "Description must be at least 10 characters with a max of 2000 characters"
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
                if(value != ONGOING && value != DONE){
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
            errorMessage: "Planned end date must be greater than the date that this task was created"
        }
    }
      
})