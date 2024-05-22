import "../../../css/Modal.css";
import { useTasks } from "../hooks/useTasks";
import { useMemo } from "react";

export const ViewTask = () => {

    const { activeTask: task, CloseViewForm } = useTasks();

    const created = useMemo(() => {
        const date = new Date(task.created_on);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [task.created_on]);

    const deadline = useMemo(() => {
        const date = new Date(task.planned_end_date);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [task.planned_end_date]);

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseViewForm();
        }}>
            <div className="modal">
                <div>

                    {/* Id */}
                    <div className="form-group">
                        <label>Id</label>
                        <input readOnly value={task.id} />
                    </div>

                    {/* Name */}
                    <div className="form-group">
                        <label>Name</label>
                        <textarea readOnly className="name-txtarea" maxLength={100} rows={3} value={task.name} />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea readOnly className="description-txtarea" maxLength={2000} value={task.description} />
                    </div>

                    {/* Worker */}
                    <div className="form-group">
                        <label>Worker</label>
                        <textarea readOnly className="worker-txtarea" value={task.worker_username} />
                    </div>

                    {/* STATUS */}
                    <div className="form-group">
                        <label>Status</label>
                        <input readOnly value={task.status} />
                    </div>

                    {/* Created on */}
                    <div className="form-group">
                        <label>Created on</label>
                        <input readOnly value={created} />
                    </div>

                    {/* Deadline */}
                    <div className="form-group">
                        <label>Deadline</label>
                        <input readOnly value={deadline} />
                    </div>
                </div>
            </div>
        </div>
    )
}