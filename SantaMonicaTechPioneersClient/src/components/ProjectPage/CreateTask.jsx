import { useForm } from "react-hook-form";
import "../css/Modal.css";

export const CreateTask = ({ closeCreateTask, createTask}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();


    const onFormSubmit = async (data) => {
        const errors = await createTask(data);
        if(!errors){
            closeCreateTask();
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
            if (e.target.className === "modal-container") closeCreateTask();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    {/* Name */}
                    <div className="form-group">
                        <label>Name</label>
                        <textarea className="name-txtarea" maxLength={100} rows={3} {...register("name", {
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

                    {/* Deadline */}
                    <div className="form-group">
                        <label>Deadline</label>
                        <input type="date" {...register("planned_end_date")} />
                        {errors.planned_end_date && <div className="error">{errors.planned_end_date.message}</div>}
                    </div>
                    
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}