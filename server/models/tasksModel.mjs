import { pool } from "../db/postgresConnection.mjs";

const tasksModel = {

    createTask: async (task) => {
        const {name, description, created_on, planned_end_date, project_id} = task;

        const result = await pool.query("INSERT INTO projects (name, description, created_on, planned_end_date, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, created_on, planned_end_date, project_id]);

        return result.rows[0];
    }

};

export default tasksModel;