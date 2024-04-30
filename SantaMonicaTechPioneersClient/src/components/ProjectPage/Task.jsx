import '../css/Table.css';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

export const Task = ({ task, is_role_admin_or_owner, edit, remove }) => {

    const { id, name, description, created_on, planned_end_date, status, worker_id } = task;

    const worker = {};

    return <tr>
        {/* ID */}
        <td>{id}</td>
        {/* Name */}
        <td>{name}</td>
        {/* Worker */}
        <td>{worker.username}</td>
        {/* Description */}
        <td className="expand">{description}</td>
        {/* Status */}
        <td>
            <span className={`label label-${status}`}>{status}</span>
        </td>
        {/* Task creation date */}
        <td>{created_on.split('T')[0]}</td>
        {/* Task deadline */}
        <td>{planned_end_date.split('T')[0]}</td>

        {/* Buttons */}

        {is_role_admin_or_owner && 
            <td>
                <span className="actions">
                    <BsFillPencilFill onClick={() => edit(id)} />
                    <BsFillTrashFill className="delete-btn" onClick={() => remove(id)} />
                </span>
            </td>
        }
    </tr>;
}