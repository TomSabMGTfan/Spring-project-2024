import { Task } from "./Task";
import { TaskModel } from "../../api/apis";
import { useEffect, useState } from "react";
import '../css/Table.css';

export const TaskList = ({project_id, is_role_admin_or_owner}) => {
    const [tasks, setTasks] = useState(null);
    let response = null;
    let error = null;
    useEffect(() => {
        //fetch tasks from db
        (async () => {
            response = await TaskModel.getProjectTasks(project_id);
            if(response.status === 200){
                setTasks(response.data);
            }
            else {
                // idk if it works
                error = response.status + response.data && response.data.message ? response.data.message : "";
            }
        })();
    
    }, [response]);

    if(!tasks){
        return  <div>{error}</div>;
    }

    return <div>
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
                {tasks.map((value) => <Task task={value} is_role_admin_or_owner={is_role_admin_or_owner} key={value.id}/>)}
            </tbody>
            </table>
    </div>;
}