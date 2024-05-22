import React, { useCallback } from 'react';
import { useProjects } from './hooks/useProject';
import { Link } from "react-router-dom";
import "../../css/UserDashboard.css";

export const Project = ({ project }) => {
    const { deleteProject, OpenUpdateForm, FetchProjects } = useProjects();

    const RemoveProject = useCallback(async () => {
        const [status] = await deleteProject(project.id);
        if (status === 200) {
            FetchProjects();
        } else {
            alert('error occured while removing the project')
        }
    }, [project]);



    return (
        <tr className='table'>
            <td>
                {project.name.substring(0, 10) + " ..."}
            </td>
            <td>
                {project.status}
            </td>
            <td>
                {project.description.substring(0, 10) + " ..."}
            </td>
            <td>
                {project.userRole}
            </td>
            <td>
                {project.toDoTasks}
            </td>
            <td>
                {project.inProgressTasks}
            </td>
            <td>
                {project.completedTasks}
            </td>
            <td>
                {project.userRole === "owner" &&
                    <>
                        <button className='action-button ' onClick={() => OpenUpdateForm(project)}>Update</button>
                        <button className='action-button ' onClick={RemoveProject}>Remove</button>
                    </>}
            </td>
            <td>
                <Link to={`/projects/${project.id}`} className='btn dashboard-link'>Go to project</Link>
            </td>
        </tr>
    );
};