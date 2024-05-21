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
            {!projects && <Spinner />}
            {
                projects && projects.length > 0 &&
<<<<<<< HEAD
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
=======
                <table className='table'>
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
>>>>>>> f96857edf9ee633c63e2bc6608cce3a85e98f33e
            }
            <div>
                <button className='btn btn-new-task' onClick={OpenCreateForm}>Create new project</button>
            </div>
        </div>
    );
};

