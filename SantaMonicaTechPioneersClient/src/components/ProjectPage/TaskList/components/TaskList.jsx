import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { EditTaskStatus } from "./EditTaskStatus";
import { CreateTask } from "./CreateTask";
import { ViewTask } from "./ViewTask";
import TaskModel from "../../../../api/tasks";
import { useEffect, useState } from "react";
import '../../../css/Table.css';

export const TaskList = ({ project_id, isAdminOrOwner }) => {
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [editTaskStatusOpen, setEditTaskStatusOpen] = useState(false);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const [fireTasksRerender, setFireTasksRerender] = useState(false);
    const [currentEditableTaskId, setCurrentEditableTaskId] = useState(0);
    const [tasks, setTasks] = useState(null);
    let error = null;
    useEffect(() => {
        //fetch tasks from db
        (async () => {
            const response = await TaskModel.getProjectTasks(project_id);
            if (response.status === 200) {
                setTasks(response.data);
            }
            else {
                // idk if it works no cluew what to do here
                error = response.status + response.data && response.data.message ? response.data.message : "";
            }
        })();

    }, [fireTasksRerender]);

    if (!tasks) {
        return <div>{error}</div>;
    }

    const openEditTask = (id) => {
        setCurrentEditableTaskId(id);
        setEditTaskOpen(true);
    };

    const editTask = async (data) => {
        const task = { ...data, project_id };
        const response = await TaskModel.updateTask(task);
        if (response.status !== 200) {
            if (response.status === 400) {
                return response.data.errors;
            }
            else {
                alert("Unknown error accured");
                return;
            }
        }
        setFireTasksRerender(!fireTasksRerender);
    };

    const openEditTaskStatus = (id) => {
        setCurrentEditableTaskId(id);
        setEditTaskStatusOpen(true);
    };

    const editTaskStatus = async (data) => {
        const response = await TaskModel.updateTaskStatus(data);
        if (response.status !== 200) {
            if (response.status === 400) {
                return response.data.errors;
            }
            else {
                alert("Unknown error accured");
                return;
            }
        }
        setFireTasksRerender(!fireTasksRerender);
    }

    const removeTask = async (id) => {

        //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

        const response = await TaskModel.deleteTask(id)
        if (response.status !== 200) {
            switch (response.status) {
                case 400: {
                    alert("Task no longer exists");
                    break;
                }
                case 401: {
                    alert("You dont have privileges to perform this action");
                    break;
                }
            }
            return;
        }
        setFireTasksRerender(!fireTasksRerender);
    };

    const createNewTaskOpen = () => {
        setCreateTaskOpen(true);
    }

    const createTask = async (data) => {
        const task = { ...data, project_id };

        const response = await TaskModel.createTask(task);
        if (response.status === 201) {
            setFireTasksRerender(!fireTasksRerender);
        }
        else if (response.status === 400) {
            return response.data.errors;
        }
    }

    const viewTask = (id) => {
        setCurrentEditableTaskId(id);
        setViewTaskOpen(true);
    }

    return <div>
        {editTaskOpen && <EditTask closeEditTask={() => {
            setEditTaskOpen(false);
            setCurrentEditableTaskId(0);
        }} updateTask={editTask} tasks={tasks} task_id={currentEditableTaskId} />}
        {editTaskStatusOpen && <EditTaskStatus closeEditTaskStatus={() => {
            setEditTaskStatusOpen(false);
            setCurrentEditableTaskId(0);
        }} updateTaskStatus={editTaskStatus} tasks={tasks} task_id={currentEditableTaskId} />}

        {createTaskOpen && <CreateTask closeCreateTask={() => setCreateTaskOpen(false)} createTask={createTask} />}

        {viewTaskOpen && <ViewTask closeViewTask={() => {
            setViewTaskOpen(false)
            setCurrentEditableTaskId(0);
        }} tasks={tasks} task_id={currentEditableTaskId} />}

        <div>
            <h3>Task List</h3>
        </div>

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
                {tasks.map((value) => <Task task={value} isAdminOrOwner={isAdminOrOwner} view={viewTask} edit={openEditTask} editStatus={openEditTaskStatus} remove={removeTask} key={value.id} />)}
            </tbody>
        </table>

        {isAdminOrOwner && <button className="btn btn-new-task" onClick={() => createNewTaskOpen()}>Create new task</button>}
    </div>;
}