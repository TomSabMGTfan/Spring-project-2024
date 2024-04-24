import { pool } from "../db/postgresConnection.mjs";

const tasksModel = {

    createTask: async (task) => {
        const {name, description, project_id} = task;

        const result = await pool.query("INSERT INTO projects (name, description, project_id) VALUES ($1, $2, $3) RETURNING *",
        [name, description, project_id]);

        return result.rows[0];
    }

};

export default tasksModel;