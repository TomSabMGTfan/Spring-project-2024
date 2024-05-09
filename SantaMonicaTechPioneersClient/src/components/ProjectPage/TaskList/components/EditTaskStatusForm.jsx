import { useForm } from "react-hook-form";
import "../../../css/Modal.css";
import { useTasks } from "../hooks/useTasks";

export const EditTaskStatus = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { activeTask: task, CloseUpdateStatusForm, UpdateTaskStatus, FetchTasks } = useTasks();

    const onFormSubmit = async (data) => {
        const [status, response] = await UpdateTaskStatus({ ...data, id: task.id });
        if (status === 200) {
            FetchTasks();
            CloseUpdateForm();
            return;
        }
        else if (status === 400) {
            const errors = response.errors;
            for (let i = 0; i < errors.length; i++) {
                setError(errors[i].path, {
                    type: "manual",
                    message: errors[i].msg
                });
            }
        }
        else {
            // TODO >>>
            alert("Error occured");
        }

    }


    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseUpdateForm();
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