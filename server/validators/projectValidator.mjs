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
    }
});