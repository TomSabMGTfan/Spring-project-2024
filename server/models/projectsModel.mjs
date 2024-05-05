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

  getProjectById: async (id) => {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  deleteProject: async (id) => {
    await pool.query("DELETE FROM tasks WHERE project_id = $1", [id]);
    await pool.query("DELETE FROM project_workers WHERE project_id = $1", [id]);
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  },

  updateProject: async (projects) => {
    const { name, description, status, id } = projects;

    const result = await pool.query(
      "UPDATE projects SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [name, description, status, id]
    );
    return result.rows[0];
  },

  getMyProjects: async (user_id) => {
    const result = await pool.query(`
    SELECT 
      projects.id AS project_id,
      projects.status AS project_status
      projects.name AS project_name,
      projects_description AS project_description,
      projects_workers.role AS user_role,
      COUNT(CASE WHEN tasks.status = 'done' THEN 1 END) AS completed_tasks
      COUNT(CASE WHEN tasks.status = 'in progress' THEN 1 END) AS in_progress_tasks,
      COUNT(CASE WHEN tasks.status = 'to do' THEN 1 END) AS to_do_tasks
      FROM 
          projects
      JOIN 
         project_workers ON projects.id = project_workers.project.id
      LEFT JOIN
          tasks ON projects.id = tasks.project.id
      WHERE
          project_workers.user_id = $1
      GROUP BY
        projects.id, projects.name, projects.description, projects.status, project_workers.role`);
    return result.rows;
  },
};

export default projectsModel;
