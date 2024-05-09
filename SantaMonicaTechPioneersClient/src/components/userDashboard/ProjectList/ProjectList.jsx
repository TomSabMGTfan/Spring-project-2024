import React from 'react'
import { useProjects } from './hooks/useProject'
import { Project } from './Project'
import { CreateProjectForm } from './CreateProjectForm'
import { UpdateProjectForm } from './UpdateProjectForm'

export const ProjectList = () => {
    const { projects, showCreateForm, OpenCreateForm, showUpdateForm, activeProject } = useProjects();

    return (
        <div>
            {showCreateForm && <CreateProjectForm />}
            {showUpdateForm && <UpdateProjectForm />}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Role</th>
                        <th>To Do Tasks</th>
                        <th>In Progress Tasks</th>
                        <th>Done Tasks</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <Project key={project.id} project={project} />
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={OpenCreateForm}>Create new project</button>
            </div>
        </div>
    );
};

