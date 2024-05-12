import '../css/ProjectPage.css';
import { TaskList } from './TaskList/components/TaskList';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useContext, useEffect, useState } from 'react';
import pWorkerModel from '../../api/pWorkers';
import { UsersProvider } from './UserList/hooks/useUsers';
import { TasksProvider } from './TaskList/hooks/useTasks';
import { UserList } from './UserList/components/UserList';
import ProjectModel from '../../api/projects';
import img2 from "../../assets/30342253-Photoroom.png-Photoroom.png"

export const ProjectPage = () => {
    let { id: project_id } = useParams();
    if (isNaN(project_id)) {
        project_id = 0;
    }
    const [project, setProject] = useState({});
    const [isNotFound, setIsNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState('task'); // State to manage active tab

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
                setIsAdminOrOwner(pWorker.role === "admin" || pWorker.role === "owner");
            }
        })();
    }, [project_id, user.id]);

    const handleTaskListClick = () => {
        setActiveTab('task');
    };

    const handleUserListClick = () => {
        setActiveTab('user');
    };

    return (
        <div className='project-page'>
            
            <div className='Grid-Container'>
                <div className='Grid-Item-Grid-login-information'>
                <h3>Name: {project.name}</h3>
                <div>Description: {project.description}</div>
                <div>Status: {project.status}</div>
            </div>
                <div className='Grid-Item-Grid-Side-navigation'>
                    {/* Conditional rendering for active links */}
                    {activeTab === 'task' ? (
                        <Link to={`/projects/${project_id}`} onClick={handleTaskListClick} className="active-link">Task list</Link>
                    ) : (
                        <Link to={`/projects/${project_id}`} onClick={handleTaskListClick} className='passive-link'>Task list</Link>
                    )}
                    {activeTab === 'user' ? (
                        <Link to={`/projects/${project_id}`} onClick={handleUserListClick} className="active-link">User list</Link>
                    ) : (
                        <Link to={`/projects/${project_id}`} onClick={handleUserListClick} className='passive-link'>User list</Link>
                    )}
                </div>
                <div className='Grid-Item Grid-Main'>
                    {
                        isNotFound ? <div>Project not found</div> :
                            (project ?
                                <>
                                    {activeTab === 'task' && (
                                        <TasksProvider project_id={project_id}>
                                            <TaskList isAdminOrOwner={isAdminOrOwner} />
                                        </TasksProvider>
                                    )}
                                    {activeTab === 'user' && (
                                        <UsersProvider project_id={project_id}>
                                            <UserList project_id={project_id} isAdminOrOwner={isAdminOrOwner} />
                                        </UsersProvider>
                                    )}
                                </> :
                                <div>Loading ...</div>)
                    }
                </div>
            </div>
        </div>
    );
};
