import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import { useProjects } from './hooks/useProject';

export const CreateProjectForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchProjects, createProject, CloseCreateForm } = useProjects();

    const onFormSubmit = useCallback(async (data) => {


        const [status, responseData] = await createProject(data);

        if (status === 201) {
            FetchProjects();
            CloseCreateForm();
        } else if (status === 400) {
            for (let i = 0; i < responseData.errors.length; i++) {
                setError(responseData.errors[i].path, {
                    type: 'manual',
                    message: responseData.errors[i].msg,
                });
            }
        } else {
            // Handle other error cases
            alert('Error occurred while creating the project');
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text'{...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <input type='text'{...register('description')} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <button type='submit'>Create Project</button>
        </form>
    )
}