import { pool } from "../db/postgresConnection.mjs";

const tasksModel = {

    createTask: async (task) => {
        const {name, description, created_on, planned_end_date, project_id} = task;

        const result = await pool.query("INSERT INTO projects (name, description, created_on, planned_end_date, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, created_on, planned_end_date, project_id]);

        return result.rows[0];
    },

    getTasksByProjectId: async (id) => {
        const result = await pool.query("SELECT * FROM tasks WHERE project_id=$1", [id]);

        return result.rows;
    },
    getTasksByUserId: async(id)=>{
        const result = await pool.query("SELECT * FROM tasks WHERE user_id=$1", [id]);

        return result.rows;
    },
    deleteTask: async (id) => {
        await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    },

    updateTask: async (task) => {

        const {id, name, description, status, created_on, planned_end_date, worker_id} = task;

        const result = await pool.query("UPDATE tasks SET name=$1, description=$2, status=$3, created_on=$4, planned_end_date=$5, worker_id=$6 WHERE id=$7 RETURNING *",
        [name, description, status, created_on, planned_end_date, worker_id, id]);

        return result.rows[0];
    },
    updateTaskStatus: async (id, status) => {
        const result = await pool.query("UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *", [status, id]);
        return result.rows[0];
    },
    updateTaskWorker: async (id, worker_id) => {
        const result = await pool.query("UPDATE tasks SET worker_id=$1 WHERE id=$2 RETURNING *", [worker_id, id]);
        return result.rows[0];
    },
};

export default tasksModel;