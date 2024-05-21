import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { User } from './User';
import { CreateUserForm } from "./CreateUserForm"

export const UserList = ({ isAdminOrOwner, project_id }) => {

    const { users, OpenCreatePWorkerForm, showCreatePWorkerForm } = useUsers();

    return (
        <div>
            {
                showCreatePWorkerForm && isAdminOrOwner &&
                < CreateUserForm project_id={project_id} />
            }
            <div>
            <h3 className="table-header">Users List</h3>
        </div>
            <table className='table'>

                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((value) => <User key={value.user_id} user={value} isAdminOrOwner={isAdminOrOwner}></User>)}
                </tbody>
                <div>{
                isAdminOrOwner &&
                <button  className='btn btn-new-task' onClick={OpenCreatePWorkerForm}>Add user to project</button>
            }</div>
            </table>

            

        </div>
    )
}
