import React, { useCallback, useState } from 'react'
import { useForm } from "react-hook-form";
import { useUsers } from '../hooks/useUsers';
import { UserModel } from '../../../../api/users';

export const CreateUserForm = ({ project_id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchUsers, CreatePWorker, CloseCreatePWorkerForm } = useUsers();
    const [usernameList, setUsernameList] = useState([]);

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

    const FetchUsernames = useCallback((data) => {
        let timerId;
        return function () {
            clearTimeout(timerId);
            timerId = setTimeout(async () => {
                const response = await UserModel.searchUsername(data);
                if (response.status === 200) {
                    setUsernameList(response.data);
                }
            }, 300);
        }
    })

    const OnUsernameInputChange = useCallback(async (event) => {
        setUsernameList([]);
        const SearchUsernames = FetchUsernames(event.target.value);
        SearchUsernames();
    });

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseCreatePWorkerForm();
        }}>
            <div className="modal">
                <form onSubmit={handleSubmit(OnFormSubmit)}>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input list='usernames' autoComplete='off' type="text" {...register("username", {
                            minLength: 3,
                            maxLength: 20,

                        })} onChange={OnUsernameInputChange} />
                        <datalist id='usernames'>
                            {usernameList.map(v => <option key={v.username} value={v.username} />)}
                        </datalist>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <button type='submit'>Add user</button>
                </form>
            </div>
        </div>
    )
}

