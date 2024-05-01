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
        const errors = await updateTask({...data, id:task_id});
        if(!errors){
            closeEditTask();
            return;
        }

        for(let i = 0; i < errors.length; i++){
            setError(errors[i].path, {
              type: "manual",
              message: errors[i].msg
            });
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
                        <textarea className="name-txtarea" maxLength={100} rows={3} {...register("name", {
                            value: task.name,
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters with a max of 100 characters"
                            },
                            maxLength: {
                                value: 100,
                                message: "Name must be at least 3 characters with a max of 100 characters"
                            }
                        })} />
                        {errors.name && <div className="error">{errors.name.message}</div>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea {...register("description", {
                            value: task.description,
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters with a max of 2000 characters"
                            },
                            maxLength: {
                                value: 2000,
                                message: "Description must be at least 10 characters with a max of 2000 characters"
                            }
                        })} />
                        {errors.description && <div className="error">{errors.description.message}</div>}
                    </div>

                    {/* Worker */}
                    <div className="form-group">
                        <label>Worker</label>
                        <textarea {...register("worker_id", {
                            value: task.worker_id,
                        })} />
                        {errors.worker_id && <div className="error">{errors.worker_id.message}</div>}
                    </div>

                    {/* STATUS */}
                    <div className="form-group">
                        <label>Status</label>
                        <select {...register("status", {
                            value: task.status,
                        })}>
                            <option value="to do">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        {errors.status && <div className="error">{errors.status.message}</div>}
                    </div>

                    {/* Deadline */}
                    <div className="form-group">
                        <label>Deadline</label>
                        <input type="date" {...register("planned_end_date", {
                            value: task.planned_end_date.split('T')[0],
                        })} />
                    </div>
                    {errors.planned_end_date && <div className="error">{errors.planned_end_date.message}</div>}
                    
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}