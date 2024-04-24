import { pool } from "../db/postgresConnection.mjs";

const tasksModel = {

    createTask: async (task) => {
        const {name, description, created_on, planned_end_date, project_id} = task;

        const result = await pool.query("INSERT INTO projects (name, description, created_on, planned_end_date, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, created_on, planned_end_date, project_id]);

        return result.rows[0];
    },

    getTaskByProjectId: async (id) => {
        const result = await pool.query("SELECT * FROM tasks WHERE project_id=$1", [id]);

        return result.rows;
    },

    deleteTask: async (id) => {
        await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    },

    updateTask: async (task) => {

        const {id, name, description, created_on, planned_end_date, worker_id} = task;

        const result = await pool.query("UPDATE tasks SET name=$1, description=$2, created_on=$3, planned_end_date=$4, worker_id=$5 WHERE id=$6 RETURNING *",
        [name, description, created_on, planned_end_date, worker_id, id]);

        return result.rows[0];
    }

};

export default tasksModel;