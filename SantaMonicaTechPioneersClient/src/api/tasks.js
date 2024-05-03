import { apiClient } from "./apis";

const TaskModel = {
    getProjectTasks: async(project_id) => {
      try{
        const response = await apiClient.get(`/tasks/project/${project_id}`);
        return response;
      }
      catch(error){
        console.log(error);
      }
    },
  
    updateTask: async(task) => {
      try{
        const response = await apiClient.put(`/tasks`, task);
        return response;
      }
      catch(error){
        console.log(error);
        return error.response;
      }
    },
  
    updateTaskStatus: async(task) => {
      try{
        const response = await apiClient.put(`/tasks/status`, task);
        return response;
      }
      catch(error){
        console.log(error);
        return error.response;
      }
    },
  
    deleteTask: async(task_id) => {
      try{
        const response = await apiClient.delete(`/tasks/${task_id}`);
        return response;
      }
      catch(error){
        console.log(error);
        return error.response;
      }
    },
  
    createTask: async(task) => {
      try{
        const response = await apiClient.post(`/tasks`, task);
        return response;
      }
      catch(error){
        console.log(error);
        return error.response;
      }
    }
};
    export default TaskModel;