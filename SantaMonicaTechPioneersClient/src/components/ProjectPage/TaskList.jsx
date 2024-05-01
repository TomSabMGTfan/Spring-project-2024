import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { TaskModel } from "../../api/apis";
import { useEffect, useState } from "react";
import '../css/TaskList.css';

export const TaskList = ({project_id, is_role_admin_or_owner}) => {
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [fireTasksRerender, setFireTasksRerender] = useState(false);
    const [currentEditableTaskId, setCurrentEditableTaskId] = useState(0);
    const [tasks, setTasks] = useState(null);
    let error = null;
    useEffect(() => {
        //fetch tasks from db
        (async () => {
            const response = await TaskModel.getProjectTasks(project_id);
            if(response.status === 200){
                setTasks(response.data);
            }
            else {
                // idk if it works
                error = response.status + response.data && response.data.message ? response.data.message : "";
            }
        })();
    
    }, [fireTasksRerender]);

    if(!tasks){
        return  <div>{error}</div>;
    }

    const openEditTask = (id) => {
        setCurrentEditableTaskId(id);
        setEditTaskOpen(true);
    };

    const editTask = async (data) =>{
        const task = {...data, project_id};
        const response = await TaskModel.updateTask(task);
        if(response.status !== 200){
            if(response.status === 400){
                return response.data.errors;
            }
            else{
                alert("Unknown error accured");
                return;
            }
        }
        setFireTasksRerender(!fireTasksRerender);
    };

    const removeTask = async (id) => {

        //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

        const response = await TaskModel.deleteTask(id)
        if(response.status !== 200){
            switch (response.status){
                case 400:{
                    alert("Task no longer exists");
                    break;
                }
                case 401:{
                    alert("You dont have privileges to perform this action");
                    break;
                }
            }
            return;
        }
        setFireTasksRerender(!fireTasksRerender);
    };

    return <div>
        {editTaskOpen && <EditTask closeEditTask={() => {
                setEditTaskOpen(false);
                setCurrentEditableTaskId(0);
            }} updateTask={editTask} tasks={tasks} task_id={currentEditableTaskId} />}
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Worker</th>
                    <th className="expand">Description</th>

                    <th>Status</th>
                    <th>Created on</th>
                    <th>Deadline</th>

                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((value) => <Task task={value} is_role_admin_or_owner={is_role_admin_or_owner} edit={openEditTask} remove={removeTask} key={value.id}/>)}
            </tbody>
            </table>
    </div>;
}