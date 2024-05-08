import React from 'react'
import { useProjects } from './hooks/useProject'
import { Project } from './Project'
import { CreateProjectForm } from './CreateProjectForm'


export const ProjectList = () => {
    const { projects, fetchProjects } = useProjects();

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
            {/* {<button onClick={}>Create new project</button>} */}
        </div>
    );
};

