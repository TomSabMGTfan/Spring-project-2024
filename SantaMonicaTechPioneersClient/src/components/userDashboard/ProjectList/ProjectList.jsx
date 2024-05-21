import React from 'react'
import { useProjects } from './hooks/useProject'
import { Project } from './Project'
import { CreateProjectForm } from './CreateProjectForm'
import { UpdateProjectForm } from './UpdateProjectForm'
import { Spinner } from '../../Spinner'

export const ProjectList = () => {
    const { projects, showCreateForm, OpenCreateForm, showUpdateForm, activeProject } = useProjects();

    return (
        <div>
            {showCreateForm && <CreateProjectForm />}
            {showUpdateForm && <UpdateProjectForm />}
            {(!projects || projects.length === 0) && <Spinner />}
            {
                projects && projects.length > 0 &&
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Role</th>
                                <th>To Do </th>
                                <th>In Progress </th>
                                <th>Done </th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <Project key={project.id} project={project} />
                            ))}
                        </tbody>
                        <div>
                        <button className='btn btn-new-task' onClick={OpenCreateForm}>Create new project</button>
                    </div>
                    </table>
                    
                </>
            }
        </div>
    );
};

