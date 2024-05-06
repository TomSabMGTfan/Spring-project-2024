import React from 'react'
import { useUsers } from './hooks/useUsers'

export const User = ({ user }) => {

    const { } = useUsers();

    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.role}
            </td>
            <td>

            </td>
        </tr>
    )
}
