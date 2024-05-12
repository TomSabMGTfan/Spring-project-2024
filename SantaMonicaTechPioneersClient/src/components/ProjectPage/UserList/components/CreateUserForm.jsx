import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import { useUsers } from '../hooks/useUsers';

export const CreateUserForm = ({ project_id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchUsers, CreatePWorker, CloseCreatePWorkerForm } = useUsers();

    const OnFormSubmit = useCallback(async (data) => {
        const pWorker = {
            username: data.username,
            project_id
        };

        const [status, responseData] = await CreatePWorker(pWorker);

        if (status === 201) {
            FetchUsers();
            CloseCreatePWorkerForm();
        }
        else if (status === 400) {
            for (let i = 0; i < responseData.errors.length; i++) {
                setError(responseData.errors[i].path, {
                    type: "manual",
                    message: responseData.errors[i].msg
                });
            }
        }
        else {
            // TODO Make good error dispalay
            alert("Error occured while adding a user");
        }
    });

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseCreatePWorkerForm();
        }}>
            <div className="modal">
        <form onSubmit={handleSubmit(OnFormSubmit)}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" {...register("username", {
                    minLength: 3,
                    maxLength: 20,
                    message:`${errors.username && <p>{errors.username.message}</p>}`

                })} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <button type='submit'>Add user</button>
        </form>
        </div>
         </div>
    )
}

