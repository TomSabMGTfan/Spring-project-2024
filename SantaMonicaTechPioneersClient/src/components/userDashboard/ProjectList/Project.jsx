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
            <td title={project.name}>
                {project.name.substring(0, 10) + " ..."}
            </td>
            <td title={project.status}>
                {project.status}
            </td>
            <td title={project.description}>
                {project.description.substring(0, 10) + " ..."}
            </td>
            <td title={project.userRole}>
                {project.userRole}
            </td>
            <td title={project.toDoTasks}>
                {project.toDoTasks}
            </td>
            <td title={project.inProgressTasks}>
                {project.inProgressTasks}
            </td>
            <td title={project.completedTasks}>
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