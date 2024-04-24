import { pool } from '../db/postgresConnection.mjs';

// Model for creating project workers
const project_workersModel = {
    createProjectWorker: async (pWorker) => {
        const {user_id, project_id, role} = pWorker;

        // Sending query to database
        const result = await pool.query("INSERT INTO project_workers (user_id, project_id, role) VALUES ($1, $2, $3) RETURNING *",
        [user_id, project_id, role]);

        return result.rows[0];
    }
};

export default project_workersModel;