import { useForm } from "react-hook-form";
import "../../../css/Modal.css";
import { useTasks } from "../hooks/useTasks";
import { useMemo } from "react";

export const EditTask = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { activeTask: task, CloseUpdateForm, UpdateTask, FetchTasks } = useTasks();


    const onFormSubmit = async (data) => {
        const [status, response] = await UpdateTask({ ...data, id: task.id });
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


    const planned_end_date = useMemo(() => {
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
            if (e.target.className === "modal-container") CloseUpdateForm();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    {/* Name */}
                    <div className="form-group">
                        <label>Name</label>
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
                        <textarea className="description-txtarea" maxLength={2000} {...register("description", {
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
                        <textarea className="worker-txtarea" {...register("worker_username", {
                            value: task.worker_username,
                        })} />
                        {errors.worker_username && <div className="error">{errors.worker_username.message}</div>}
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
                            value: planned_end_date,
                        })} />
                        {errors.planned_end_date && <div className="error">{errors.planned_end_date.message}</div>}
                    </div>

                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}