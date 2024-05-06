import { ONGOING } from "../cfg/Projects.mjs";
import { pool } from "../db/postgresConnection.mjs";
import project_workersModel from "./project_workersModel.mjs";
import tasksModel from "./tasksModel.mjs";
import { DONE, INPROGRESS, TODO } from "../cfg/Task_Status.mjs"

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
    const result = await pool.query("SELECT id, name, description, status FROM project_workers RIGHT JOIN projects ON project_workers.project_id = projects.id WHERE user_id = $1", [user_id]);
    const projects = result.rows;

    const newProjects = await Promise.all(projects.map(async (project) => {
      const pWorker = await project_workersModel.getProjectWorker(user_id, project.id);
      const tasks = await tasksModel.getTasksByProjectId(project.id);

      const completedTasks = tasks.filter(task => task.status === DONE).length;
      const inProgressTasks = tasks.filter(task => task.status === INPROGRESS).length;
      const toDoTasks = tasks.filter(task => task.status === TODO).length;

      return {
        ...project,
        userRole: pWorker.role,
        completedTasks,
        inProgressTasks,
        toDoTasks
      };
    }));

    return newProjects;
  },
};

export default projectsModel;
