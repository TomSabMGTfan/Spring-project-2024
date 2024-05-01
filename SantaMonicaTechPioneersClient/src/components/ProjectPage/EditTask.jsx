import { useForm } from "react-hook-form";
import "../css/EditTask.css";

export const EditTask = ({ closeEditTask, updateTask, tasks, task_id }) => {

    const task = tasks.find(value => value.id === task_id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    const onFormSubmit = async (data) => {
        // TODO Check for validation errors


        const errors = await updateTask({...data, id:task_id});
        if(!errors){
            closeEditTask();
            return;
        }

        
    }


    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") closeEditTask();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    {/* Name */}
                    <div className="form-group">
                        <label>Task</label>
                        <textarea {...register("name", {
                            value: task.name,
                            // TODO VALIDATION
                        })} />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea {...register("description", {
                            value: task.description,
                            // TODO VALIDATION
                        })} />
                    </div>

                    {/* Worker */}
                    <div className="form-group">
                        <label>Worker</label>
                        <textarea {...register("worker_id", {
                            value: task.worker_id,
                            // TODO VALIDATION
                        })} />
                    </div>

                    {/* STATUS */}
                    <div className="form-group">
                        <label>Status</label>
                        <select {...register("status", {
                            value: task.status,
                            // TODO VALIDATION
                        })}>
                            <option value="to do">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    {/* Deadline */}
                    <div className="form-group">
                        <label>Deadline</label>
                        <input type="date" {...register("planned_end_date", {
                            value: task.planned_end_date.split('T')[0],
                            // TODO VALIDATION
                        })} />
                    </div>

                    
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}