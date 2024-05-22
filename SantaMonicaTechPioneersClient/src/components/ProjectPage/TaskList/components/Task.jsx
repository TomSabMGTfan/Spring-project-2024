import '../../../css/Modal.css';
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import { AuthContext } from '../../../../utils/AuthContext';
import { useCallback, useContext, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';

export const Task = ({ task, isAdminOrOwner }) => {

    const { id, name, description, created_on, planned_end_date, status, worker_username } = task;

    const { user } = useContext(AuthContext);

    const { FetchTasks, OpenUpdateForm, OpenUpdateStatusForm, OpenViewForm, DeleteTask } = useTasks();

    let cssStatus = status.replace(/\s/g, '');
    // Make all status words first letter capital
    let displayStatus = status.split(' ').map((value) => value = value[0].toUpperCase() + value.substring(1)).join(" ");


    const RemoveTask = useCallback(async () => {
        //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

        const [status] = await DeleteTask(id)
        if (status !== 200) {
            switch (status) {
                case 400: {
                    alert("Task no longer exists");
                    break;
                }
                case 401: {
                    alert("You dont have privileges to perform this action");
                    break;
                }
            }
            return;
        }
        FetchTasks();
    });

    const created = useMemo(() => {
        const date = new Date(created_on);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [created_on]);

    const deadline = useMemo(() => {
        const date = new Date(planned_end_date);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [planned_end_date]);

    return <tr>
        {/* ID */}
        <td>{id}</td>
        {/* Name */}
        <td title={name}>
            {
                name.length > 10 ?
                    name.substr(0, 10) + " ..." :
                    name

            }
        </td>
        {/* Worker */}
        <td>{worker_username}</td>
        {/* Description */}
        <td className="expand" title={description}>
            {
                description.length > 10 ?
                    description.substring(0, 10) + " ..." :
                    description
            }
        </td>
        {/* Status */}
        <td>
            <span className={`label label-${cssStatus}`}>{displayStatus}</span>
        </td>
        {/* Task creation date */}
        <td>{created}</td>
        {/* Task deadline */}
        <td>{deadline}</td>

        {/* Buttons */}

        <td>
            <span className="actions">
                <BsFillEyeFill onClick={() => OpenViewForm(task)} />
                {isAdminOrOwner ?

                    <>
                        <BsFillPencilFill onClick={() => OpenUpdateForm(task)} />
                        <BsFillTrashFill className="delete-btn" onClick={RemoveTask} />
                    </>
                    :
                    (user.username === worker_username ?

                        <BsFillPencilFill onClick={() => OpenUpdateStatusForm(task)} />
                        : <></>)
                }
            </span>
        </td>
    </tr>;
}