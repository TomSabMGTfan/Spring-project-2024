import { pool } from "../db/postgresConnection.mjs";

const projectsModel = {
  createProject: async (name, description) => {
    const status = "in progress";
    const result = await pool.query(
      "INSERT INTO projects (name, description, status) VALUES ($1, $2, $3) RETURNING *",
      [name, description, status]
    );
    return result.rows[0];
  },

  deleteProject: async (id) => {
    await pool.query("DELETE FROM projects WHERE id = $1 AND user_id = $2", [
      id,
      user_id,
    ]);
  },

  updateProject: async (id, updatedProject) => {
    const { name, description, status } = updatedProject;
    const result = await pool.query(
      "UPDATE projects SET name = 1$, description = 2$, status = 3$ WHERE id = 4$ RETURNING *",
      [name, description, status, id]
    );
    return result.rows[0];
  },

  getUserProjects: async (user_id) => {
    const result = await pool.query(
      "SELECT projects.* FROM users JOIN projects ON user_id = projects_id WHERE user_id = 1$",
      [user_id]
    );
    return result.rows[0];
  },
};

export default projectsModel;
