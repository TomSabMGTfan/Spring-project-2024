import '../../../css/Modal.css';
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import { AuthContext } from '../../../../utils/AuthContext';
import { useContext } from 'react';

export const Task = ({ task, isAdminOrOwner, view, edit, editStatus, remove }) => {

    const { id, name, description, created_on, planned_end_date, status, worker_username } = task;

    const { user } = useContext(AuthContext);
    let cssStatus = status.replace(/\s/g, '');
    // Make all status words first letter capital
    let displayStatus = status.split(' ').map((value) => value = value[0].toUpperCase() + value.substring(1)).join(" ");

    return <tr>
        {/* ID */}
        <td>{id}</td>
        {/* Name */}
        <td>{name}</td>
        {/* Worker */}
        <td>{worker_username}</td>
        {/* Description */}
        <td className="expand">{description.substring(0, 10) + " ..."}</td>
        {/* Status */}
        <td>
            <span className={`label label-${cssStatus}`}>{displayStatus}</span>
        </td>
        {/* Task creation date */}
        <td>{created_on.split('T')[0]}</td>
        {/* Task deadline */}
        <td>{planned_end_date.split('T')[0]}</td>

        {/* Buttons */}

        <td>
            <span className="actions">
                <BsFillEyeFill onClick={() => view(id)} />
                {isAdminOrOwner ?

                    <>
                        <BsFillPencilFill onClick={() => edit(id)} />
                        <BsFillTrashFill className="delete-btn" onClick={() => remove(id)} />
                    </>
                    :
                    (user.username === worker_username ?

                        <BsFillPencilFill onClick={() => editStatus(id)} />
                        : <></>)
                }
            </span>
        </td>
    </tr>;
}