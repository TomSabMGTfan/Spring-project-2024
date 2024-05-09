import '../css/ProjectPage.css';
import { TaskList } from './TaskList/components/TaskList';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useContext, useEffect, useState } from 'react';
import pWorkerModel from '../../api/pWorkers';
import { UsersProvider } from './UserList/hooks/useUsers';
import { TasksProvider } from './TaskList/hooks/useTasks';
import { UserList } from './UserList/components/UserList';
import ProjectModel from '../../api/projects';

export const ProjectPage = () => {
    let { id: project_id } = useParams();
    if (isNaN(project_id)) {
        project_id = 0;
    }
    const [project, setProject] = useState({});
    const [isNotFound, setIsNotFound] = useState(false);

    const { user } = useContext(AuthContext);

    const [isAdminOrOwner, setIsAdminOrOwner] = useState(false);

    useEffect(() => {
        (async () => {
            const project_response = await ProjectModel.getProjectById(project_id);
            if (project_response.status !== 200) {
                setIsNotFound(true);
                return () => { };
            }

            setProject(project_response.data);

            const response = await pWorkerModel.getPWorkerByUserAndProjectId(user.id, project_id);
            if (response.status === 200) {
                const pWorker = response.data;
                setIsAdminOrOwner(pWorker.role == "admin" || pWorker.role == "owner" ? true : false);
            }
        })();
    }, [project_id]);

    return <div className='project-page'>
        <div>
            <h3>Name: {project.name}</h3>
            <div>Description: {project.description}</div>
            <div>Status: {project.status}</div>
        </div>
        <div className='Grid-Container'>
            <div className='Grid-Item Grid-Side'>
                <div>Task list</div>
                <div>User list</div>
            </div>
            <div className='Grid-Item Grid-Main'>
                {
                    isNotFound ? <div>Project not found</div> :
                        (project ?
                            <>
                                <TasksProvider project_id={project_id}>
                                    <TaskList isAdminOrOwner={isAdminOrOwner} />
                                </TasksProvider>
                                <UsersProvider project_id={project_id}>
                                    <UserList project_id={project_id} isAdminOrOwner={isAdminOrOwner} />
                                </UsersProvider>
                            </> :
                            <div>Loading ...</div>)
                }
            </div>
        </div>
    </div>;
}