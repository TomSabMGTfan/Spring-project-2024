import { ONGOING } from "../cfg/Projects.mjs";
import { pool } from "../db/postgresConnection.mjs";
import project_workersModel from "./project_workersModel.mjs";
import tasksModel from "./tasksModel.mjs";

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
    const projects = await projectsModel.getMyProjects(user_id);

    const projectsWithUsersAndTasks = await Promise.all(projects.map(async (project) => {
      const projectWorkers = await project_workersModel.getProjectWorkersByProjectId(project.project_id);
      const tasks = await tasksModel.getTasksByProjectId(project.project_id);

      const completedTasks = tasks.filter(task => task.status === "done").length;
      const inProgressTasks = tasks.filter(task => task.status = "in progress").length;
      const toDoTasks = tasks.filter(task => task.status = "to do").length;

      return {
        project_id: project.project_id,
        project_name: project.project_name,
        project_description: project.project_description,
        project_status: project.project_status,
        user_role: project.user_role,
        completed_tasks: completedTasks,
        in_progress_tasks: inProgressTasks,
        to_do_tasks: toDoTasks
      };
    }));
  },
};

export default projectsModel;
