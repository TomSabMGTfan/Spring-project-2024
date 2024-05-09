import "../../../css/Modal.css";
import { useTasks } from "../hooks/useTasks";

export const ViewTask = () => {

    const { activeTask: task, CloseViewForm } = useTasks();

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
                        <textarea readOnly className="worker-txtarea" value={task.wroker_username} />
                    </div>

                    {/* STATUS */}
                    <div className="form-group">
                        <label>Status</label>
                        <input readOnly value={task.status} />
                    </div>

                    {/* Created on */}
                    <div className="form-group">
                        <label>Created on</label>
                        <input readOnly value={task.created_on.split('T')[0]} />
                    </div>

                    {/* Deadline */}
                    <div className="form-group">
                        <label>Deadline</label>
                        <input readOnly value={task.planned_end_date.split('T')[0]} />
                    </div>
                </div>
            </div>
        </div>
    )
}