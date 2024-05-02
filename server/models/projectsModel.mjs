import { ONGOING } from "../cfg/Projects.mjs";
import { pool } from "../db/postgresConnection.mjs";



const projectsModel = {
  createProject: async (name, description) => {
    const status = ONGOING;
    const result = await pool.query(
      "INSERT INTO projects (name, description, status) VALUES ($1, $2, $3) RETURNING *",
      [name, description, status]
    );
    return result.rows[0];
  },

  getProjectById: async(id) => {
    await pool.query('SELECT FROM projects where id = $1 RETURNING *', [id])
  },

  deleteProject: async(id) => {
    await pool.query('DELETE FROM tasks WHERE project_id = $1', [id]);
    await pool.query('DELETE FROM project_workers WHERE project_id = $1', [id]);
    await pool.query('DELETE FROM projects WHERE id = $1', [id]);
  },

  updateProject: async(projects) => { 
    const {name, description, status, id} = projects;

    const result = await pool.query("UPDATE projects SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *", [name, description, status, id]) 
    return result.rows[0]
  }
};

export default projectsModel;