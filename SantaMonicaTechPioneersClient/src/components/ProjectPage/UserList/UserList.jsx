import React from 'react'
import { useUsers } from './hooks/useUsers'
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
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        {isAdminOrOwner && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((value) => <User key={value.user_id} user={value} isAdminOrOwner={isAdminOrOwner}></User>)}
                </tbody>
            </table>

            {
                isAdminOrOwner &&
                <button onClick={OpenCreatePWorkerForm}>Add user to project</button>
            }

        </div>
    )
}
