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

    const { fetchProjects, createProject, closeCreateProjectForm } = useProjects();

    const onFormSubmit = useCallback(async (data) => {
      

        const [status, responseData] = await createProject(data);

        if (status === 201) {
            fetchProjects();
            closeCreateProjectForm();
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
                <label htmlFor='name'>Project Name</label>
                <input type='text'{...register('name', {
                    required: 'Project name is required',
                    minLength: 3,
                    maxLength: 255,
                } )} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
            <label htmlFor='name'>Project description</label>
                <input type='text'{...register('description', {
                    required: 'Project description is required',
                    minLength: 3,
                    maxLength: 255,
                } )} />
            </div>

            <button type ='submit'>Create Project</button>
        </form>
    )
}