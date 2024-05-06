import '../css/ProjectPage.css';
import { TaskList } from './TaskList';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useContext, useEffect, useState } from 'react';
import pWorkerModel from '../../api/pWorkers';
import { UsersProvider } from './UserList/hooks/useUsers';
import { UserList } from './UserList/UserList';

export const ProjectPage = () => {
    const { id: project_id } = useParams();
    let error = 0;
    if (!project_id) {
        error = 404;
    }

    const { user } = useContext(AuthContext);

    // TODO check if project exists
    const project = {};


    if (!user) {
        error = 401;
    }

    const [isAdminOrOwner, setIsAdminOrOwner] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await pWorkerModel.getPWorkerByUserAndProjectId(user.id, project_id);
            if (response.status === 200) {
                const pWorker = response.data;
                setIsAdminOrOwner(pWorker.role == "admin" || pWorker.role == "owner" ? true : false);
            }
            else if (response.status === 401) {
                error = 401;
            }
        })();
    }, []);

    if (error) {
        return <div>{error}</div>
    }

    return <div className='project-page'>
        <div className='Grid-Container'>
            <div className='Grid-Item Grid-Side'>
                <div>
                    <h3>Project name</h3>
                </div>
                <div>Task list</div>
                <div>User list</div>
            </div>
            <div className='Grid-Item Grid-Main'>
                <TaskList project_id={project_id} isAdminOrOwner={isAdminOrOwner} />
                <UsersProvider project_id={project_id}>
                    <UserList project_id={project_id} isAdminOrOwner={isAdminOrOwner} />
                </UsersProvider>
            </div>
        </div>
    </div>;
}