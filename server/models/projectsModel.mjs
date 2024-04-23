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
};
