import React from 'react'
import { useProjects } from './hooks/useProject'
import { Project } from './Project'
import { CreateProjectForm } from './CreateProjectForm'


export const ProjectList = () => {
    const { projects, fetchProjects, setShowForm } = useProjects();

    return (
        <div>
            {  <CreateProjectForm />} 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Description</th> 
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <Project key={project.id} project={project} />
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setShowForm(true)}>Create new project</button>
            </div>
        </div>
    );
};

