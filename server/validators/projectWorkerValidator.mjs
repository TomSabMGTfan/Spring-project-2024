import { checkSchema } from 'express-validator';
import { USER, ADMIN } from '../cfg/Roles.mjs';

export const updatePWorkerValidationSchema = checkSchema({
    role:{
        custom:{
			options: async (value) => {
				if(value != USER && value != ADMIN){
                    throw new Error("Specified role does not exist in the system");
                }
			},
		}
    },
    user_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "user_id must be a valid positive integer"
        }
    },
    project_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    }
});

export const deletePWorkerValidationSchema = checkSchema({
    user_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "user_id must be a valid positive integer"
        }
    },
    project_id: {
        isInt:{
            options: {min: 1},
            errorMessage: "project_id must be a valid positive integer"
        }
    }
});