import React from 'react'
import { useUsers } from './hooks/useUsers'
import { User } from './User';

export const UserList = ({ isAdminOrOwner }) => {

    const { users } = useUsers();
    console.log(users);
    if (!users) {
        return <div>Loading</div>
    }

    return (
        <div>
            <table>
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
            </table>
        </div>
    )
}
