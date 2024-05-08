import React, { useCallback } from 'react';
import { useProjects } from './hooks/useProject';
import { useAuth } from '../../../hooks/useAuth';


export const Project = ({project}) => {

    const auth = useAuth()

    const {deleteProject, updateProject, fetchProjects} = useProjects();

    const RemoveProject = useCallback(async () => {
        if(project.role === 'owner') {
            alert("cannot remove owner of the project")
            return;
        }

        const [status] = await deleteProject(project.project_id);
        if (status === 200) {
            fetchProjects();
        } else {
            alert('error occured while removing the project')
        }
    }, [project]);



    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>
                {project.role !== 'owner' && <button onClick={updateProject}>
                    {project.status === 'Ongoing' ? 'Done' : 'Ongoing'}
                </button> }
                { <button onClick={RemoveProject}>Remove</button>}
            </td>
        </tr>
    );
};