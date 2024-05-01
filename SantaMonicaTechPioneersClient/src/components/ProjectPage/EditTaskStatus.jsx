import { useForm } from "react-hook-form";
import "../css/Modal.css";

export const EditTaskStatus = ({ closeEditTaskStatus, updateTaskStatus, tasks, task_id }) => {

    const task = tasks.find(value => value.id === task_id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    const onFormSubmit = async (data) => {
        const errors = await updateTaskStatus({...data, id:task_id});
        if(!errors){
            closeEditTaskStatus();
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
            if (e.target.className === "modal-container") closeEditTaskStatus();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(onFormSubmit)}>

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

                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}