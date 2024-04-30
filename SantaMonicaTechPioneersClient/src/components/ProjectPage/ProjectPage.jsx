import '../css/Table.css';
import '../css/ProjectPage.css';
import { TaskList } from './TaskList';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { useContext } from 'react';

export const ProjectPage = () => {
    const {id: project_id} = useParams(); 
    console.log()
    if(!project_id){
        return <div>404 Not Found</div>;
    }

    // TODO check if project exists
    const project = {};


    const { user } = useContext(AuthContext);

    if(!user){
        return <div>401 Unauthorized access</div>;
    }

    // TODO Check if user is project member && get his role
    const is_role_admin_or_owner = true;


    return <div className='project-page'>
        <TaskList project_id={project_id} is_role_admin_or_owner={is_role_admin_or_owner} />
    </div>;
}